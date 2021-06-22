package models

import "gorm.io/gorm"

type MessagesRoom struct {
	gorm.Model
	RoomID uint
	Room   Room
	UserID uint
	User   User
	Text   string
	Attach string
}
