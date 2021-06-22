import React, { useContext } from "react";
import { ContextProvider } from "../../context";
import "./loader.css";
const Loader = () => {
  const { loading } = useContext(ContextProvider);
  return (
    <div className={loading ? "loading" : "loading hide"}>
      <div className="loader three"></div>
    </div>
  );
};

export default Loader;
