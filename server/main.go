package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"parthlaw/chat-server/rabbit"
	"parthlaw/chat-server/routes"
	"parthlaw/chat-server/utils"
	ws "parthlaw/chat-server/websocket"

	"github.com/rs/cors"
	"github.com/streadway/amqp"
	"gorm.io/gorm"
)

var Db *gorm.DB

func main() {
	// er := godotenv.Load(".env")
	db, err := utils.Connect()

	// if er != nil {
	// 	panic("Error in setting Env")
	// }
	if err != nil {
		panic("Error occured")
	}
	conn, error := amqp.Dial(os.Getenv("RABBIT_URI"))
	if error != nil {
		fmt.Println(error)
		panic(1)
	}
	defer conn.Close()
	fmt.Println("Connected to RabbitMQ instance")
	con := rabbit.NewConn(conn)
	go con.HandleMessages()
	//db.AutoMigrate(&models.User{}, &models.Room{}, &models.UserAuth{}, &models.MessagesRoom{})
	Db = db
	fmt.Println("Database Connected")
	// port := os.Getenv("PORT")
	wsServer := ws.NewWebsocketServer(conn)
	go wsServer.Run()
	mux := http.NewServeMux()
	mux.HandleFunc("/hello", func(rw http.ResponseWriter, r *http.Request) { rw.Write([]byte("Hello World")) })
	mux.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) { fmt.Println("Request"); ws.ServeWs(wsServer, w, r) })
	mux.Handle("/", routes.Handlers(db))
	c := cors.New(cors.Options{AllowedOrigins: []string{"http://localhost:3000", "https://bako.vercel.app"}, AllowCredentials: true, AllowedHeaders: []string{"Content-Type", "Bearer", "Bearer ", "content-type", "Origin", "Accept"}})
	handler := c.Handler(mux)
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	fmt.Printf("Server Running on port %s\n", port)
	e := http.ListenAndServe(":"+port, handler)
	if e != nil {
		log.Fatal(e)
	}

}
