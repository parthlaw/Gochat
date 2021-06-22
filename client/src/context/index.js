import React, { useState, createContext } from "react";
//import csc from 'country-state-city';
export const ContextProvider = createContext();
export const Context = (props) => {
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState(true);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentRoom, setCurrentRoom] = useState({
    room: "",
    time: "",
    img: "",
    ID: "",
  });
  const [typing, setTyping] = useState({
    msg: "",
    ID: "",
  });
  return (
    <ContextProvider.Provider
      value={{
        user,
        setUser,
        auth,
        setAuth,
        loading,
        setLoading,
        messages,
        setMessages,
        currentRoom,
        setCurrentRoom,
        typing,
        setTyping,
      }}
    >
      {props.children}
    </ContextProvider.Provider>
  );
};
