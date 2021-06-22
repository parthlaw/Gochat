import React from "react";

const Type = ({ changeHandler, currentRoom, text, sendHandler }) => {
  return (
    <div className="message-footer">
      <input
        type="text"
        placeholder={`Send a message to ${currentRoom.room}`}
        onChange={(e) => changeHandler(e)}
        onKeyPress={(e) => {
          if (e.code === "Enter") {
            sendHandler(e);
          }
        }}
        value={text}
      />
      <div className="send" onClick={sendHandler}>
        <i className="fa fa-paper-plane" area-hidden="true"></i>
      </div>
    </div>
  );
};

export default Type;
