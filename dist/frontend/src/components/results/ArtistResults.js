"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_bootstrap_1 = require("react-bootstrap");
var bs_1 = require("react-icons/bs");
var lib_1 = require("react-icons/lib");
var react_router_dom_1 = require("react-router-dom");
var CustomImage_1 = __importDefault(require("../CustomImage"));
var ArtistResults = function (_a) {
    var results = _a.results;
    var history = react_router_dom_1.useHistory();
    var clickHandler = function (id) {
        history.push("/search/artist/" + id);
    };
    return (<>
      {results.items.length > 0 &&
        results.items.map(function (item) {
            return (<react_bootstrap_1.Col xs="6" md="4" lg="3" className="p-2" key={item.id}>
              <div className="col-result">
                <div className="col-result-content">
                  <p className="text-white m-0 py-2 ellipsis">{item.name}</p>
                  {item.images && item.images.length > 0 ? (<CustomImage_1.default src={item.images[0].url} alt="" clickHandler={function () { return clickHandler(item.id); }}></CustomImage_1.default>) : (<lib_1.IconContext.Provider value={{ size: "100%" }}>
                      <bs_1.BsFillPersonFill onClick={function () { return clickHandler(item.id); }}/>
                    </lib_1.IconContext.Provider>)}
                  )
                </div>
              </div>
            </react_bootstrap_1.Col>);
        })}
    </>);
};
exports.default = ArtistResults;
//# sourceMappingURL=ArtistResults.js.map