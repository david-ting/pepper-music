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
var react_router_dom_1 = require("react-router-dom");
var Navigation_1 = __importDefault(require("./components/Navigation"));
var PlayerContextProvider_1 = __importDefault(require("./contexts/PlayerContextProvider"));
var UserContextProvider_1 = require("./contexts/UserContextProvider");
var ArtistPage_1 = __importDefault(require("./pages/ArtistPage"));
var HomePage_1 = __importDefault(require("./pages/HomePage"));
var MyPlaylistPage_1 = __importDefault(require("./pages/MyPlaylistPage"));
var SearchPage_1 = __importDefault(require("./pages/SearchPage"));
var SearchResultPage_1 = __importDefault(require("./pages/SearchResultPage"));
var TracksPage_1 = __importDefault(require("./pages/TracksPage"));
var RedirectUnauthenticatedUser = function (_a) {
    var children = _a.children;
    var user = react_1.useContext(UserContextProvider_1.UserContext).user;
    return <>{user.loggedIn ? children : <react_router_dom_1.Redirect to="/"/>}</>;
};
var App = function () {
    var user = react_1.useContext(UserContextProvider_1.UserContext).user;
    return (<react_router_dom_1.BrowserRouter>
      <PlayerContextProvider_1.default>
        <Navigation_1.default />
        <react_router_dom_1.Switch>
          <react_router_dom_1.Route exact path="/">
            {user.loggedIn ? <react_router_dom_1.Redirect to="/search"/> : <HomePage_1.default />}
          </react_router_dom_1.Route>
          <react_router_dom_1.Route exact path="/search">
            <RedirectUnauthenticatedUser>
              <SearchPage_1.default />
            </RedirectUnauthenticatedUser>
          </react_router_dom_1.Route>
          <react_router_dom_1.Route exact path="/search/album">
            <RedirectUnauthenticatedUser>
              <SearchResultPage_1.default searchType="album"/>
            </RedirectUnauthenticatedUser>
          </react_router_dom_1.Route>
          <react_router_dom_1.Route exact path="/search/artist">
            <RedirectUnauthenticatedUser>
              <SearchResultPage_1.default searchType="artist"/>
            </RedirectUnauthenticatedUser>
          </react_router_dom_1.Route>
          <react_router_dom_1.Route exact path="/search/playlist">
            <RedirectUnauthenticatedUser>
              <SearchResultPage_1.default searchType="playlist"/>
            </RedirectUnauthenticatedUser>
          </react_router_dom_1.Route>
          <react_router_dom_1.Route exact path="/search/track">
            <RedirectUnauthenticatedUser>
              <SearchResultPage_1.default searchType="track"/>
            </RedirectUnauthenticatedUser>
          </react_router_dom_1.Route>
          <react_router_dom_1.Route exact path="/search/album/tracks/:id">
            <RedirectUnauthenticatedUser>
              <TracksPage_1.default type="album"/>
            </RedirectUnauthenticatedUser>
          </react_router_dom_1.Route>
          <react_router_dom_1.Route exact path="/search/playlist/tracks/:id">
            <RedirectUnauthenticatedUser>
              <TracksPage_1.default type="playlist"/>
            </RedirectUnauthenticatedUser>
          </react_router_dom_1.Route>
          <react_router_dom_1.Route exact path="/search/artist/:id">
            <RedirectUnauthenticatedUser>
              <ArtistPage_1.default />
            </RedirectUnauthenticatedUser>
          </react_router_dom_1.Route>
          <react_router_dom_1.Route exact path="/myPlaylist">
            <RedirectUnauthenticatedUser>
              <MyPlaylistPage_1.default />
            </RedirectUnauthenticatedUser>
          </react_router_dom_1.Route>
          <react_router_dom_1.Route exact path="/myPlaylist/:id">
            <RedirectUnauthenticatedUser>
              <TracksPage_1.default type="playlist"/>
            </RedirectUnauthenticatedUser>
          </react_router_dom_1.Route>
        </react_router_dom_1.Switch>
      </PlayerContextProvider_1.default>
    </react_router_dom_1.BrowserRouter>);
};
exports.default = App;
//# sourceMappingURL=App.js.map