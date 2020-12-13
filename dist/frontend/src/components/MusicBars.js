"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
var react_1 = __importDefault(require("react"));
var styled_components_1 = __importStar(require("styled-components"));
var movingBar = function (props) {
    return styled_components_1.keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  0% {\n    height: ", "px;\n    opacity: 0.5;\n  }\n  100% {\n    height: ", "px;\n    opacity: 1;\n  }\n"], ["\n  0% {\n    height: ", "px;\n    opacity: 0.5;\n  }\n  100% {\n    height: ", "px;\n    opacity: 1;\n  }\n"])), props.start, props.end);
};
var Bar = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  flex: 1 1 5px;\n  background-color: red;\n  animation: ", ";\n"], ["\n  flex: 1 1 5px;\n  background-color: red;\n  animation: ",
    ";\n"])), function (props) {
    return styled_components_1.css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      ", " ", "ms linear ", "ms infinite alternate both, changing-bg-color 10000ms linear 0ms infinite alternate both;\n    "], ["\n      ",
        " ", "ms linear ", "ms infinite alternate both, changing-bg-color 10000ms linear 0ms infinite alternate both;\n    "])), movingBar(props), props.duration, props.delay);
});
var SingleBar = function () {
    var maxHeight = 50;
    var baseDuration = 800;
    var start = Math.floor((Math.random() * maxHeight) / 2);
    var end = Math.floor((Math.random() * maxHeight) / 2) + maxHeight / 2;
    var duration = baseDuration + (Math.random() * baseDuration) / 2;
    var delay = (Math.random() * duration) / 2;
    return <Bar {...{ start: start, end: end, duration: duration, delay: delay }}/>;
};
var MusicBars = function () {
    var barNo = 150;
    var barCollection = [];
    for (var i = 0; i < barNo; i++) {
        barCollection.push(<SingleBar key={i}/>);
    }
    return <div id="music-bars-container">{barCollection}</div>;
};
exports.default = MusicBars;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=MusicBars.js.map