package routes

import (
	"net/http"

	"parthlaw/chat-server/controllers"
	"parthlaw/chat-server/utils"

	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

func Handlers(Db *gorm.DB) *mux.Router {
	r := mux.NewRouter().StrictSlash(true)
	// r.Methods("OPTIONS").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	// 	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	// 	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT,DELETE")
	// 	w.Header().Set("Access-Control-Allow-Credentials", "true")
	// 	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, Access-Control-Request-Headers, Access-Control-Request-Method, Connection, Host, Origin, User-Agent, Referer, Cache-Control, X-header")
	// })
	// r.Use(func(h http.Handler) http.Handler {
	// 	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	// 		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	// 		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT,DELETE")
	// 		w.Header().Set("Access-Control-Allow-Credentials", "true")
	// 		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, Access-Control-Request-Headers, Access-Control-Request-Method, Connection, Host, Origin, User-Agent, Referer, Cache-Control, X-header")
	// 		h.ServeHTTP(w, r)
	// 	})
	// })
	h := controllers.NewUtilHandler(Db)
	r.HandleFunc("/", func(rw http.ResponseWriter, r *http.Request) {
		rw.WriteHeader(http.StatusAccepted)
		rw.Write([]byte("Hello World"))
	}).Methods("GET")
	r.HandleFunc("/login", h.Login).Methods("POST")
	r.HandleFunc("/register", h.Register).Methods("POST")
	r.HandleFunc("/logout", h.Logout).Methods("GET")
	s := r.PathPrefix("/auth").Subrouter()

	s.Use(utils.JWTVerify)
	s.HandleFunc("/createroom", h.RoomCreate).Methods("POST")
	s.HandleFunc("/room/messages", h.RoomMessages).Methods("POST")
	s.HandleFunc("/room/join", h.RoomJoin).Methods("POST")
	s.HandleFunc("/checkauth", h.User).Methods("GET")
	return r
}
