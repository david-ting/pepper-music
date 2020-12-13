"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Container_1 = __importDefault(require("react-bootstrap/Container"));
var Jumbotron_1 = __importDefault(require("react-bootstrap/Jumbotron"));
var MusicBars_1 = __importDefault(require("../components/MusicBars"));
var SearchBar_1 = __importDefault(require("../components/SearchBar"));
var SearchPage = function () {
    document.title = "Search | Pepper Music";
    return (<Container_1.default fluid className="outer-container">
      <Container_1.default className="center-container">
        <MusicBars_1.default />
        <Jumbotron_1.default>
          <SearchBar_1.default />
        </Jumbotron_1.default>
      </Container_1.default>
    </Container_1.default>);
};
exports.default = SearchPage;
//# sourceMappingURL=SearchPage.js.map