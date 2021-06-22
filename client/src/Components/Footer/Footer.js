import React from "react";
import "./Footer.css";
import Img from "./me.png";
const Footer = () => {
  return (
    <footer className="footer">
      <a href="https://parthlaw.tech" target="_blank" rel="noopener noreferrer">
        Made By
      </a>
      <a href="https://parthlaw.tech" target="_blank" rel="noopener noreferrer">
        <img src={Img} alt="Me" className="logo" />
      </a>
      <a href="./privacy.pdf" target="_blank">
        Privacy Policy
      </a>
    </footer>
  );
};

export default Footer;
