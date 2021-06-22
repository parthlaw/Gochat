import React, { useState } from "react";
import { toast } from "react-toastify";
import { register } from "../../api";

const SignUp = ({ login, handleChange }) => {
  const [formData, setFormData] = useState({});
  const updateInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const body = {
      Email: formData.Email,
      Password: formData.Password,
      User: {
        Name: formData.Name,
        Username: formData.Username,
      },
    };
    const data = await register(body);
    if (data && data.Success) {
      setFormData({});
      toast.success("Login to continue");
      return;
    }
    toast.error(data.Message);
  };
  return (
    <>
      <div className={login ? "form-wrapper" : "form-wrapper is-active"}>
        <button
          type="button"
          className="switcher switcher-signup"
          onClick={handleChange}
        >
          Sign-Up
          <span className="underline"></span>
        </button>
        <form className="form form-signup" onSubmit={onSubmit}>
          <fieldset>
            <legend>
              Please, enter your email, password and password confirmation for
              sign up.
            </legend>
            <div className="input-block">
              <label htmlFor="signup-name">Name</label>
              <input
                id="signup-name"
                type="text"
                name="Name"
                onChange={updateInput}
                value={formData.Name || ""}
                required
              />
            </div>
            <div className="input-block">
              <label htmlFor="signup-uname">Username</label>
              <input
                id="signup-uname"
                type="text"
                name="Username"
                onChange={updateInput}
                value={formData.Username || ""}
                required
              />
            </div>
            <div className="input-block">
              <label htmlFor="signup-email">E-mail</label>
              <input
                id="signup-email"
                type="email"
                name="Email"
                onChange={updateInput}
                value={formData.Email || ""}
                required
              />
            </div>
            <div className="input-block">
              <label htmlFor="signup-password">Password</label>
              <input
                id="signup-password"
                type="password"
                name="Password"
                onChange={updateInput}
                value={formData.Password || ""}
                required
              />
            </div>
            <div className="input-block">
              <label htmlFor="signup-password-confirm">Confirm password</label>
              <input id="signup-password-confirm" type="password" required />
            </div>
          </fieldset>
          <button type="submit" className="btn-signup">
            Sign-Up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
