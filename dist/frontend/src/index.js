"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
require("bootstrap/dist/css/bootstrap.min.css");
require("./styling/index.css");
var App_1 = __importDefault(require("./App"));
var UserContextProvider_1 = __importDefault(require("./contexts/UserContextProvider"));
react_dom_1.default.render(<react_1.default.StrictMode>
    <UserContextProvider_1.default>
      <App_1.default />
    </UserContextProvider_1.default>
  </react_1.default.StrictMode>, document.getElementById("root"));
//# sourceMappingURL=index.js.map