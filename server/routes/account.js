import express from "express";
import Lotto from "../models/lotto";
import Account from "../models/account";

const router = express.Router();

/* 가입 */
router.post("/signup", (req, res) => {
  let usernameRegex = /^[a-z0-9]+$/;

  if (!usernameRegex.test(req.body.username)) {
    return res.status(400).json({
      error: "BAD USERNAME",
      code: 1
    });
  }

  if (req.body.password.length < 4 || typeof req.body.password !== "string") {
    return res.status(400).json({
      error: "BAD PASSWORD",
      code: 2
    });
  }

  if (req.body.password !== req.body.repassword) {
    return res.status(400).json({
      error: "NOT SAME PASSWORD",
      code: 3
    });
  }

  Account.findOne({ username: req.body.username }, (err, exists) => {
    if (err) throw err;
    if (exists) {
      return res.status(409).json({
        error: "USERNAME EXISTS",
        code: 4
      });
    }

    let account = new Account({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      money: 5000,
      dormant: false,
      lotto: {
        count: 0
      }
    });

    account.password = account.generateHash(account.password);

    account.save(err => {
      if (err) throw err;
      return res.json({ success: true });
    });
  });
});

/* 로그인 */
router.post("/signin", (req, res) => {
  if (typeof req.body.password !== "string") {
    return res.status(401).json({
      error: "LOGIN FAILED",
      code: 1
    });
  }

  Account.findOne({ username: req.body.username }, (err, account) => {
    if (err) throw err;

    if (!account) {
      return res.status(401).json({
        error: "LOGIN FAILED",
        code: 1
      });
    }

    if (!account.validateHash(req.body.password)) {
      return res.status(401).json({
        error: "LOGIN FAILED",
        code: 1
      });
    }

    if (account.dormant) {
      return res.status(401).json({
        error: "LOGIN FAILED",
        code: 1
      });
    }

    let lotto = [];
    let session = req.session;

    Lotto.find({ username: account._id })
      .sort({ created: 1 })
      .select("number")
      .exec(function(error, lottos) {
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
router.get("/getInfo", (req, res) => {
  if (typeof req.session.loginInfo === "undefined") {
    return res.status(401).json({
      error: 1
    });
  }

  res.json({ info: req.session.loginInfo });
});

/* 로그아웃 */
router.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) throw err;
  });
  return res.json({ success: true });
});

/* 회원탈퇴 */
router.post("/withdraw", (req, res) => {
  Account.findOneAndUpdate(
    { username: req.session.loginInfo.username },
    { $set: { dormant: true } },
    (err, account) => {
      if (err) return res.status(500).json({ error: "database failure" });

      Lotto.remove({ username: account._id }, err => {
        if (err)
          return res.status(500).json({ error: "lottos remove failure" });
      });
    }
  );

  req.session.destroy(err => {
    if (err) throw err;
  });
  return res.json({ success: true });
});

export default router;
