package structs

import "github.com/dgrijalva/jwt-go"

type Claims struct {
	jwt.StandardClaims
	User uint `json:"user"`
}
