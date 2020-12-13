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
var Modal_1 = __importDefault(require("react-bootstrap/Modal"));
var Button_1 = __importDefault(require("react-bootstrap/Button"));
var REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
var useModal = function () {
    var _a = react_1.useState(false), show = _a[0], setShow = _a[1];
    var handleClose = function () { return setShow(false); };
    var modalJSX = (<>
      <Modal_1.default show={show} onHide={handleClose}>
        <Modal_1.default.Header closeButton></Modal_1.default.Header>
        <Modal_1.default.Body>
          <p>You are not logged in.</p>
          <p>
            Please click the login button.{" "}
            <Button_1.default variant="danger" className="ml-2" onClick={function () {
        window.location.href = REACT_APP_BACKEND_URL + "/api/login";
    }}>
              Login
            </Button_1.default>
          </p>
        </Modal_1.default.Body>
      </Modal_1.default>
    </>);
    return { setShow: setShow, modalJSX: modalJSX };
};
exports.default = useModal;
//# sourceMappingURL=useModal.js.map