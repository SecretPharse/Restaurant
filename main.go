package main

import (
	"context"
	"crypto/rand"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"math/big"
	"net/http"
	"os"
	"time"

	"github.com/alexedwards/argon2id"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
	"github.com/wneessen/go-mail"
)

var database *pgxpool.Pool

type API struct {
	Status   bool   `json:"Status"`
	Type     string `json:"Type"`
	Detail   string `json:"Detail"`
	Name     string `json:"Name"`
	Email    string `json:"Email"`
	Phone    string `json:"Phone"`
	Address  string `json:"Address"`
	Open     string `json:"Open"`
	Close    string `json:"Close"`
	Worker   int    `json:"Worker"`
	MAXTable int    `json:"MaxTable"`
	Password string `json:"Password"`
	OTP      string `json:"OTP"`
}

type configuration struct {
	URL  string `json:"URL"`
	HOST string `json:"HOST"`
}

var argon_params = &argon2id.Params{
	Memory:      20 * 1024,
	Iterations:  1,
	Parallelism: 2,
	SaltLength:  32,
	KeyLength:   64,
}
var config configuration

func main() {
	load, err := os.ReadFile("./config.json")
	if err != nil {
		log.Panicln(err)
	}
	if err = json.Unmarshal(load, &config); err != nil {
		log.Panicln(err)
	}

	database, err = pgxpool.New(context.Background(), config.URL)
	if err != nil {
		log.Panicln(err)
	}
	if err := database.Ping(context.Background()); err != nil {
		log.Panicln(err)
	}
	fmt.Println("Berhasil Tehubung Dengan Database")
	defer database.Close()

	server := http.FileServer(http.Dir("./main"))
	http.Handle("/", server)

	http.HandleFunc("/Register", Verify)
	http.HandleFunc("/New-OTP", RequestNewOTP)
	http.HandleFunc("/CancelRegister", CancelVerify)
	http.HandleFunc("/Verification", CompleteEnrollment)
	http.HandleFunc("/Login", Login)

	format := fmt.Sprintf("Server http://%s", config.HOST)
	fmt.Println(format)

	log.Fatal(http.ListenAndServe(config.HOST, nil))
}

func Verify(w http.ResponseWriter, r *http.Request) {
	var account API
	var cache string

	w.Header().Set("Access-Control-Allow-Origin", config.HOST)
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	DB, err := database.Begin(context.Background())
	if err != nil {
		log.Println(err)
		return
	}
	defer DB.Rollback(context.Background())

	if r.Method == http.MethodOptions {
		log.Println(r.Method)
		w.WriteHeader(http.StatusOK)
		return
	}

	if err := json.NewDecoder(r.Body).Decode(&account); err != nil {
		log.Println(err)
		return
	}

	if err := DB.QueryRow(context.Background(), "SELECT EMAIL FROM VERIFICATIONS WHERE EMAIL=$1", account.Email).Scan(&cache); errors.Is(err, pgx.ErrNoRows) {
		num, err := rand.Int(rand.Reader, big.NewInt(10000))
		if err != nil {
			log.Println(err)
			return
		}

		Raw_OTP := fmt.Sprintf("%04d", num.Int64())
		OTP, err := argon2id.CreateHash(Raw_OTP, argon_params)
		if err != nil {
			log.Println(err)
			return
		}

		Time := time.Now()
		Code_Expire := Time.Add(10 * time.Minute)
		Verification_Expire := Time.Add(24 * time.Hour)

		InsertDB, err := DB.Exec(context.Background(), "INSERT INTO VERIFICATIONS (EMAIL, CODE, CODE_EXPIRE, VERIFICATION_EXPIRE) VALUES ($1, $2, $3, $4)",
			account.Email, OTP, Code_Expire, Verification_Expire)
		if err != nil {
			log.Println(err)
			return
		} else if err := InsertDB.RowsAffected(); err == 0 {
			log.Println(err)
			return
		}

		format := fmt.Sprintf("%s Meminta kode OTP", account.Email)
		fmt.Println(format)
		if err := SendOTP(account.Email, "Kode OTP kamu", Raw_OTP); err != nil {
			log.Println(err)
			return
		}

		if err := DB.Commit(context.Background()); err != nil {
			log.Println(err)
			return
		}

		json.NewEncoder(w).Encode(API{
			Status: true,
			Detail: account.Email,
		})
		format = fmt.Sprintf("%s Permintaan verifikasi sedang dalam proses", account.Email)
		fmt.Println(format)
		return
	} else if err != nil {
		log.Println(err)
		return
	}

	json.NewEncoder(w).Encode(API{
		Status: false,
		Type:   "Email",
		Detail: "Email telah terdaftar",
	})
}

