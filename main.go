package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
)

type CONFIGURATION struct {
	Server string `json:"SERVER"`
}

var config CONFIGURATION
func main() {
	load, err := os.ReadFile("./config.json")
	if err != nil {
		log.Panicln(err)
	}

	if err := json.Unmarshal(load, &config); err != nil {
		log.Panicln(err)
	}

	// Server
	server := http.FileServer(http.Dir("./website"))
	http.Handle("/", server)

	format := fmt.Sprintf("Server http://%s", config.Server)
	fmt.Println(format)
	http.ListenAndServe(config.Server, nil)
}