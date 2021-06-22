package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name     string
	Username string `gorm:"uniqueIndex:compositeindex;type:text;not null"`
	Photo    string
	Rooms    []*Room `gorm:"many2many:user_rooms;"`
}