func CancelVerify(w http.ResponseWriter, r *http.Request) {
	var account API

	w.Header().Set("Access-Control-Allow-Origin", config.HOST)
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == http.MethodOptions {
		json.NewEncoder(w).Encode(API{
			Status: false,
			Detail: "Sistem bermasalah",
		})
		log.Println(r.Method)
		w.WriteHeader(http.StatusOK)
		return
	}

	if err := json.NewDecoder(r.Body).Decode(&account); err != nil {
		json.NewEncoder(w).Encode(API{
			Status: false,
			Detail: "Sistem bermasalah",
		})
		log.Println(err)
		return
	}

	delete, err := database.Exec(context.Background(), "DELETE FROM VERIFICATIONS WHERE EMAIL=$1", account.Email)
	if err != nil {
		json.NewEncoder(w).Encode(API{
			Status: false,
			Detail: "Sistem bermasalah",
		})
		log.Println(err)
		return
	}

	if delete.RowsAffected() == 0 {
		json.NewEncoder(w).Encode(API{
			Status: false,
			Detail: "Gagal membatalkan verifikasi",
		})
		return
	}

	json.NewEncoder(w).Encode(API{
		Status: true,
	})
	format := fmt.Sprintf("%s Membatalkan verifikasi", account.Email)
	fmt.Println(format)
}

func RequestNewOTP(w http.ResponseWriter, r *http.Request) {
	var account API
	var request_count int

	w.Header().Set("Access-Control-Allow-Origin", config.HOST)
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	DB, err := database.Begin(context.Background())
	if err != nil {
		log.Println(err)
		return
	}
	defer DB.Rollback(context.Background())

	if r.Method == http.MethodOptions {
		log.Println(r.Method)
		w.WriteHeader(http.StatusOK)
		return
	}

	if err := json.NewDecoder(r.Body).Decode(&account); err != nil {
		log.Print(err)
		return
	}

	if err := DB.QueryRow(context.Background(), "SELECT COUNT FROM VERIFICATIONS WHERE EMAIL = $1", account.Email).Scan(&request_count); errors.Is(err, pgx.ErrNoRows) {
		log.Println(err)
		return
	} else if err != nil {
		log.Println(err)
		return
	}

	if request_count > 5 {
		json.NewEncoder(w).Encode(API{
			Status: false,
			Detail: "Permintaan OTP baru telah mencapai batas",
		})
		return
	}

	num, err := rand.Int(rand.Reader, big.NewInt(1000))
	if err != nil {
		log.Println(err)
		return
	}

	Raw_OTP := fmt.Sprintf("%04d", num.Int64())
	OTP, err := argon2id.CreateHash(Raw_OTP, argon_params)
	if err != nil {
		log.Println(err)
		return
	}

	Time := time.Now()
	Code_Expire := Time.Add(10 * time.Minute)

	NewOTP, err := DB.Exec(context.Background(), "UPDATE VERIFICATIONS SET CODE=$1, CODE_EXPIRE=$2, COUNT=$3 WHERE EMAIL=$4",
		OTP, Code_Expire, request_count+1, account.Email)
	if err != nil {
		log.Println(err)
		return
	} else if err := NewOTP.RowsAffected(); err == 0 {
		log.Println(err)
		return
	}

	if err := SendOTP(account.Email, "Kode OTP kamu", Raw_OTP); err != nil {
		log.Println(err)
		return
	}

	if err := DB.Commit(context.Background()); err != nil {
		log.Println(err)
		return
	}

	json.NewEncoder(w).Encode(API{
		Status: true,
	})
	format := fmt.Sprintf("%s Meminta OTP Baru", account.Email)
	fmt.Println(format)
}

