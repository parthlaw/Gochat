package controllers

import (
	"fmt"

	"gorm.io/gorm"
)

type UtilHandler struct {
	db *gorm.DB
}

func NewUtilHandler(db *gorm.DB) *UtilHandler {
	fmt.Println("New Connection")
	return &UtilHandler{
		db: db,
	}
}
