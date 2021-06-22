import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { login as loginUser } from "../../api";
import { ContextProvider } from "../../context";
import { toast } from "react-toastify";
const Login = ({ login, handleChange }) => {
  const [formData, setFormData] = useState({});
  const { setAuth, setLoading } = useContext(ContextProvider);
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await loginUser(formData);
    if (data && data.Success) {
      setFormData({
        Email: "",
        Password: "",
      });
      console.log(data);
      setAuth(true);
      setLoading(false);
      history.push("/chat");
    } else {
      setAuth(false);
      console.log(data);
      setLoading(false);
      toast.error(data.Message);
    }
  };
  const updateInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div className={login ? "form-wrapper is-active" : "form-wrapper"}>
        <button
          type="button"
          className="switcher switcher-login"
          onClick={handleChange}
        >
          Login
          <span className="underline"></span>
        </button>
        <form className="form form-login" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Please, enter your email and password for login.</legend>
            <div className="input-block">
              <label htmlFor="login-email">E-mail</label>
              <input
                id="login-email"
                type="email"
                name="Email"
                onChange={updateInput}
                value={formData.Email || ""}
                required
              />
            </div>
            <div className="input-block">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                name="Password"
                onChange={updateInput}
                value={formData.Password || ""}
                required
              />
            </div>
          </fieldset>
          <button type="submit" className="btn-login">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
