/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useContext, useEffect, useState } from "react";
import { ContextProvider } from "../../../context";
import { useParams } from "react-router";
import Message from "./Message";
import Header from "./Header";
import Type from "./Type";
const Content = ({ handleSidebar, room, ws }) => {
  const {
    user,
    setLoading,
    messages,
    setMessages,
    currentRoom,
    typing,
    setTyping,
  } = useContext(ContextProvider);
  const [text, setText] = useState("");
  const [roomId, setId] = useState("");
  useEffect(() => {
    if (typing.msg !== "") {
      setTimeout(() => {
        return setTyping({ msg: "", ID: "" });
      }, 3000);
    }
  }, [typing]);
  const { id } = useParams();
  useEffect(() => {
    messages.forEach((message) => {
      message.read = message.target.name === id;
    });
    // const getData = async () => {
    //   const data = await getRoomMessages({ RoomID: parseInt(id) });
    //   console.log("data", data);
    // };
    // getData();
  }, [id]);
  useEffect(() => {
    if (ws) {
      ws.onmessage = function (e) {
        console.log(e.data);
        const json = JSON.parse(e.data);
        if (json.action === "room-joined") {
          setId(json.target.id);
          setLoading(false);
        }
        if (json.action === "send-message") {
          console.log(currentRoom);
          setMessages((m) => [
            ...m,
            {
              me: json.sender.name === user.User.Username,
              msg: json.message,
              time: "now",
              sender: json.sender.name,
              target: json.target.name,
              read: json.target.name == 2,
            },
          ]);
        }
        if (json.action === "typing") {
          setTyping({ msg: json.message, ID: json.target.name });
        }
      };
    }
  }, [ws]);
  const sendHandler = () => {
    const message = {
      action: "send-message",
      message: text,
      target: {
        ID: roomId,
        name: room,
      },
      sender: {
        Name: user.User.Username,
      },
    };
    ws.send(JSON.stringify(message));
    setText("");
  };
  const changeHandler = (e) => {
    setText(e.target.value);
    const message = {
      action: "typing",
      message: `${user.User.Username} is typing`,
      target: {
        ID: roomId,
        name: room,
      },
      sender: {
        Name: user.User.Username,
      },
    };
    ws.send(JSON.stringify(message));
  };
  return (
    <>
      <div className="content">
        <Header
          currentRoom={currentRoom}
          typing={typing}
          handleSidebar={handleSidebar}
        />
        <div className="message-wrap">
          {messages.map((data, i) => {
            if (data.target === id) {
              return <Message data={data} key={i} i={i} />;
            } else {
              return <></>;
            }
          })}
        </div>
        <Type
          changeHandler={changeHandler}
          currentRoom={currentRoom}
          text={text}
          sendHandler={sendHandler}
        />
      </div>
    </>
  );
};

export default Content;
