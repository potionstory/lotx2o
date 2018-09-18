"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _account = require("./account");

var _account2 = _interopRequireDefault(_account);

var _lotto = require("./lotto");

var _lotto2 = _interopRequireDefault(_lotto);

var _user = require("./user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.use("/account", _account2.default);
router.use("/lotto", _lotto2.default);
router.use("/user", _user2.default);

exports.default = router;