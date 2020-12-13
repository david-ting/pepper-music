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
var react_1 = __importStar(require("react"));
var react_bootstrap_1 = require("react-bootstrap");
var react_router_dom_1 = require("react-router-dom");
var AlbumResults_1 = __importDefault(require("../components/results/AlbumResults"));
var fetchData_1 = require("../customFunc/fetchData");
var ArtistPage = function () {
    var _a = react_1.useState(null), artist = _a[0], setArtist = _a[1];
    var _b = react_1.useState(null), albums = _b[0], setAlbums = _b[1];
    var id = react_router_dom_1.useParams().id;
    react_1.useEffect(function () {
        if (id !== "") {
            (function () { return __awaiter(void 0, void 0, void 0, function () {
                var data, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, fetchData_1.fetchDataFunc("artists", id)];
                        case 1:
                            data = _a.sent();
                            setArtist(data);
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            console.error(error_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); })();
            (function () { return __awaiter(void 0, void 0, void 0, function () {
                var data, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, fetchData_1.fetchDataFunc("artists_albums", id)];
                        case 1:
                            data = _a.sent();
                            setAlbums(data);
                            return [3 /*break*/, 3];
                        case 2:
                            error_2 = _a.sent();
                            console.error(error_2);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); })();
        }
    }, [id]);
    return (<react_bootstrap_1.Container fluid className="artist-container">
      {artist && (<react_bootstrap_1.Container className="pt-5" style={{ height: "100%" }}>
          <react_bootstrap_1.Row style={{ height: "100%" }}>
            <react_bootstrap_1.Col style={{ height: "100%" }} className="artist-info" xs={12} md={3}>
              {artist.images && artist.images.length > 1 && (<img src={artist.images[0].url} width={180} height={180} style={{ objectFit: "cover", borderRadius: "50%" }}></img>)}
              {artist.name && (<h5 className="text-white my-3">{artist.name}</h5>)}
              {artist.genres && artist.genres.length > 1 && (<div className="genres-container">
                  {artist.genres.map(function (g) { return (<div key={g} className="badge badge-secondary">
                      {g}
                    </div>); })}
                </div>)}
            </react_bootstrap_1.Col>
            {albums && (<react_bootstrap_1.Col xs={12} md={9} className="text-white artist-albums">
                <react_bootstrap_1.Container>
                  <react_bootstrap_1.Row>
                    <AlbumResults_1.default results={albums}/>
                  </react_bootstrap_1.Row>
                </react_bootstrap_1.Container>
              </react_bootstrap_1.Col>)}
          </react_bootstrap_1.Row>
        </react_bootstrap_1.Container>)}
    </react_bootstrap_1.Container>);
};
exports.default = ArtistPage;
//# sourceMappingURL=ArtistPage.js.map