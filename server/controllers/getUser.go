package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"parthlaw/chat-server/models"
	"parthlaw/chat-server/structs"
)

func (h *UtilHandler) User(w http.ResponseWriter, r *http.Request) {
	userId := r.Context().Value("user").(uint)
	var user models.User
	if er := h.db.Where("id=?", userId).Find(&user).Error; er != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&structs.Response{Error: true, Message: "Internal Server Error"})
	}
	var rooms []models.Room
	err :=
		h.db.Joins("JOIN user_rooms ON user_rooms.room_id=rooms.id").
			Joins("JOIN users on user_rooms.user_id=users.id").Where("users.id=?", userId).Select("rooms.id,rooms.name,rooms.image,rooms.admin").Find(&rooms).Error

	if err != nil {
		//internal server error
		fmt.Println(err)
	}
	fmt.Println(rooms)
	// w.WriteHeader(http.StatusAccepted)
	type data struct {
		User  models.User
		Rooms []models.Room
	}
	type response struct {
		structs.Response
		Data data
	}
	payload := response{Response: structs.Response{Success: true, Message: "User found"}, Data: data{User: user, Rooms: rooms}}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(payload)
}
