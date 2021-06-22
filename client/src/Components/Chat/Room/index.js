import React from "react";
import RoomJoin from "./RoomJoin";
import RoomCreate from "./RoomCreate";
import "./Room.css";
const Room = () => {
  return (
    <>
      <div className="RoomForm">
        <RoomJoin />
        <RoomCreate />
      </div>
    </>
  );
};

export default Room;
