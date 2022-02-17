import React, { useContext, useState, useEffect } from "react";
import Context from "../context/Context";

import { RiCodeView } from "react-icons/ri";
import { login, register } from "../api/index";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { genConfig } from "react-nice-avatar";

import "react-toastify/dist/ReactToastify.css";
import "../styles/buttons.sass";
import "../styles/auth.sass";
import { createCookie } from "../utils/cookie";

function Auth() {
  const { toggleAuth, isAuth, setAvatar, setWatchlistId, setUsername } =
    useContext(Context);

  const [authMode, setAuthMode] = useState(true); //? si true: login, si false: register

  const [user, setUser] = useState({
    username: "",
    password: "",
    avatar: {},
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit", authMode);

    authMode ? handleLogin(user) : handleRegister(user);
  };
  const handleLogin = async (newuser) => {
    const res = await login(newuser);
    if (res !== "Error") {
      //initialiser data
      setAvatar(res.avatar);
      setUsername(res.username);
      setWatchlistId(res.watchlistId);
      //? 🍪
      createCookie("avatar", JSON.stringify(res.avatar));

      toggleAuth();
    }
  };
  const handleRegister = async (newuser) => {
    newuser.avatar = genConfig();
    const res = await register(newuser);
    if (res !== "Error") {
      setAuthMode(true);
      toast.success("New account creation !", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const handleInputChange = ({ target }) => {
    setUser({ ...user, [target.name]: target.value });
  };

  useEffect(() => {
    if (isAuth === true) {
      navigate("/dashboard");
    }
  }, [isAuth]);
  return (
    <form onSubmit={(event) => handleSubmit(event)} className="authForm">
      <label htmlFor="username" className="authLabel">
        Username
      </label>
      <br />
      <input
        type="text"
        value={user.username}
        name="username"
        onChange={(event) => {
          handleInputChange(event);
        }}
      />
      <br />
      <label htmlFor="password" className="authLabel">
        Password
      </label>
      <br />
      <input
        type="password"
        value={user.password}
        name="password"
        onChange={(event) => {
          handleInputChange(event);
        }}
      />
      <br />
      {authMode ? (
        <div className="authFlexRow">
          <button name="login" className="btnPrimary ">
            Login
          </button>
          <RiCodeView size={20} color="white" />
          <div
            onClick={() => setAuthMode(false)}
            className="btnPrimaryDisabled "
          >
            Sign Up
          </div>
        </div>
      ) : (
        <div className="authFlexRow">
          <div onClick={() => setAuthMode(true)} className="btnPrimaryDisabled">
            login
          </div>
          <RiCodeView size={20} color="white" />
          <button name="SignUp" className="btnPrimary authChild">
            Sign Up
          </button>
        </div>
      )}
      <ToastContainer />
    </form>
  );
}

export default Auth;
