package utils

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"parthlaw/chat-server/structs"

	"github.com/dgrijalva/jwt-go"
)

func JWTVerify(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		type response structs.Response
		cookie, err := r.Cookie("token")
		fmt.Println(r.Cookies())
		if err != nil {
			fmt.Println(err)
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(response{Error: true, Message: "Missing Auth token"})
			return
		}
		tknStr := cookie.Value
		claims := &structs.Claims{}
		tkn, err := jwt.ParseWithClaims(tknStr, claims, func(t *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("JWT_KEY")), nil
		})
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		if !tkn.Valid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		type user string
		ctx := context.WithValue(r.Context(), "user", claims.User)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
