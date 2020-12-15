"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var dotenv_1 = __importDefault(require("dotenv"));
var generateRandomString_1 = __importDefault(require("./generateRandomString"));
var express_session_1 = __importDefault(require("express-session"));
var connect_redis_1 = __importDefault(require("connect-redis"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var querystring_1 = __importDefault(require("querystring"));
var redisOperation_1 = require("./redisOperation");
var middleware_1 = require("./middleware");
var path_1 = __importDefault(require("path"));
dotenv_1.default.config();
var app = express_1.default();
var port = process.env.PORT || 8000;
var CLIENT_ID = process.env.CLIENT_ID;
var CLIENT_SECRET = process.env.CLIENT_SECRET;
var REDIRECT_URI = process.env.REDIRECT_URI;
var FRONTEND_REDIRECT_URI = process.env.FRONTEND_REDIRECT_URI;
var SESSION_SECRET = process.env.SESSION_SECRET;
var scopes = [
    "user-read-private",
    "user-read-email",
    "playlist-read-private",
];
var sessionKey = "spotifySession";
app.set('trust proxy', 1); // trust first proxy
app.use(cookie_parser_1.default());
var RedisStore = connect_redis_1.default(express_session_1.default);
app.use(express_session_1.default({
    store: new RedisStore({ client: redisOperation_1.redisClient }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: app.get("env") === "development" ? false : true,
        sameSite: "lax",
        httpOnly: true,
        maxAge: 2 * 60 * 60 * 1000,
    },
    rolling: true,
}));
app.get("/api/login", function (req, res) {
    var session = generateRandomString_1.default(16);
    res.cookie(sessionKey, session);
    var authorizeURL = "https://accounts.spotify.com/authorize?" +
        querystring_1.default.stringify({
            response_type: "code",
            client_id: CLIENT_ID,
            scope: scopes.join(" "),
            redirect_uri: REDIRECT_URI,
            state: session,
            show_dialog: true,
        });
    res.redirect(authorizeURL);
});
app.get("/api/callback", function (req, res) {
    var code = req.query.code;
    var session = req.query.state;
    var storedSession = req.cookies
        ? req.cookies[sessionKey]
        : undefined;
    res.clearCookie(sessionKey);
    if (typeof session !== "string" ||
        typeof storedSession !== "string" ||
        session !== storedSession) {
        return res.status(403).send("unauthorized");
    }
    if (typeof code !== "string") {
        return res.status(400).send("unexpected error");
    }
    node_fetch_1.default("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: querystring_1.default.stringify({
            grant_type: "authorization_code",
            code: code,
            redirect_uri: REDIRECT_URI,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        }),
    })
        .then(function (response) {
        if (response.status !== 200) {
            throw new Error("unable to get access from spotify");
        }
        return response.json();
    })
        .then(function (data) {
        req.session.accessToken = data.access_token;
        req.session.refreshToken = data.refresh_token;
        req.session.expiry = new Date(new Date().getTime() + data.expires_in * 1000).toString();
        res.redirect("" + FRONTEND_REDIRECT_URI);
    })
        .catch(function (error) {
        console.error(error);
        res.status(500).json("internal server error");
    });
});
app.get("/api/logout", middleware_1.authenticateUser, function (req, res) {
    req.session.destroy(function (err) {
        if (!err) {
            res.cookie("connect.sid", null, {
                expires: new Date("Thu, 01 Jan 1970 00:00:00 UTC"),
            });
            res.json("ok");
        }
        else {
            console.error(err);
            res.status(500).json("internal server error");
        }
    });
});
app.get("/api/checkValidSession", middleware_1.authenticateUser, function (req, res) {
    res.json("ok");
});
app.get("/api/getMe", middleware_1.authenticateUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var accessToken;
    return __generator(this, function (_a) {
        accessToken = req.session.accessToken;
        node_fetch_1.default("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        })
            .then(function (response) {
            if (response.status !== 200) {
                throw new Error("access denied from spotify");
            }
            return response.json();
        })
            .then(function (data) { return res.json(data); })
            .catch(function (error) {
            console.error(error);
            res.status(500).json("internal server error");
        });
        return [2 /*return*/];
    });
}); });
app.get([
    "/api/search",
    "/api/artists/info/:id",
    "/api/artists/albums/:id",
    "/api/artists/top_tracks/:id",
    "/api/myPlaylist/:id",
], middleware_1.authenticateUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var accessToken, url, query, id, id, id, id;
    return __generator(this, function (_a) {
        accessToken = req.session.accessToken;
        url = null;
        if (req.path === "/api/search") {
            query = querystring_1.default.stringify(req.query);
            url = "https://api.spotify.com/v1/search?" + query;
        }
        else if (/^\/api\/artists\/info\/[\S]+$/.test(req.path)) {
            id = req.params.id;
            if (id !== undefined) {
                url = "https://api.spotify.com/v1/artists/" + id;
            }
        }
        else if (/^\/api\/artists\/albums\/[\S]+$/.test(req.path)) {
            id = req.params.id;
            if (id !== undefined) {
                url = "https://api.spotify.com/v1/artists/" + id + "/albums";
            }
        }
        else if (/^\/api\/artists\/top_tracks\/[\S]+$/.test(req.path)) {
            id = req.params.id;
            if (id !== undefined) {
                url = "https://api.spotify.com/v1/artists/" + id + "/top-tracks";
            }
        }
        else if (/^\/api\/myPlaylist\/[\S]+$/.test(req.path)) {
            id = req.params.id;
            if (id !== undefined) {
                url = "https://api.spotify.com/v1/users/" + id + "/playlists";
            }
        }
        if (url === null) {
            res.status(400).json("invalid request url");
            return [2 /*return*/];
        }
        node_fetch_1.default(url, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        })
            .then(function (response) {
            if (response.status !== 200) {
                throw new Error("unable to get resources");
            }
            return response.json();
        })
            .then(function (data) {
            res.json(data);
        })
            .catch(function (error) {
            console.error(error);
            res.status(500).json("internal server error");
        });
        return [2 /*return*/];
    });
}); });
if (app.get("env") !== "development") {
    // Serve any static files
    app.use(express_1.default.static(path_1.default.join(__dirname, "..", "frontend/build")));
    // Handle React routing, return all requests to React app
    app.get("*", function (req, res) {
        res.sendFile(path_1.default.join(__dirname, "..", "frontend/build", "index.html"));
    });
}
app.listen(port, function () {
    console.log("listening on " + port);
});
//# sourceMappingURL=index.js.map