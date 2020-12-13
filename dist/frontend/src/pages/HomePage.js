"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Container_1 = __importDefault(require("react-bootstrap/Container"));
var react_icons_1 = require("react-icons");
var fa_1 = require("react-icons/fa");
var loginHandler_1 = __importDefault(require("../customFunc/loginHandler"));
var HomePage = function () {
    document.title = "Pepper Music";
    return (<Container_1.default fluid className="outer-container">
      <Container_1.default className="center-container">
        <div id="loginPrompt" onClick={loginHandler_1.default}>
          <h3>
            <span>
              Login with{" "}
              <react_icons_1.IconContext.Provider value={{ color: "#00ff00", size: "2.5rem" }}>
                <fa_1.FaSpotify />
              </react_icons_1.IconContext.Provider>{" "}
              Spotify
            </span>
          </h3>
        </div>
      </Container_1.default>
    </Container_1.default>);
};
exports.default = HomePage;
//# sourceMappingURL=HomePage.js.map