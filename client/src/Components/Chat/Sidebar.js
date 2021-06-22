/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { ContextProvider } from "../../context";
const Sidebar = ({ open, handleSidebarClick }) => {
  const { user, typing } = useContext(ContextProvider);
  return (
    <>
      <div className={open ? "sidebar opened" : "sidebar"}>
        <span className="logo">GOCHAT</span>
        <div className="list-wrap">
          {user ? (
            user.Rooms?.map((data, i) => {
              return (
                <div
                  className="list"
                  key={i}
                  onClick={() => {
                    handleSidebarClick(data);
                  }}
                >
                  <img src={data.img} alt="" />
                  <div className="info">
                    <span className="user">{data.Name}</span>
                    <span className="text">
                      {typing.ID == data.ID
                        ? typing.msg
                        : data.Private
                        ? "Person"
                        : "Group"}
                    </span>
                  </div>
                  {/* <span className="count">
                    {data.unread ? data.unread : <></>}
                  </span> */}
                  <span className="time">now</span>
                </div>
              );
            })
          ) : (
            <h1>Loading</h1>
          )}
          <div className="buttons">
            <a href="#popup3" className="button">
              CREATE
            </a>
            <a href="#popup2" className="button">
              JOIN
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
