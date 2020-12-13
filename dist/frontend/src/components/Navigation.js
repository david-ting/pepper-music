"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var Navbar_1 = __importDefault(require("react-bootstrap/Navbar"));
var Nav_1 = __importDefault(require("react-bootstrap/Nav"));
var react_router_dom_1 = require("react-router-dom");
var fa_1 = require("react-icons/fa");
var fa_2 = require("react-icons/fa");
var react_icons_1 = require("react-icons");
var loginHandler_1 = __importDefault(require("../customFunc/loginHandler"));
var UserContextProvider_1 = require("../contexts/UserContextProvider");
var useModal_1 = __importDefault(require("../customHook/useModal"));
var Navigation = function () {
    var _a = useModal_1.default(), setShow = _a.setShow, modalJSX = _a.modalJSX;
    var _b = react_1.useContext(UserContextProvider_1.UserContext), user = _b.user, logoutHandler = _b.logoutHandler;
    var path = react_router_dom_1.useLocation().pathname;
    var navHandler = function () {
        if (!user.loggedIn) {
            setShow(true);
        }
    };
    var log = (<>
      {user.loggedIn ? (<span className="text-white p-2">
          {user.name}
          <react_router_dom_1.Link to="/" onClick={logoutHandler} className="gray-link ml-2">
            Log out
          </react_router_dom_1.Link>
        </span>) : (<span className="text-white p-2" style={{ cursor: "pointer" }} onClick={loginHandler_1.default}>
          Login with <fa_1.FaSpotify /> Spotify
        </span>)}
    </>);
    return (<>
      <Navbar_1.default collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar_1.default.Brand>
          <react_router_dom_1.Link to="/" className="white-link">
            <react_icons_1.IconContext.Provider value={{ color: "red" }}>
              <fa_2.FaPepperHot />
            </react_icons_1.IconContext.Provider>
            <span className="ml-2">Pepper Music</span>
          </react_router_dom_1.Link>
        </Navbar_1.default.Brand>
        <Navbar_1.default.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar_1.default.Collapse id="responsive-navbar-nav">
          <Nav_1.default className="order-2">{log}</Nav_1.default>
          <Nav_1.default className="mr-auto order-1">
            <react_router_dom_1.Link to={user.loggedIn ? "/search" : "#"} className={"p-2 " + (/^\/search/.test(path)
        ? "disabled-link white-link"
        : "gray-link")} onClick={navHandler}>
              Search
            </react_router_dom_1.Link>
            <react_router_dom_1.Link to={user.loggedIn ? "/myPlaylist/" : "#"} className={"p-2 " + (/^\/myPlaylist/.test(path)
        ? "disabled-link white-link"
        : "gray-link")} onClick={navHandler}>
              My Playlist
            </react_router_dom_1.Link>
          </Nav_1.default>
        </Navbar_1.default.Collapse>
      </Navbar_1.default>
      {modalJSX}
    </>);
};
exports.default = Navigation;
//# sourceMappingURL=Navigation.js.map