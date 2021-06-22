import React, { useContext } from "react";
import { useHistory } from "react-router";
import { ContextProvider } from "../../context";
import PrivateComponent from "../../utils/PrivateComponent";
import "./Welcome.css";
const Welcome = () => {
  const history = useHistory();
  const { user } = useContext(ContextProvider);
  return (
    <PrivateComponent>
      <div className="Welcome">
        {user && user.User ? (
          <>
            <div className="welcome-content">
              <div className="welcome-message">
                Welcome to GOCHAT <br />
                {user.User.Username.toUpperCase()}
              </div>
              <div className="buttons">
                <button
                  className="start"
                  onClick={() => {
                    history.push(`/chat/${user.Rooms[0].ID}`);
                  }}
                >
                  Get Started
                </button>
                <a href="https://github.com/parthlaw/Gochat">
                  <button className="git">
                    GitHub <i className="fa fa-github"></i>
                  </button>
                </a>
              </div>
            </div>
          </>
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    </PrivateComponent>
  );
};

export default Welcome;
