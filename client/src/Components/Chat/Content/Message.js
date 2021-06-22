import React from "react";

const Message = ({ data }) => {
  return (
    <div className={data.me ? "message-list me" : "message-list"}>
      <div className="name">{data.sender}</div>
      <div className="msg">
        <p>{data.msg}</p>
      </div>
      <div className="time">{data.time}</div>
    </div>
  );
};

export default Message;
