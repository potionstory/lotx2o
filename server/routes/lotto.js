import express from "express";
import mongoose from "mongoose";
import Lotto from "../models/lotto";
import Account from "../models/account";

const router = express.Router();

/* lotto list */
router.get("/", (req, res) => {
  Lotto.find()
    .sort({ _id: -1 })
    .limit(20)
    .populate("username")
    .exec((err, lottos) => {
      if (err) throw err;
      res.json(lottos);
    });
});

router.get("/:listType/:id", (req, res) => {
  let listType = req.params.listType;
  let id = req.params.id;

  if (listType !== "old" && listType !== "new") {
    return res.status(400).json({
      error: "INVALID LISTTYPE",
      code: 1
    });
  }

  let objId = new mongoose.Types.ObjectId(req.params.id);

  if (listType === "new") {
    // GET NEWER MEMO
    //Lotto.find({ _id: { $gt: objId }})
    Lotto.find()
      .sort({ _id: -1 })
      .limit(20)
      .populate("username")
      .exec((err, lottos) => {
        if (err) throw err;
        res.json(lottos);
      });
  } else {
    // GET OLDER MEMO
    Lotto.find({ _id: { $lt: objId } })
      .sort({ _id: -1 })
      .limit(20)
      .populate("username")
      .exec((err, lottos) => {
        if (err) throw err;
        res.json(lottos);
      });
  }
});

/* 번호 추가 */
router.post("/save", (req, res) => {
  /* setTimeout 100 으로 시간 간격 주기 (더 짧아도 될거 같음) */
  async function save(number, i) {
    return new Promise(function(resolve, reject) {
      setTimeout(() => {
        let lotto = new Lotto({
          username: req.session.loginInfo._id,
          number: number
        });
        lotto.save(err => {
          if (err) {
            reject(err);
          } else {
            let errorsArr = [];
            errorsArr.push({ msg: "Lotto DB not space" });
            resolve(errorsArr);
          }
        });
      }, 100 * i);
    });
  }

  function savePromise() {
    let number = req.body.number;
    let money = number.length * 1000;
    let promises = [];

    for (var i = 0; i < number.length; i += 1) {
      promises.push(save(number[i], i));
    }

    Promise.all(promises)
      .then(results => {
        Account.findOneAndUpdate(
          { username: req.body.username },
          { $inc: { money: -money } },
          (err, account) => {
            Lotto.find({ username: account._id })
              .sort({ _id: 1 })
              .select("number")
              .exec(function(error, lottos) {
                let session = req.session;

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
          }
        );
      })
      .catch(e => {
        console.log("Number Save Fail");
      });
  }

  savePromise();
});

router.post("/remove", (req, res) => {
  Lotto.remove({ _id: req.body.id }, (err, lotto) => {
    if (err) throw err;
    Account.findOneAndUpdate(
      { username: req.session.loginInfo.username },
      { $inc: { money: +1000 } },
      (err, account) => {
        Lotto.find({ username: account._id })
          .sort({ created: 1 })
          .select("number")
          .exec(function(error, lottos) {
            let session = req.session;

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
      }
    );
  });
});

export default router;
