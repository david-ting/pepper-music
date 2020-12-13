"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var bs_1 = require("react-icons/bs");
var ai_1 = require("react-icons/ai");
var react_router_dom_1 = require("react-router-dom");
var HoverIcon_1 = __importDefault(require("./HoverIcon"));
var CustomPagination = function (_a) {
    var currentPage = _a.currentPage, totalPages = _a.totalPages, path = _a.path;
    var previousPath = "" + path + (currentPage === 1 ? currentPage : currentPage - 1);
    var nextPath = "" + path + (currentPage === totalPages ? currentPage : currentPage + 1);
    var pagesJSX = [];
    var pages = [];
    var middle;
    if (currentPage === 1) {
        if (totalPages % 2 === 0) {
            middle = totalPages / 2;
        }
        else {
            middle = Math.floor(totalPages / 2);
        }
    }
    else {
        middle = currentPage;
    }
    if (totalPages <= 7) {
        for (var i = 1; i < totalPages + 1; i++) {
            pages.push(i);
        }
    }
    else {
        pages.push(1, 2);
        if (currentPage >= totalPages - 4) {
            pages.push("break-a");
            pages.push(totalPages - 4, totalPages - 3, totalPages - 2);
        }
        else if (currentPage !== 2) {
            if (currentPage !== 3)
                pages.push("break-b");
            pages.push(middle, middle + 1, middle + 2);
        }
        else {
            pages.push(middle + 1, middle + 2);
        }
        if (currentPage < totalPages - 4 && middle + 4 !== totalPages)
            pages.push("break-c");
        pages.push(totalPages - 1, totalPages);
    }
    for (var i = 0; i < pages.length; i++) {
        if (typeof pages[i] !== "number") {
            pagesJSX.push(<span key={pages[i]} className="text-white">
          <bs_1.BsThreeDots />
        </span>);
        }
        else {
            pagesJSX.push(<react_router_dom_1.Link key={pages[i]} to={"" + path + pages[i]} className={"page white-link " + (currentPage === pages[i] ? "page-active" : "")}>
          {pages[i]}
        </react_router_dom_1.Link>);
        }
    }
    return (<div className="pagination">
      {pagesJSX.length > 0 && (<>
          <react_router_dom_1.Link to={previousPath}>
            <HoverIcon_1.default color="rgb(65, 64, 64)" hoverColor="gray" size="2rem" hoverSize="2rem">
              <ai_1.AiFillCaretLeft />
            </HoverIcon_1.default>
          </react_router_dom_1.Link>

          {pagesJSX}

          <react_router_dom_1.Link to={nextPath}>
            <HoverIcon_1.default color="rgb(65, 64, 64)" hoverColor="gray" size="2rem" hoverSize="2rem">
              <ai_1.AiFillCaretRight />
            </HoverIcon_1.default>
          </react_router_dom_1.Link>
        </>)}
    </div>);
};
exports.default = CustomPagination;
//# sourceMappingURL=CustomPagination.js.map