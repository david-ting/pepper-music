"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.UserContext = void 0;
var react_1 = __importStar(require("react"));
var react_bootstrap_1 = require("react-bootstrap");
var LoadingPepper_1 = __importDefault(require("../components/LoadingPepper"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var initialUser = {
    loggedIn: false,
    name: "",
    userID: "",
};
var reducers = function (state, action) {
    switch (action.type) {
        case "login":
            return __assign({ loggedIn: true }, action.payload);
        case "logout":
            return { loggedIn: false, name: "", userID: "" };
        default:
            return state;
    }
};
exports.UserContext = react_1.createContext({
    user: initialUser,
    logoutHandler: function () {
        return;
    },
});
var UserContextProvider = function (_a) {
    var children = _a.children;
    var _b = react_1.useReducer(reducers, initialUser), user = _b[0], dispatch = _b[1];
    var _c = react_1.useState(true), loading = _c[0], setLoading = _c[1];
    var logoutHandler = function () {
        fetch("/api/logout", {
            method: "GET",
        })
            .then(function (res) {
            if (res.ok) {
                dispatch({ type: "logout" });
            }
            else {
                throw new Error("unable to logout");
            }
        })
            .catch(function (err) {
            console.error(err);
        });
    };
    react_1.useEffect(function () {
        setLoading(true);
        fetch("/api/getMe", {
            method: "GET",
        })
            .then(function (res) {
            if (res.ok) {
                return res.json();
            }
            else {
                throw new Error("not yet logged in");
            }
        })
            .then(function (data) {
            dispatch({
                type: "login",
                payload: {
                    name: data.display_name,
                    userID: data.id,
                },
            });
            setLoading(false);
        })
            .catch(function (err) {
            console.error(err);
            setLoading(false);
        });
    }, []);
    return (<>
      {loading ? (<react_bootstrap_1.Container fluid className="outer-container" style={{ minHeight: "100vh" }}>
          <react_bootstrap_1.Container className="center-container">
            <LoadingPepper_1.default />
          </react_bootstrap_1.Container>
        </react_bootstrap_1.Container>) : (<exports.UserContext.Provider value={{ user: user, logoutHandler: logoutHandler }}>
          {children}
        </exports.UserContext.Provider>)}
    </>);
};
exports.default = UserContextProvider;
//# sourceMappingURL=UserContextProvider.js.map