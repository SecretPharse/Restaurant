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
	Detail   string `json:"Detail"`
	Name     string `json:"Name"`
	Email    string `json:"Email"`
	Phone    string `json:"Phone"`
	Address  string `json:"Address"`
	Open     string `json:"Open"`
	Close    string `json:"Close"`
	Worker   int    `json:"Worker"`
	Password string `json:"Password"`
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

func main() {
	var config configuration

	connect()
	defer database.Close()

	load, err := os.ReadFile("../config.json")
	if err != nil {
		log.Panicln(err)
	}

	if err := json.Unmarshal(load, &config); err != nil {
		log.Panicln(err)
	}

	http.ListenAndServe(config.HOST, nil)
}

func connect() {
	var config configuration

	load, err := os.ReadFile("../config.json")
	if err != nil {
		log.Panicln(err)
	}

	if err := json.Unmarshal(load, &config); err != nil {
		log.Panicln(err)
	}

	database, err = pgxpool.New(context.Background(), config.URL)
	if err != nil {
		log.Panicln(err)
	}

	if err := database.Ping(context.Background()); err != nil {
		log.Panicln(err)
	}
	fmt.Println("Berhasil Terhubung Ke Database")
}

func Verify(w http.ResponseWriter, r *http.Request) {
	var api API
	var cache string

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	DB, err := database.Begin(context.Background())
	if err != nil {
		json.NewEncoder(w).Encode(API{
			Status: false,
			Detail: "Sistem bermasalah",
		})
		log.Println(err)
		return
	}
	defer DB.Rollback(context.Background())

	if r.Method == http.MethodOptions {
		json.NewEncoder(w).Encode(API{
			Status: false,
			Detail: "Sistem bermasalah",
		})
		log.Println(r.Method)
		w.WriteHeader(http.StatusOK)
		return
	}

	if err := json.NewDecoder(r.Body).Decode(&api); err != nil {
		json.NewEncoder(w).Encode(API{
			Status: false,
			Detail: "Sistem bermasalah",
		})
		log.Println(err)
		return
	}

	if err := DB.QueryRow(context.Background(), "SELECT EMAIL FROM VERIFICATIONS WHERE EMAIL=$1", api.Email).Scan(&cache); errors.Is(err, pgx.ErrNoRows) {
		num, err := rand.Int(rand.Reader, big.NewInt(10000))
		if err != nil {
			json.NewEncoder(w).Encode(API{
				Status: false,
				Detail: "Gagal membuat OTP",
			})
			log.Println(err)
			return
		}

		Raw_OTP := fmt.Sprintf("%04d", num.Int64())
		OTP, err := argon2id.CreateHash(Raw_OTP, argon_params)
		if err != nil {
			json.NewEncoder(w).Encode(API{
				Status: false,
				Detail: "Gagal membuat OTP",
			})
			log.Println(err)
			return
		}

		Time := time.Now()
		Code_Expire := Time.Add(10 * time.Minute)
		Verification_Expire := Time.Add(24 * time.Hour)

		InsertDB, err := DB.Exec(context.Background(), "INSERT INTO VERIFICATIONS (EMAIL, CODE, CODE_EXPIRE, VERIFICATION_EXPIRE) VALUES ($1, $2, $3, $4)",
			api.Email, OTP, Code_Expire, Verification_Expire)
		if err != nil {
			json.NewEncoder(w).Encode(API{
				Status: false,
				Detail: "Database bermasalah",
			})
			log.Println(err)
			return
		} else if InsertDB.RowsAffected() == 0 {
			json.NewEncoder(w).Encode(API{
				Status: false,
				Detail: "Gagal mendaftarkan email",
			})
			return
		}

		format := fmt.Sprintf("%s Meminta kode OTP", api.Email)
		fmt.Println(format)
		if err := SendOTP(api.Email, "Kode OTP kamu", Raw_OTP); err != nil {
			json.NewEncoder(w).Encode(API{
				Status: false,
				Detail: "Gagal mengirim OTP",
			})
			log.Println(err)
			return
		}

		if err := DB.Commit(context.Background()); err != nil {
			json.NewEncoder(w).Encode(API{
				Status: false,
				Detail: "Sistem bermasalah",
			})
			log.Println(err)
			return
		}

		json.NewEncoder(w).Encode(API{
			Status: true,
			Detail: "Code OTP sudah dikirim ke email kamu",
		})
		format = fmt.Sprintf("%s Permintaan verifikasi sedang dalam proses", api.Email)
		fmt.Println(format)
		return
	} else if err != nil {
		json.NewEncoder(w).Encode(API{
			Status: false,
			Detail: "Sistem bermasalah",
		})
		log.Println(err)
		return
	}

	json.NewEncoder(w).Encode(API{
		Status: false,
		Detail: "Email telah terdaftar",
	})
}

