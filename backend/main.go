package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

var database *pgxpool.Pool

type configuration struct {
	URL string `json:"URL"`
	HOST string `json:"HOST"`
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

	w.Header().Set("Access-Controll-Allow-Origin", "*")
	w.Header().Set("Access-Controll-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Controll-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}
}
