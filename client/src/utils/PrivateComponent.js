import React, { useRef } from "react";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { checkAuth, logout } from "../api";
import { ContextProvider } from "../context";

const PrivateComponent = (props) => {
  const { user, setUser, setAuth, setLoading, loading } =
    useContext(ContextProvider);
  const history = useHistory();
  const ref = useRef();
  const Auth = async () => {
    setLoading(true);
    const data = await checkAuth();
    if (data && data.Success) {
      setUser(data.Data);
      setAuth(true);
      setLoading(false);
      return;
    }
    setAuth(false);
    setLoading(false);
  };
  useEffect(() => {
    //auth();
    async function Run() {
      await Auth();
    }
    console.log(user);
    if (!user || !user.Rooms || !user.User) {
      console.log("user");
      Run();
    }
    //console.log(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  const handleLogout = async (e) => {
    ref.current.classList.add("spinning");
    ref.current.innerHTML = "Logging Out";
    const data = await logout();
    if (data && data.Success) {
      history.push("/");
    }
  };
  return (
    <>
      {loading ? (
        <></>
      ) : (
        <>
          {" "}
          <button className="logout" onClick={handleLogout} ref={ref}>
            Logout
          </button>
          {props.children}
        </>
      )}
    </>
  );
};

export default PrivateComponent;
