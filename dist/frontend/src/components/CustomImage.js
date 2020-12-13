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
var CustomLoading_1 = __importDefault(require("./CustomLoading"));
var CustomImage = function (_a) {
    var src = _a.src, alt = _a.alt, clickHandler = _a.clickHandler;
    var _b = react_1.useState(true), loading = _b[0], setLoading = _b[1];
    return (<>
      {loading && <CustomLoading_1.default />}
      <div className="image-container">
        <img className="image-fit" style={loading ? { opacity: "0.1" } : { opacity: "1" }} {...{ src: src, alt: alt }} onLoad={function (event) {
        setLoading(false);
        if (clickHandler !== undefined)
            event.currentTarget.addEventListener("click", clickHandler);
    }}/>
      </div>
    </>);
};
exports.default = CustomImage;
//# sourceMappingURL=CustomImage.js.map