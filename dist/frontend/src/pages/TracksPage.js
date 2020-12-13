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
var react_bootstrap_1 = require("react-bootstrap");
var react_router_dom_1 = require("react-router-dom");
var LoadingPepper_1 = __importDefault(require("../components/LoadingPepper"));
var PlayerContextProvider_1 = require("../contexts/PlayerContextProvider");
var TracksPage = function (_a) {
    var type = _a.type;
    document.title = type + " tracks | Pepper Music";
    var id = react_router_dom_1.useParams().id;
    var setCurrentTrack = react_1.useContext(PlayerContextProvider_1.PlayerContext).setCurrentTrack;
    var _b = react_1.useState(true), loading = _b[0], setLoading = _b[1];
    react_1.useEffect(function () {
        setCurrentTrack(null);
    }, [setCurrentTrack]);
    return (<react_bootstrap_1.Container fluid className="outer-container">
      <react_bootstrap_1.Container className="center-container py-5">
        {loading && (<div className="my-3">
            <LoadingPepper_1.default />
          </div>)}
        <iframe src={"https://open.spotify.com/embed/" + type + "/" + id} width="100%" height="600px" frameBorder="0" allowTransparency={true} allow="encrypted-media" onLoad={function () {
        setLoading(false);
    }}></iframe>
      </react_bootstrap_1.Container>
    </react_bootstrap_1.Container>);
};
exports.default = TracksPage;
//# sourceMappingURL=TracksPage.js.map