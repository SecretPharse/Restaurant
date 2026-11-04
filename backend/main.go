package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	http.ListenAndServe("http://127.0.0.1:8080", nil)
}
func connect(){
	if err := godotenv.Load(); err != nil {
		log.Panicln(err)
	}

	password := os.Getenv("PASSWORD")
	databaseURL := fmt.Sprintf("postgres://postgres:%s@127.0.0.1:5432/", password)
}
