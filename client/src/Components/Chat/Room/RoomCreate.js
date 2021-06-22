import React, { useContext, useState } from "react";
import { createRoom } from "../../../api";
import { ContextProvider } from "../../../context";

const RoomJoin = () => {
  const [formData, setFormData] = useState({});
  const { setLoading } = useContext(ContextProvider);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await createRoom(formData);
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
      <div id="popup3" className="overlay light">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className="cancel" href="#">
          &times;
        </a>
        <div className="popup">
          <h2>Please, enter room Name and Password for creating.</h2>
          <div className="content">
            <form onSubmit={handleSubmit}>
              <fieldset>
                <div className="input-block">
                  <label htmlFor="room-name">Unique Room Key</label>
                  <input
                    id="room-name"
                    type="text"
                    name="Name"
                    onChange={updateInput}
                    value={formData.Name || ""}
                    required
                  />
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    name="Password"
                    onChange={updateInput}
                    value={formData.Password || ""}
                    required
                  />
                </div>
              </fieldset>
              <button type="submit">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomJoin;
