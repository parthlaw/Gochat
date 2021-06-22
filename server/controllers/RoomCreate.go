package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"parthlaw/chat-server/models"
	"parthlaw/chat-server/structs"

	"github.com/jackc/pgconn"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func isDuplicateKeyError(err error) bool {
	pgErr, ok := err.(*pgconn.PgError)
	if ok {
		return pgErr.Code == "23505"
	}
	return false
}
func (h *UtilHandler) RoomCreate(w http.ResponseWriter, r *http.Request) {
	var creds models.Room
	err := json.NewDecoder(r.Body).Decode(&creds)
	userId := r.Context().Value("user").(uint)
	if err != nil || creds.Name == "" || creds.Password == "" {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(&structs.Response{Error: true, Message: "Body Invalid"})
		return
	}
	password, e := bcrypt.GenerateFromPassword([]byte(creds.Password), 14)
	if e != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&structs.Response{Error: true, Message: "Internal Server Error"})
		return
	}
	creds.Password = string(password)
	creds.Admin = userId
	uuid := creds.Name + "_" + fmt.Sprint(creds.Admin)
	fmt.Println(uuid)
	creds.UniqueKey = uuid
	result := h.db.Create(&creds)
	if result.Error != nil {
		if isDuplicateKeyError(result.Error) {
			w.WriteHeader(http.StatusConflict)
			json.NewEncoder(w).Encode(&structs.Response{Error: true, Message: "Room with same name already exists"})
			return
		}
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&structs.Response{Error: true, Message: "Internal Server Erroe"})
		return
	}
	h.db.Model(&creds).Association("Users").Append(&models.User{Model: gorm.Model{ID: userId}})
	w.WriteHeader(http.StatusAccepted)
	type response struct {
		structs.Response
		Data models.Room
	}
	json.NewEncoder(w).Encode(&response{Response: structs.Response{Success: true, Message: "Create Success"}, Data: creds})
}
