package structs

import (
	"time"
)

func UniqueId() string {
	hr := time.Now().Hour()
	min := time.Now().Minute()
	sec := time.Now().Second()
	day := time.Now().Day()
	id := string(rune(hr)) + string(rune(min)) + string(rune(sec)) + string(rune(day))
	return id
}
