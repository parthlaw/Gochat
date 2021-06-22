package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"parthlaw/chat-server/models"
	"parthlaw/chat-server/structs"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func (h *UtilHandler) Register(w http.ResponseWriter, r *http.Request) {
	var creds models.UserAuth
	err := json.NewDecoder(r.Body).Decode(&creds)
	fmt.Println(err)
	if err != nil || creds.User.Name == "" || creds.Email == "" || creds.Password == "" || creds.User.Username == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(&structs.Response{Error: true, Message: "Body not provided"})
		return
	}
	password, er := bcrypt.GenerateFromPassword([]byte(creds.Password), 14)
	if er != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&structs.Response{Error: true, Message: "Internal Server Error"})
		return
	}
	creds.Password = string(password)
	creds.User.Rooms = append(creds.User.Rooms, &models.Room{Model: gorm.Model{ID: 1}})
	result := h.db.Create(&creds)
	if result.Error != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&structs.Response{Error: true, Message: "Internal Server Error"})
		return
	}
	w.WriteHeader(http.StatusAccepted)
	json.NewEncoder(w).Encode(&structs.Response{Success: true, Message: "Create Success"})
}
