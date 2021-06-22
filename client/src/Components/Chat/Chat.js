/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useContext, useEffect, useRef, useState } from "react";
import Content from "./Content";
import Sidebar from "./Sidebar";
import "./Chat.css";
import { useHistory, useParams } from "react-router";
import PrivateComponent from "../../utils/PrivateComponent";
import { ContextProvider } from "../../context";
import { ToastProvider } from "react-toast-notifications";
import Room from "./Room";
const Chat = () => {
  const [sidebar, setSidebar] = useState(false);
  const { user, setLoading, setCurrentRoom } = useContext(ContextProvider);
  var { id } = useParams();
  const [open, setOpen] = useState(WebSocket.CONNECTING);
  const history = useHistory();
  useEffect(() => {
    if (id) {
      if (user && user.Rooms) {
        const data = user.Rooms.find((r) => {
          return r.ID == id;
        });
        setCurrentRoom({
          room: data.Name,
          time: data.time,
          img: "https://www.cheatsheet.com/wp-content/uploads/2019/10/taylor-swift-1024x681.jpg",
          ID: data.ID,
        });
      }
    }
  }, [id, user]);
  const sock = useRef();
  useEffect(() => {
    setLoading(true);
    if (user && user.User) {
      const ws = new WebSocket(
        `wss://bakov2.herokuapp.com/ws?name=${user.User.Username}`
      );
      ws.onopen = (e) => {
        setOpen(ws.readyState);
      };
      ws.onclose = (e) => {
        console.log("closed");
      };
      sock.current = ws;
    }
    return function cleanup() {
      sock.current.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  useEffect(() => {
    console.log("connected");
    if (sock.current && sock.current.readyState === WebSocket.OPEN) {
      if (id) {
        const message = {
          action: "join-room",
          message: id,
        };
        sock.current.send(JSON.stringify(message));
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, id]);
  const handleSidebar = () => {
    setSidebar(!sidebar);
  };
  const handleSidebarClick = (data) => {
    setCurrentRoom({
      room: data.Name,
      time: data.time,
      img: "https://www.cheatsheet.com/wp-content/uploads/2019/10/taylor-swift-1024x681.jpg",
      ID: data.ID,
    });
    history.push(`/chat/${data.ID}`);
    //sock.current.send = () => {};
  };
  return (
    <PrivateComponent>
      <div className="container">
        <Room />
        <Sidebar open={sidebar} handleSidebarClick={handleSidebarClick} />
        {id ? (
          <ToastProvider>
            <Content
              handleSidebar={handleSidebar}
              room={id}
              ws={sock.current}
            />
          </ToastProvider>
        ) : (
          <h1>Select A chat</h1>
        )}
      </div>
    </PrivateComponent>
  );
};

export default Chat;
