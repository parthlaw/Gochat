package controllers

import (
	"encoding/json"
	"net/http"
	"parthlaw/chat-server/structs"
)

func (h *UtilHandler) Logout(w http.ResponseWriter, r *http.Request) {
	http.SetCookie(w, &http.Cookie{Name: "token", Value: "", HttpOnly: true, MaxAge: 0, SameSite: 4, Secure: true})
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(&structs.Response{Success: true, Message: "Logout Successfull"})
}
