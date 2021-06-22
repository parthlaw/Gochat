package rabbit

import (
	"parthlaw/chat-server/utils"

	"github.com/streadway/amqp"
)

func Emit(conn *amqp.Connection, msg amqp.Publishing, key string) {
	ch, err := conn.Channel()
	utils.FailOnError(err, "Failed to open a channel")
	DeclareExchange(ch)
	ch.Publish(
		"coversation.incoming",
		key,
		false,
		false,
		msg,
	)
}
