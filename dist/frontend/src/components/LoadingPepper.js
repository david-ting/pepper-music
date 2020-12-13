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
var fa_1 = require("react-icons/fa");
var lib_1 = require("react-icons/lib");
var duration = 3000;
var LoadingPepper = function () {
    var _a = react_1.useState([
        "1.5rem",
        "1.5rem",
        "1.5rem",
        "1.5rem",
        "1.5rem",
    ]), sizes = _a[0], setSizes = _a[1];
    react_1.useEffect(function () {
        var count = 0;
        var interval = setInterval(function () {
            var newSizes = ["1.5rem", "1.5rem", "1.5rem", "1.5rem", "1.5rem"];
            newSizes = sizes.map(function (size, index) {
                if (index <= count) {
                    return "1.7rem";
                }
                else {
                    return "1.5rem";
                }
            });
            if (count === 4) {
                count = 0;
            }
            else {
                count++;
            }
            setSizes(newSizes);
        }, duration / 5);
        return function () {
            clearInterval(interval);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (<div className="pepper-loading-container">
      {sizes.map(function (size, index) {
        return (<lib_1.IconContext.Provider key={index} value={{ color: "red", size: size }}>
            <div className="pepper-loading">
              <fa_1.FaPepperHot />
            </div>
          </lib_1.IconContext.Provider>);
    })}
    </div>);
};
exports.default = LoadingPepper;
//# sourceMappingURL=LoadingPepper.js.map