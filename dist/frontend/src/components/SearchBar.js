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
var im_1 = require("react-icons/im");
var react_bootstrap_1 = require("react-bootstrap");
var react_router_dom_1 = require("react-router-dom");
var SearchBar = function () {
    var history = react_router_dom_1.useHistory();
    var pathname = react_router_dom_1.useLocation().pathname;
    var search = react_router_dom_1.useLocation().search;
    var searchObj = new URLSearchParams(search);
    var q = searchObj.get("q");
    var _a = react_1.useState("album"), searchType = _a[0], setSearchType = _a[1];
    var _b = react_1.useState(""), inputVal = _b[0], setInputVal = _b[1];
    var clickHandler = function (event) {
        var search = event.currentTarget.textContent;
        if (search === searchType)
            return;
        if (search !== null) {
            setSearchType(search);
            if (inputVal !== "") {
                history.push("/search/" + encodeURIComponent(search) + "?q=" + encodeURIComponent(inputVal) + "&p=1");
            }
        }
    };
    var searchHandler = function () {
        if (inputVal === "")
            return;
        history.push("/search/" + encodeURIComponent(searchType) + "?q=" + encodeURIComponent(inputVal) + "&p=1");
    };
    react_1.useEffect(function () {
        var typeMatch = pathname.match(/\/search\/([a-z]+)/);
        var type;
        if (typeMatch === null) {
            type = "album";
        }
        else {
            type = typeMatch[1];
        }
        if (q !== null) {
            setInputVal(q);
        }
        setSearchType(type);
    }, [pathname, search, q]);
    return (<>
      <react_bootstrap_1.InputGroup className="mb-3 search-bar">
        <react_bootstrap_1.DropdownButton as={react_bootstrap_1.InputGroup.Prepend} variant="secondary" title={searchType} id="input-group-dropdown-1">
          <react_bootstrap_1.Dropdown.Item href="#" onClick={clickHandler} className="search-dropdown-item">
            album
          </react_bootstrap_1.Dropdown.Item>
          <react_bootstrap_1.Dropdown.Item href="#" onClick={clickHandler} className="search-dropdown-item">
            artist
          </react_bootstrap_1.Dropdown.Item>
          <react_bootstrap_1.Dropdown.Item href="#" onClick={clickHandler} className="search-dropdown-item">
            playlist
          </react_bootstrap_1.Dropdown.Item>
          <react_bootstrap_1.Dropdown.Item href="#" onClick={clickHandler} className="search-dropdown-item">
            track
          </react_bootstrap_1.Dropdown.Item>
        </react_bootstrap_1.DropdownButton>
        <react_bootstrap_1.FormControl aria-describedby="basic-addon1" value={inputVal} onChange={function (event) { return setInputVal(event.target.value); }} onKeyDown={function (event) {
        if (event.key === "Enter") {
            searchHandler();
        }
    }}/>
        <react_bootstrap_1.InputGroup.Append>
          <react_bootstrap_1.Button variant="outline-secondary" onClick={searchHandler} className="search-button">
            <im_1.ImSearch />
          </react_bootstrap_1.Button>
        </react_bootstrap_1.InputGroup.Append>
      </react_bootstrap_1.InputGroup>
    </>);
};
exports.default = SearchBar;
//# sourceMappingURL=SearchBar.js.map