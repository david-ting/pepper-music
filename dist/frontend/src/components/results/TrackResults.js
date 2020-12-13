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
var fa_1 = require("react-icons/fa");
var lib_1 = require("react-icons/lib");
var md_1 = require("react-icons/md");
var PlayerContextProvider_1 = require("../../contexts/PlayerContextProvider");
var CustomImage_1 = __importDefault(require("../CustomImage"));
var HoverIcon_1 = __importDefault(require("../HoverIcon"));
var react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
var TrackResults = function (_a) {
    var results = _a.results;
    var setCurrentTrack = react_1.useContext(PlayerContextProvider_1.PlayerContext).setCurrentTrack;
    var playHandler = function (track) {
        setCurrentTrack(null);
        setCurrentTrack(track);
        react_toastify_1.toast.dark("click start button to play", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    };
    return (<>
      {results.items.length > 0 &&
        results.items.map(function (item) {
            return (<>
              <react_bootstrap_1.Col xs="6" md="4" lg="3" className="p-2" key={item.id}>
                <div className="col-result">
                  <div className="col-result-content">
                    <p className="text-white ellipsis m-0 py-2">{item.name}</p>
                    {<div className="image-wrapper">
                        {item.album &&
                item.album.images &&
                item.album.images.length > 0 ? (<CustomImage_1.default src={item.album.images[0].url} alt=""></CustomImage_1.default>) : (<lib_1.IconContext.Provider value={{ size: "100%" }}>
                            <md_1.MdAudiotrack />
                          </lib_1.IconContext.Provider>)}
                        <div className="image-description">
                          {item.artists && item.artists.length > 0 && (<p>{item.artists[0].name}</p>)}
                          <p>
                            <HoverIcon_1.default color="#00cc00" hoverColor="#00ff00" size="1.3rem" hoverSize="1.8rem">
                              <fa_1.FaPlay onClick={function () { return playHandler(item.uri); }}/>
                            </HoverIcon_1.default>
                          </p>
                        </div>
                      </div>}
                  </div>
                </div>
              </react_bootstrap_1.Col>
            </>);
        })}
    </>);
};
exports.default = TrackResults;
//# sourceMappingURL=TrackResults.js.map