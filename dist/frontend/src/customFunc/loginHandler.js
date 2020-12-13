"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
var loginHandler = function () {
    fetch("/api/checkValidSession", {
        method: "GET",
    })
        .then(function (res) {
        // refresh the page to login user
        if (res.status === 200) {
            window.location.href = "/";
        }
        else {
            throw new Error();
        }
        return res.json();
    })
        .catch(function (err) {
        console.error(err);
        window.location.href = REACT_APP_BACKEND_URL + "/api/login";
    });
};
exports.default = loginHandler;
//# sourceMappingURL=loginHandler.js.map