func CompleteEnrollment(w http.ResponseWriter, r *http.Request) {
	var account API
	var code, name, phone, address, open, close string
	var worker, MaxTable int
	var code_expire, verification_expire time.Time

	w.Header().Set("Access-Control-Allow-Origin", config.HOST)
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	DB, err := database.Begin(context.Background())
	if err != nil {
		log.Println(err)
		return
	}
	defer DB.Rollback(context.Background())

	if r.Method == http.MethodOptions {
		log.Println(r.Method)
		w.WriteHeader(http.StatusOK)
		return
	}

	if err := json.NewDecoder(r.Body).Decode(&account); err != nil {
		log.Println(err)
		return
	}

	if err := DB.QueryRow(context.Background(), "SELECT CODE, CODE_EXPIRE, VERIFICATION_EXPIRE FROM VERIFICATIONS WHERE EMAIL=$1",
		account.Email).Scan(&code, &code_expire, &verification_expire); errors.Is(err, pgx.ErrNoRows) {
		log.Println(err)
		return
	} else if err != nil {
		log.Println(err)
		return
	}

	Time := time.Now()
	if Time.After(verification_expire) || Time.After(code_expire) {
		json.NewEncoder(w).Encode(API{
			Status: false,
			Detail: "Waktu verifikasi telah kadaluarsa. Silakan coba lagi nanti",
		})
		return
	}

	result, err := argon2id.ComparePasswordAndHash(account.OTP, code)
	if err != nil {
		log.Println(err)
		return
	}
	if !result {
		json.NewEncoder(w).Encode(API{
			Status: false,
			Detail: "Kode verifikasi salah",
		})
		return
	}

	verification_valid, err := DB.Exec(context.Background(), "UPDATE VERIFICATIONS SET VERIFICATION_AT=$1 WHERE EMAIL=$2", Time, account.Email)
	if err != nil {
		log.Println(err)
		return
	} else if err := verification_valid.RowsAffected(); err == 0 {
		log.Println(err)
		return
	}

	password, err := argon2id.CreateHash(account.Password, argon_params)
	if err != nil {
		log.Println(err)
		return
	}

	registered, err := DB.Exec(context.Background(), "INSERT INTO ACCOUNTS (NAME, EMAIL, PHONE, ADDRESS, OPEN, CLOSE, WORKER, PASSWORD) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
		account.Name, account.Email, account.Phone, account.Address, account.Open, account.Close, account.Worker, password)
	if err != nil {
		log.Println(err)
		return
	} else if err := registered.RowsAffected(); err == 0 {
		log.Println(err)
		return
	}

	if err := DB.QueryRow(context.Background(), "SELECT NAME, PHONE, ADDRESS, OPEN, CLOSE, WORKER, MAXTABLE FROM ACCOUNTS WHERE EMAIL=$1", account.Email).Scan(
		&name, &phone, &address, &open, &close, &worker, &MaxTable); errors.Is(err, pgx.ErrNoRows) {
		log.Println(err)
		return
	} else if err != nil {
		log.Println(err)
		return
	}

	if err := DB.Commit(context.Background()); err != nil {
		log.Println(err)
		return
	}

	json.NewEncoder(w).Encode(API{
		Status:   true,
		Name:     name,
		Phone:    phone,
		Address:  address,
		Open:     open,
		Close:    close,
		Worker:   worker,
		MAXTable: MaxTable,
	})

	format := fmt.Sprintf("%s Berhasil mendaftar", account.Email)
	fmt.Println(format)
}

