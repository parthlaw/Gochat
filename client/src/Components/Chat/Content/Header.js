/* eslint-disable eqeqeq */
import React from "react";

const Header = ({ currentRoom, typing, handleSidebar }) => {
  return (
    <header>
      <img src={currentRoom.img} alt="" />
      <div className="info">
        <span className="user">{currentRoom.room}</span>
        <span className="time">
          {typing.ID == currentRoom.ID ? typing.msg : "now"}
        </span>
      </div>
      <div className="open" onClick={handleSidebar}>
        <i className="fa fa-angle-up" style={{ fontSize: "50px" }}></i>
      </div>
    </header>
  );
};

export default Header;
