package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

var database *pgxpool.Pool

func main() {
	if err := godotenv.Load("../.env"); err != nil {
		log.Panicln(err)
	}
	output := os.Getenv("DatabaseURL")
	fmt.Println(output)
}

func connect() {
	if err := godotenv.Load(); err != nil {
		log.Panicln(err)
	}

	DatabaseURL := os.Getenv("DatabaseURL")
	database, err := pgxpool.New(context.Background(), DatabaseURL)
	if err != nil {
		log.Panicln(err)
	}

	if err := database.Ping(context.Background()); err != nil {
		log.Panicln(err)
	}
	fmt.Println("Berhasil Terhubung Ke Database")
}