func CancelVerify(w http.ResponseWriter, r *http.Request) {
	var api API

	w.Header().Set("Access-Control-Allow-Origin", "*")
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

	if err := json.NewDecoder(r.Body).Decode(&api); err != nil {
		json.NewEncoder(w).Encode(API{
			Status: false,
			Detail: "Sistem bermasalah",
		})
		log.Println(err)
		return
	}

	delete, err := database.Exec(context.Background(), "DELETE FROM VERIFICATIONS WHERE EMAIL=$1", api.Email)
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
	format := fmt.Sprintf("%s Membatalkan verifikasi", api.Email)
	fmt.Println(format)
}

func RequestNewOTP(w http.ResponseWriter, r *http.Request) {
	var api API
	var request_count int

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	DB, err := database.Begin(context.Background())
	if err != nil {
		json.NewEncoder(w).Encode(API{
			Status: false,
			Detail: "Sistem bermasalah",
		})
		log.Println(err)
		return
	}
	defer DB.Rollback(context.Background())

	if r.Method == http.MethodOptions {
		json.NewEncoder(w).Encode(API{
			Status: false,
			Detail: "Sistem bermasalah",
		})
		log.Println(r.Method)
		w.WriteHeader(http.StatusOK)
		return
	}

	if err := json.NewDecoder(r.Body).Decode(&api); err != nil {
		json.NewEncoder(w).Encode(API{
			Status: false,
			Detail: "Sistem bermasalah",
		})
		log.Print(err)
		return
	}

	if err := DB.QueryRow(context.Background(), "SELECT REQUEST_COUNT FROM VERIFICATIONS WHERE EMAIL = $1", api.Email).Scan(&request_count); errors.Is(err, pgx.ErrNoRows) {
		json.NewEncoder(w).Encode(API{
			Status: false,
			Detail: "Email tidak ditemukan",
		})
		return
	} else if err != nil {
		json.NewEncoder(w).Encode(API{
			Status: false,
			Detail: "Sistem bermasalah",
		})
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
		json.NewEncoder(w).Encode(API{
			Status: false,
			Detail: "Sistem bermasalah",
		})
		log.Println(err)
		return
	}

	Raw_OTP := fmt.Sprintf("%04d", num.Int64())
	OTP, err := argon2id.CreateHash(Raw_OTP, argon_params)
	if err != nil {
		json.NewEncoder(w).Encode(API{
			Status: false,
			Detail: "Sistem bermasalah",
		})
		log.Println(err)
		return
	}

	Time := time.Now()
	Code_Expire := Time.Add(10 * time.Minute)

	NewOTP, err := DB.Exec(context.Background(), "UPDATE VERIFICATIONS SET CODE=$1, CODE_EXPIRE=$2, REQUEST_COUNT=$3 WHERE EMAIL=$4",
		OTP, Code_Expire, request_count+1, api.Email)
	if err != nil {
		json.NewEncoder(w).Encode(API{
			Status: false,
			Detail: "Database bermasalah",
		})
		log.Println(err)
		return
	} else if NewOTP.RowsAffected() == 0 {
		json.NewEncoder(w).Encode(API{
			Status: false,
			Detail: "Permintaan OTP baru gagal",
		})
		return
	}

	if err := SendOTP(api.Email, "Kode OTP kamu", Raw_OTP); err != nil {
		json.NewEncoder(w).Encode(API{
			Status: false,
			Detail: "Gagal mengirim kode OTP",
		})
		log.Println(err)
		return
	}

	if err := DB.Commit(context.Background()); err != nil {
		json.NewEncoder(w).Encode(API{
			Status: false,
			Detail: "Sistem bermasalah",
		})
		log.Println(err)
		return
	}

	json.NewEncoder(w).Encode(API{
		Status: true,
		Detail: "OTP baru telah dikirim",
	})
	format := fmt.Sprintf("%s Meminta OTP Baru", api.Email)
	fmt.Println(format)
}

// OTHER
func SendOTP(to, subject, body string) error {
	if err := godotenv.Load(); err != nil {
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
