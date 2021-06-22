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

func (h *UtilHandler) RoomJoin(w http.ResponseWriter, r *http.Request) {
	var creds struct {
		RoomKey  string
		Password string
	}
	userId := r.Context().Value("user").(uint)
	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	var room models.Room
	h.db.First(&room).Where(&models.Room{UniqueKey: creds.RoomKey})
	e := bcrypt.CompareHashAndPassword([]byte(room.Password), []byte(creds.Password))
	if e != nil {
		fmt.Println(e)
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(&structs.Response{Error: true, Message: "Wrong Auth Creds"})
		return
	}
	h.db.Model(&room).Association("Users").Append(&models.User{Model: gorm.Model{ID: userId}})
	w.WriteHeader(http.StatusAccepted)
	json.NewEncoder(w).Encode(&structs.Response{Success: true, Message: "Added to the room"})
	//send room data also
}
