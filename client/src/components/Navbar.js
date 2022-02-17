import React, { useContext } from "react";
import Context from "../context/Context";
import Avatar from "react-nice-avatar";
import { Link } from "react-router-dom";
import { RiLoginBoxLine, RiSearchEyeLine } from "react-icons/ri";

import "../styles/navbar.sass";
function Navbar() {
  const { toggleAuth, isAuth, avatar } = useContext(Context);

  return (
    <header className="navbar">
      <div className="navbarLeft">
        <div className="navbarTitle">
          <Link to="/">
            Watch<span className="bold">Qwest</span>
          </Link>
        </div>
      </div>
      <div className="navbarMiddle">
        <Link to="/list">My List</Link>
        <Link to="/addanime">Add Anime</Link>
      </div>
      <div className="navbarRight">
        {isAuth ? (
          <Link to="/dashboard">
            <Avatar
              style={{
                width: "35px",
                height: "35px",
              }}
              {...avatar}
            />{" "}
          </Link>
        ) : (
          <Link to="/">
            <div className="btnPrimary">
              <RiLoginBoxLine size="22px" />
              Login
            </div>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
