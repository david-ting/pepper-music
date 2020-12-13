import React from "react";
import Container from "react-bootstrap/Container";
import { IconContext } from "react-icons";
import { FaSpotify } from "react-icons/fa";
import loginHandler from "../customFunc/loginHandler";

const HomePage: React.FC = () => {
  document.title = "Pepper Music";

  return (
    <Container fluid className="outer-container">
      <Container className="center-container">
        <div id="loginPrompt" onClick={loginHandler}>
          <h3>
            <span>
              Login with{" "}
              <IconContext.Provider
                value={{ color: "#00ff00", size: "2.5rem" }}
              >
                <FaSpotify />
              </IconContext.Provider>{" "}
              Spotify
            </span>
          </h3>
        </div>
      </Container>
    </Container>
  );
};

export default HomePage;
