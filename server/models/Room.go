package models

import "gorm.io/gorm"

type Room struct {
	gorm.Model
	Name      string `gorm:"not null"`
	Password  string
	Admin     uint    `gorm:"not null"`
	UniqueKey string  `gorm:"uniqueIndex:uniqueKey;type:text;not null"`
	User      User    `gorm:"foreignKey:Admin"`
	Users     []*User `gorm:"many2many:user_rooms;"`
	Personal  bool    //true for room and false personal
	Image     string
}
