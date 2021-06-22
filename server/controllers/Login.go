package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	"parthlaw/chat-server/models"
	"parthlaw/chat-server/structs"

	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

func (h *UtilHandler) Login(w http.ResponseWriter, r *http.Request) {
	var creds structs.Creds
	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	var user models.UserAuth
	h.db.Where(&models.UserAuth{Email: creds.Email}).First(&user)
	e := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(creds.Password))

	if e != nil {
		fmt.Println(e)
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(&structs.Response{Error: true, Message: "Wrong Auth Creds"})
		return
	}
	type response struct {
		structs.Response
		Data models.UserAuth
	}
	expiry := time.Now().Add(24 * time.Hour)
	claims := &structs.Claims{
		User:           user.UserID,
		StandardClaims: jwt.StandardClaims{ExpiresAt: expiry.Unix()},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenStr, erro := token.SignedString([]byte(os.Getenv("JWT_KEY")))
	if erro != nil {
		fmt.Println(erro)
		// If there is an error in creating the JWT return an internal server error
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	//expiration := time.Now().Add(365 * 24 * time.Hour)
	http.SetCookie(w, &http.Cookie{Name: "token", Value: tokenStr, HttpOnly: true, MaxAge: 2400000, SameSite: 4, Secure: true})
	// cs := w.Header().Get("Set-Cookie")
	// cs += "; SameSite=none"
	// w.Header().Set("Set-Cookie", cs)
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(&response{Response: structs.Response{Success: true, Message: "Auth Successfull"}, Data: user})

}
