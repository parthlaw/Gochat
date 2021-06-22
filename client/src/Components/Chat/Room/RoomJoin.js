import React, { useContext, useState } from "react";
import { joinRoom } from "../../../api";
import { ContextProvider } from "../../../context";

const RoomJoin = ({ setCreate }) => {
  const [formData, setFormData] = useState({});
  const { setLoading } = useContext(ContextProvider);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await joinRoom(formData);
      if (data && data.Success) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const updateInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <div id="popup2" className="overlay light">
        {/*eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className="cancel" href="#">
          &times;
        </a>
        <div className="popup">
          <h2>Please, enter room Name and Password for creating.</h2>
          <div className="content">
            <form onSubmit={handleSubmit}>
              <fieldset>
                <div className="input-block">
                  <label htmlFor="room-key">Unique Room Key</label>
                  <input
                    id="room-key"
                    type="text"
                    name="RoomKey"
                    onChange={updateInput}
                    value={formData.RoomKey || ""}
                    required
                  />
                  <label htmlFor="room-password">Password</label>
                  <input
                    id="room-password"
                    type="password"
                    name="Password"
                    onChange={updateInput}
                    value={formData.Password || ""}
                    required
                  />
                </div>
              </fieldset>
              <button type="submit">Join</button>
              <br />
              <br />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomJoin;
