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
exports.PlayerContext = void 0;
var react_1 = __importStar(require("react"));
var react_toastify_1 = require("react-toastify");
exports.PlayerContext = react_1.createContext({
    currentTrack: null,
    setCurrentTrack: function () {
        return;
    },
});
var PlayerContextProvider = function (_a) {
    var children = _a.children;
    var iframeRef = react_1.useRef(null);
    var _b = react_1.useState(null), currentTrack = _b[0], setCurrentTrack = _b[1];
    var match = currentTrack === null || currentTrack === void 0 ? void 0 : currentTrack.match(/spotify:track:([\S]+)/);
    var trackId = null;
    if (match !== null && match !== undefined) {
        trackId = match[1];
    }
    return (<exports.PlayerContext.Provider value={{ currentTrack: currentTrack, setCurrentTrack: setCurrentTrack }}>
      {children}
      {trackId !== null && (<react_toastify_1.ToastContainer position="top-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false}/>)}
      {trackId !== null && (<iframe id="player" ref={iframeRef} src={"https://open.spotify.com/embed/track/" + trackId} width="100%" height="80" frameBorder="0" allowTransparency={true} allow="encrypted-media"></iframe>)}
    </exports.PlayerContext.Provider>);
};
exports.default = PlayerContextProvider;
//# sourceMappingURL=PlayerContextProvider.js.map