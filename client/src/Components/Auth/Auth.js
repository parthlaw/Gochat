import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { checkAuth } from "../../api";
import { ContextProvider } from "../../context";
import "./Auth.css";
import Login from "./Login";
import SignUp from "./SignUp";
const Auth = () => {
  const [login, setLogin] = useState(true);
  const { user, setUser, setAuth, setLoading } = useContext(ContextProvider);
  const history = useHistory();
  const handleChange = () => {
    setLogin(!login);
  };
  useEffect(() => {
    const Auth = async () => {
      setLoading(true);
      const data = await checkAuth();
      if (data && data.Success) {
        setUser(data.Data);
        setAuth(true);
        setLoading(false);
        history.push("/chat");
        return;
      }
      setLoading(false);
      return;
    };
    if (!user || !user.Rooms || !user.User) {
      Auth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="forms-section">
      <h1 className="section-title">GOCHAT</h1>
      <div className="forms">
        <Login login={login} handleChange={handleChange} />
        <SignUp login={login} handleChange={handleChange} />
      </div>
    </section>
  );
};

export default Auth;
