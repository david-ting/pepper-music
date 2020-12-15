# :musical_note: <b>Pepper Music</b> <br>
The project has been published to heroku. ⭐Live demo: https://pepper-music.herokuapp.com/ <br>
A website that you can log in with your spotify account and then enjoy the music by searching your favorite albums, artists, playlists and tracks.

### <b>Setup <br></b>
frontend: React <br>
backend: Node with Express framework <br>
API: Spotify Web API

Refer to the Authorization Code Flow 
<br>
(https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow),
the express server has been set up to get the access tokens and refresh tokens with the users' authorization. Redis has been used for the session management. The access tokens can be refreshed by the server as long as the users' sessions with the server are not expired. 
As for the frontend part, it has been built with ReactJS (create react app). The express server has been integrated with the React app by serving the static files (html, css and js files) built by the create-react-app and redirecting the requests to frontend routing for non-backend requests.

#### Environmental variables
* CLIENT_ID, CLIENT_SECRET, REDIRECT_URI by registering your app <br> (https://developer.spotify.com/documentation/general/guides/app-settings/)
* FRONTEND_REDIRECT_URI for redirecting the browser to frontend route after getting the tokens from spotify Api
* SESSION_SECRET for express-session to sign the session ID cookie
* REDIS_URL for accessing the redis database
* REACT_APP_BACKEND_URL for react app's routing
