"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_bootstrap_1 = require("react-bootstrap");
var Container_1 = __importDefault(require("react-bootstrap/Container"));
var SearchBar_1 = __importDefault(require("../components/SearchBar"));
var useSearch_1 = __importDefault(require("../customHook/useSearch"));
var CustomPagination_1 = __importDefault(require("../components/CustomPagination"));
var TrackResults_1 = __importDefault(require("../components/results/TrackResults"));
var AlbumResults_1 = __importDefault(require("../components/results/AlbumResults"));
var ArtistResults_1 = __importDefault(require("../components/results/ArtistResults"));
var PlaylistResults_1 = __importDefault(require("../components/results/PlaylistResults"));
var LoadingPepper_1 = __importDefault(require("../components/LoadingPepper"));
var SearchResultPage = function (_a) {
    var searchType = _a.searchType;
    var _b = useSearch_1.default(searchType), query = _b[0], results = _b[1], pageData = _b[2], loading = _b[3];
    document.title = " " + (query + " | ") + "  search " + searchType + " | Pepper Music";
    return (<Container_1.default fluid className="outer-container">
      <Container_1.default style={{ paddingBottom: "100px" }}>
        <div className="mb-3 sticky-bar">
          <SearchBar_1.default />
        </div>
        {loading && <LoadingPepper_1.default />}
        {results !== null && !loading && (<>
            <react_bootstrap_1.Row>
              {searchType === "track" && (<TrackResults_1.default results={results}/>)}
              {searchType === "album" && (<AlbumResults_1.default results={results}/>)}
              {searchType === "artist" && (<ArtistResults_1.default results={results}/>)}
              {searchType === "playlist" && (<PlaylistResults_1.default results={results}/>)}
            </react_bootstrap_1.Row>
            {results.items.length === 0 && (<>
                <h3 className="text-white">
                  No results found for &quot;{query}&quot;
                </h3>
                <h4 className="text-white">
                  Please check the spelling of the words or search other words
                </h4>
              </>)}
            {pageData !== null && (<div className="d-flex justify-content-center mt-3">
                <CustomPagination_1.default currentPage={pageData.currentPage} totalPages={pageData.totalPages} path={pageData.path}/>
              </div>)}
          </>)}
      </Container_1.default>
    </Container_1.default>);
};
exports.default = SearchResultPage;
//# sourceMappingURL=SearchResultPage.js.map