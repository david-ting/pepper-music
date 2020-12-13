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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_icons_1 = require("react-icons");
var HoverIcon = function (_a) {
    var color = _a.color, hoverColor = _a.hoverColor, size = _a.size, hoverSize = _a.hoverSize, children = _a.children;
    var _b = react_1.useState(color), colorState = _b[0], setColorState = _b[1];
    var _c = react_1.useState(size), sizeState = _c[0], setSizeState = _c[1];
    return (<react_icons_1.IconContext.Provider value={{ color: colorState, size: sizeState }}>
      <span onMouseOver={function () {
        setColorState(hoverColor);
        setSizeState(hoverSize);
    }} onMouseOut={function () {
        setColorState(color);
        setSizeState(size);
    }}>
        {children}
      </span>{" "}
    </react_icons_1.IconContext.Provider>);
};
exports.default = HoverIcon;
//# sourceMappingURL=HoverIcon.js.map