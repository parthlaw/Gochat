package models

import "gorm.io/gorm"

type UserAuth struct {
	gorm.Model
	Email    string
	Password string
	UserID   uint
	User     User
}
