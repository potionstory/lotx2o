'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lotto = require('../models/lotto');

var _lotto2 = _interopRequireDefault(_lotto);

var _account = require('../models/account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/* 가입 */
router.post('/signup', function (req, res) {

    var usernameRegex = /^[a-z0-9]+$/;

    if (!usernameRegex.test(req.body.username)) {
        return res.status(400).json({
            error: 'BAD USERNAME',
            code: 1
        });
    }

    if (req.body.password.length < 4 || typeof req.body.password !== 'string') {
        return res.status(400).json({
            error: 'BAD PASSWORD',
            code: 2
        });
    }

    if (req.body.password !== req.body.repassword) {
        return res.status(400).json({
            error: 'NOT SAME PASSWORD',
            code: 3
        });
    }

    _account2.default.findOne({ username: req.body.username }, function (err, exists) {
        if (err) throw err;
        if (exists) {
            return res.status(409).json({
                error: 'USERNAME EXISTS',
                code: 4
            });
        }

        var account = new _account2.default({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            money: 5000,
            lotto: {
                count: 0
            }
        });

        account.password = account.generateHash(account.password);

        account.save(function (err) {
            if (err) throw err;
            return res.json({ success: true });
        });
    });
});

/* 로그인 */
router.post('/signin', function (req, res) {

    if (typeof req.body.password !== 'string') {
        return res.status(401).json({
            error: 'LOGIN FAILED',
            code: 1
        });
    }

    _account2.default.findOne({ username: req.body.username }, function (err, account) {
        if (err) throw err;

        if (!account) {
            return res.status(401).json({
                error: 'LOGIN FAILED',
                code: 1
            });
        }

        if (!account.validateHash(req.body.password)) {
            return res.status(401).json({
                error: 'LOGIN FAILED',
                code: 1
            });
        }

        var lotto = [];
        var session = req.session;

        _lotto2.default.find({ username: account._id }).sort({ created: 1 }).select('number').exec(function (error, lottos) {
            session.loginInfo = {
                _id: account._id,
                username: account.username,
                money: account.money,
                lotto: {
                    count: lottos.length,
                    number: lottos
                }
            };

            return res.json({
                success: true,
                info: session.loginInfo
            });
        });
    });
});

/* 세션 확인 */
router.get('/getInfo', function (req, res) {
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(401).json({
            error: 1
        });
    }

    res.json({ info: req.session.loginInfo });
});

/* 로그아웃 */
router.post('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) throw err;
    });
    return res.json({ success: true });
});

/* 회원탈퇴 */
router.post('/withdraw', function (req, res) {
    _account2.default.remove({ "username": req.session.loginInfo.username }, function (err) {
        if (err) return res.status(500).json({ error: 'database failure' });
    });

    req.session.destroy(function (err) {
        if (err) throw err;
    });
    return res.json({ success: true });
});

exports.default = router;