func Login(w http.ResponseWriter, r *http.Request) {
	var account API
	var name, phone, address, open, close, password string
	var worker, MaxTable int

	w.Header().Set("Access-Control-Allow-Origin", config.HOST)
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == http.MethodOptions {
		log.Println(r.Method)
		w.WriteHeader(http.StatusOK)
		return
	}

	if err := json.NewDecoder(r.Body).Decode(&account); err != nil {
		log.Println(err)
		return
	}

	if err := database.QueryRow(context.Background(), "SELECT NAME, PHONE, ADDRESS, OPEN, CLOSE, WORKER, MAXTABLE, PASSWORD FROM ACCOUNTS WHERE EMAIL=$1", account.Email).Scan(
		&name, &phone, &address, &open, &close, &worker, &MaxTable, &password); errors.Is(err, pgx.ErrNoRows) {
		json.NewEncoder(w).Encode(API{
			Status: false,
			Type:   "Email",
			Detail: "Email tidak ditemukan",
		})
		log.Println(err)
		return
	} else if err != nil {
		log.Println(err)
		return
	}

	password_valid, err := argon2id.ComparePasswordAndHash(account.Password, password)
	if !password_valid {
		json.NewEncoder(w).Encode(API{
			Status: false,
			Type:   "Password",
			Detail: "Password Salah",
		})
		return
	} else if err != nil {
		log.Println(err)
		return
	}

	json.NewEncoder(w).Encode(API{
		Status:   true,
		Name:     name,
		Phone:    phone,
		Address:  address,
		Open:     open,
		Close:    close,
		Worker:   worker,
		MAXTable: MaxTable,
	})
	format := fmt.Sprintf("%s Login", account.Email)
	fmt.Println(format)
}

func ChangePassword(w http.ResponseWriter, r *http.Request) {
	var account API
	var email string

	w.Header().Set("Access-Control-Allow-Origin", config.HOST)
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if err := json.NewDecoder(r.Body).Decode(&account); err != nil {
		log.Println(err)
		return
	}

	if err := database.QueryRow(context.Background(), "SELECT EMAIL FROM ACCOUNTS WHERE EMAIL=$1", account.Email).Scan(&email); errors.Is(err, pgx.ErrNoRows) {
		json.NewEncoder(w).Encode(API{
			Status: false,
			Detail: "Email Tidak Terdaftar",
		})
		return
	} else if err != nil {
		log.Println(err)
		return
	}

	new_password, err := argon2id.CreateHash(account.Password, argon_params)
	if err != nil {
		log.Println(err)
		return
	}

	change, err := database.Exec(context.Background(), "UPDATE ACCOUNTS SET PASSWORD=$1 WHERE EMAIL=$2", new_password, email)
	if err != nil {
		log.Println(err)
		return
	}
	if err := change.RowsAffected(); err == 0 {
		log.Println(err)
		return
	}

	json.NewEncoder(w).Encode(API{
		Status: true,
	})
	format := fmt.Sprintf("%s Change Password", email)
	fmt.Println(format)
}

// OTHER
func SendOTP(to, subject, body string) error {
	if err := godotenv.Load(".env"); err != nil {
		return fmt.Errorf("%s", err)
	}
	host := os.Getenv("HOST")
	username := os.Getenv("USER")
	password := os.Getenv("APPPASSWORD")

	if host == "" || username == "" || password == "" {
		return fmt.Errorf("konfigurasi SMTP belum lengkap")
	}

	msg := mail.NewMsg()

	if err := msg.From(username); err != nil {
		return fmt.Errorf("alamat pengirim: %w", err)
	}

	if err := msg.To(to); err != nil {
		return fmt.Errorf("alamat penerima: %w", err)
	}

	msg.Subject(subject)
	msg.SetBodyString(mail.TypeTextPlain, body)

	client, err := mail.NewClient(
		host,
		mail.WithTLSPortPolicy(mail.TLSMandatory),
		mail.WithSMTPAuth(mail.SMTPAuthPlain),
		mail.WithUsername(username),
		mail.WithPassword(password),
	)
	if err != nil {
		return fmt.Errorf("gagal membuat SMTP client: %w", err)
	}

	if err := client.DialAndSend(msg); err != nil {
		return fmt.Errorf("gagal mengirim email: %w", err)
	}

	return nil
}
