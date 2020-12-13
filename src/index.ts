import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import generateRandomString from "./generateRandomString";
import session from "express-session";
import connectRedis from "connect-redis";
import cookieParser from "cookie-parser";
import querystring from "querystring";
import { redisClient } from "./redisOperation";
import { authenticateUser } from "./middleware";
import path from "path";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const nodeEnv = process.env.NODE_ENV;
const clientId = process.env.clientId;
const clientSecret = process.env.clientSecret;
const redirectUri = process.env.redirectUri;
const frontendRedirectUri = process.env.frontendRedirectUri;
const sessionSecret = process.env.sessionSecret;

const scopes = [
  "user-read-private",
  "user-read-email",
  "playlist-read-private",
];
const sessionKey = "spotifySession";

app.set('trust proxy', 1) // trust first proxy
app.use(cookieParser());
const RedisStore = connectRedis(session);
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: sessionSecret as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: app.get("env") === "development" ? false : true,
      sameSite: "lax",
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000,
    },
    rolling: true,
  })
);

app.get("/api/login", (req, res) => {
  const session = generateRandomString(16);
  res.cookie(sessionKey, session);
  const authorizeURL =
    "https://accounts.spotify.com/authorize?" +
    querystring.stringify({
      response_type: "code",
      client_id: clientId,
      scope: scopes.join(" "),
      redirect_uri: redirectUri,
      state: session,
      show_dialog: true,
    });

  res.redirect(authorizeURL);
});

app.get("/api/callback", (req, res) => {
  const code = req.query.code as string | undefined;
  const session = req.query.state as string | undefined;
  const storedSession: string | undefined = req.cookies
    ? req.cookies[sessionKey]
    : undefined;

  res.clearCookie(sessionKey);

  if (
    typeof session !== "string" ||
    typeof storedSession !== "string" ||
    session !== storedSession
  ) {
    return res.status(403).send("unauthorized");
  }
  if (typeof code !== "string") {
    return res.status(400).send("unexpected error");
  }

  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    }),
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("unable to get access from spotify");
      }
      return response.json();
    })
    .then((data) => {
      req.session.accessToken = data.access_token;
      req.session.refreshToken = data.refresh_token;
      req.session.expiry = new Date(
        new Date().getTime() + data.expires_in * 1000
      ).toString();

      res.redirect(`${frontendRedirectUri}`);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json("internal server error");
    });
});

app.get("/api/logout", authenticateUser, (req, res) => {
  req.session.destroy(function (err) {
    if (!err) {
      res.cookie("connect.sid", null, {
        expires: new Date("Thu, 01 Jan 1970 00:00:00 UTC"),
      });
      res.json("ok");
    } else {
      console.error(err);
      res.status(500).json("internal server error");
    }
  });
});

app.get("/api/checkValidSession", authenticateUser, (req, res) => {
  res.json("ok");
});

app.get("/api/getMe", authenticateUser, async (req, res) => {
  const accessToken = req.session.accessToken;

  fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("access denied from spotify");
      }
      return response.json();
    })
    .then((data) => res.json(data))
    .catch((error) => {
      console.error(error);
      res.status(500).json("internal server error");
    });
});

app.get(
  [
    "/api/search",
    "/api/artists/info/:id",
    "/api/artists/albums/:id",
    "/api/artists/top_tracks/:id",
    "/api/myPlaylist/:id",
  ],
  authenticateUser,
  async (req, res) => {
    const accessToken = req.session.accessToken;

    let url: string | null = null;
    if (req.path === "/api/search") {
      const query = querystring.stringify(req.query as any);
      url = `https://api.spotify.com/v1/search?${query}`;
    } else if (/^\/api\/artists\/info\/[\S]+$/.test(req.path)) {
      const id = req.params.id;
      if (id !== undefined) {
        url = `https://api.spotify.com/v1/artists/${id}`;
      }
    } else if (/^\/api\/artists\/albums\/[\S]+$/.test(req.path)) {
      const id = req.params.id;
      if (id !== undefined) {
        url = `https://api.spotify.com/v1/artists/${id}/albums`;
      }
    } else if (/^\/api\/artists\/top_tracks\/[\S]+$/.test(req.path)) {
      const id = req.params.id;
      if (id !== undefined) {
        url = `https://api.spotify.com/v1/artists/${id}/top-tracks`;
      }
    } else if (/^\/api\/myPlaylist\/[\S]+$/.test(req.path)) {
      const id = req.params.id;
      if (id !== undefined) {
        url = `https://api.spotify.com/v1/users/${id}/playlists`;
      }
    }

    if (url === null) {
      res.status(400).json("invalid request url");
      return;
    }

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("unable to get resources");
        }
        return response.json();
      })
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json("internal server error");
      });
  }
);

if (app.get("env") !== "development") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "..", "frontend/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "frontend/build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
