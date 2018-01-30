'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _lotto = require('../models/lotto');

var _lotto2 = _interopRequireDefault(_lotto);

var _account = require('../models/account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/* lotto list */
router.get('/', function (req, res) {
    _lotto2.default.find().sort({ _id: -1 }).limit(20).populate('username').exec(function (err, lottos) {
        if (err) throw err;
        res.json(lottos);
    });
});

router.get('/:listType/:id', function (req, res) {
    var listType = req.params.listType;
    var id = req.params.id;

    if (listType !== 'old' && listType !== 'new') {
        return res.status(400).json({
            error: "INVALID LISTTYPE",
            code: 1
        });
    }

    var objId = new _mongoose2.default.Types.ObjectId(req.params.id);

    if (listType === 'new') {
        // GET NEWER MEMO
        //Lotto.find({ _id: { $gt: objId }})
        _lotto2.default.find().sort({ _id: -1 }).limit(20).populate('username').exec(function (err, lottos) {
            if (err) throw err;
            res.json(lottos);
        });
    } else {
        // GET OLDER MEMO
        _lotto2.default.find({ _id: { $lt: objId } }).sort({ _id: -1 }).limit(20).populate('username').exec(function (err, lottos) {
            if (err) throw err;
            res.json(lottos);
        });
    }
});

/* 번호 추가 */
router.post('/save', function (req, res) {

    /* setTimeout 100 으로 시간 간격 주기 (더 짧아도 될거 같음) */
    async function save(number, i) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                var lotto = new _lotto2.default({
                    username: req.session.loginInfo._id,
                    number: number
                });
                lotto.save(function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        var errorsArr = [];
                        errorsArr.push({ "msg": "Lotto DB not space" });
                        resolve(errorsArr);
                    };
                });
            }, 100 * i);
        });
    }

    function savePromise() {
        var number = req.body.number;
        var money = number.length * 1000;
        var promises = [];

        for (var i = 0; i < number.length; i += 1) {
            promises.push(save(number[i], i));
        }

        Promise.all(promises).then(function (results) {
            _account2.default.findOneAndUpdate({ username: req.body.username }, { $inc: { money: -money } }, function (err, account) {
                _lotto2.default.find({ username: account._id }).sort({ _id: 1 }).select('number').exec(function (error, lottos) {
                    var session = req.session;

                    session.loginInfo = {
                        _id: account._id,
                        username: account.username,
                        money: account.money - money,
                        lotto: {
                            count: lottos.length,
                            number: lottos
                        }
                    };

                    return res.json({
                        success: true
                    });
                });
            });
        }).catch(function (e) {
            console.log('Number Save Fail');
        });
    }

    savePromise();
});

router.post('/remove', function (req, res) {
    _lotto2.default.remove({ _id: req.body.id }, function (err, lotto) {
        if (err) throw err;
        _account2.default.findOneAndUpdate({ username: req.session.loginInfo.username }, { $inc: { money: +1000 } }, function (err, account) {
            _lotto2.default.find({ username: account._id }).sort({ created: 1 }).select('number').exec(function (error, lottos) {
                var session = req.session;

                session.loginInfo = {
                    _id: account._id,
                    username: account.username,
                    money: account.money + 1000,
                    lotto: {
                        count: lottos.length,
                        number: lottos
                    }
                };

                return res.json({
                    success: true
                });
            });
        });
    });
});

exports.default = router;