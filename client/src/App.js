import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Auth from "./Components/Auth/Auth";
import Chat from "./Components/Chat/Chat";
import PrivateRoute from "./utils/PrivateRoute";
import Loader from "./utils/Loader/Loader";
import Welcome from "./Components/Chat/Welcome";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Particles from "react-particles-js";
function App() {
  return (
    <>
      <Loader />
      <Particles
        className="particle"
        params={{
          particles: {
            number: {
              value: 200,
              density: {
                enable: true,
                value_area: 2000,
              },
            },
            color: {
              value: "#7f5af0",
            },
            opacity: {
              value: 1,
              anim: {
                enable: true,
              },
            },
            size: {
              value: 6,
              random: true,
              anim: {
                enable: true,
                speed: 3,
              },
            },
            line_linked: {
              enable: false,
            },
            move: {
              speed: 1,
            },
          },
        }}
      />
      <BrowserRouter>
        <div className="App">
          <Route exact path="/">
            <Auth />
          </Route>
          <PrivateRoute component={Welcome} exact path="/chat" />
          <PrivateRoute component={Chat} exact path="/chat/:id" />
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
