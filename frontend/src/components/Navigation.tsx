import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, useLocation } from "react-router-dom";
import { FaSpotify } from "react-icons/fa";
import { FaPepperHot } from "react-icons/fa";
import { IconContext } from "react-icons";
import loginHandler from "../customFunc/loginHandler";
import { UserContext } from "../contexts/UserContextProvider";
import useModal from "../customHook/useModal";

const Navigation: React.FC = () => {
  const { setShow, modalJSX } = useModal();
  const { user, logoutHandler } = useContext(UserContext);
  const path = useLocation().pathname;

  const navHandler = () => {
    if (!user.loggedIn) {
      setShow(true);
    }
  };

  const log = (
    <>
      {user.loggedIn ? (
        <span className="text-white p-2">
          {user.name}
          <Link to="/" onClick={logoutHandler} className="gray-link ml-2">
            Log out
          </Link>
        </span>
      ) : (
        <span
          className="text-white p-2"
          style={{ cursor: "pointer" }}
          onClick={loginHandler}
        >
          Login with <FaSpotify /> Spotify
        </span>
      )}
    </>
  );

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>
          <Link to="/" className="white-link">
            <IconContext.Provider value={{ color: "red" }}>
              <FaPepperHot />
            </IconContext.Provider>
            <span className="ml-2">Pepper Music</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="order-2">{log}</Nav>
          <Nav className="mr-auto order-1">
            <Link
              to={user.loggedIn ? "/search" : "#"}
              className={`p-2 ${
                /^\/search/.test(path)
                  ? "disabled-link white-link"
                  : "gray-link"
              }`}
              onClick={navHandler}
            >
              Search
            </Link>
            <Link
              to={user.loggedIn ? "/myPlaylist/" : "#"}
              className={`p-2 ${
                /^\/myPlaylist/.test(path)
                  ? "disabled-link white-link"
                  : "gray-link"
              }`}
              onClick={navHandler}
            >
              My Playlist
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {modalJSX}
    </>
  );
};

export default Navigation;
