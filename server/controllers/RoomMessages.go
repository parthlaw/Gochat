package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"parthlaw/chat-server/models"
	"parthlaw/chat-server/structs"
)

func (h *UtilHandler) RoomMessages(w http.ResponseWriter, r *http.Request) {
	var creds struct {
		RoomID uint
	}
	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(&structs.Response{Error: true, Message: "Error in processing Body"})
		return
	}
	userId := r.Context().Value("user").(uint)
	fmt.Println("User: ", userId)
	//var room models.Room
	//var user []models.User
	type resStruct struct {
		UserId string
		RoomId string
	}
	var result resStruct
	rows, _ := h.db.Raw("select * from user_rooms where user_id=? and room_id=?", userId, creds.RoomID).Rows()
	//c, _ := rows.Columns()
	for rows.Next() {
		h.db.ScanRows(rows, &result)
	}
	if (resStruct{}) == result {
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(&structs.Response{Error: true, Message: "Not authorized in this room"})
		return
	}
	//var user models.User
	type response struct {
		structs.Response
		Data []models.MessagesRoom
	}
	var messages []models.MessagesRoom
	h.db.Joins("User").Where(&models.MessagesRoom{RoomID: creds.RoomID}).Find(&messages)
	w.WriteHeader(http.StatusAccepted)
	json.NewEncoder(w).Encode(&response{Response: structs.Response{Success: true, Message: "Messages found"}, Data: messages})
	//send messages data also
}
