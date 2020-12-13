import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import PlayerContextProvider from "./contexts/PlayerContextProvider";
import { UserContext } from "./contexts/UserContextProvider";
import ArtistPage from "./pages/ArtistPage";
import HomePage from "./pages/HomePage";
import MyPlaylistPage from "./pages/MyPlaylistPage";
import SearchPage from "./pages/SearchPage";
import SearchResultPage from "./pages/SearchResultPage";
import TracksPage from "./pages/TracksPage";

const RedirectUnauthenticatedUser: React.FC = ({ children }) => {
  const { user } = useContext(UserContext);
  return <>{user.loggedIn ? children : <Redirect to="/" />}</>;
};

const App: React.FC = () => {
  const { user } = useContext(UserContext);

  return (
    <Router>
      <PlayerContextProvider>
        <Navigation />
        <Switch>
          <Route exact path="/">
            {user.loggedIn ? <Redirect to="/search" /> : <HomePage />}
          </Route>
          <Route exact path="/search">
            <RedirectUnauthenticatedUser>
              <SearchPage />
            </RedirectUnauthenticatedUser>
          </Route>
          <Route exact path="/search/album">
            <RedirectUnauthenticatedUser>
              <SearchResultPage searchType="album" />
            </RedirectUnauthenticatedUser>
          </Route>
          <Route exact path="/search/artist">
            <RedirectUnauthenticatedUser>
              <SearchResultPage searchType="artist" />
            </RedirectUnauthenticatedUser>
          </Route>
          <Route exact path="/search/playlist">
            <RedirectUnauthenticatedUser>
              <SearchResultPage searchType="playlist" />
            </RedirectUnauthenticatedUser>
          </Route>
          <Route exact path="/search/track">
            <RedirectUnauthenticatedUser>
              <SearchResultPage searchType="track" />
            </RedirectUnauthenticatedUser>
          </Route>
          <Route exact path="/search/album/tracks/:id">
            <RedirectUnauthenticatedUser>
              <TracksPage type="album" />
            </RedirectUnauthenticatedUser>
          </Route>
          <Route exact path="/search/playlist/tracks/:id">
            <RedirectUnauthenticatedUser>
              <TracksPage type="playlist" />
            </RedirectUnauthenticatedUser>
          </Route>
          <Route exact path="/search/artist/:id">
            <RedirectUnauthenticatedUser>
              <ArtistPage />
            </RedirectUnauthenticatedUser>
          </Route>
          <Route exact path="/myPlaylist">
            <RedirectUnauthenticatedUser>
              <MyPlaylistPage />
            </RedirectUnauthenticatedUser>
          </Route>
          <Route exact path="/myPlaylist/:id">
            <RedirectUnauthenticatedUser>
              <TracksPage type="playlist" />
            </RedirectUnauthenticatedUser>
          </Route>
        </Switch>
      </PlayerContextProvider>
    </Router>
  );
};

export default App;
