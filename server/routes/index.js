import express from "express";
import account from "./account";
import lotto from "./lotto";
import user from "./user";

const router = express.Router();
router.use("/account", account);
router.use("/lotto", lotto);
router.use("/user", user);

export default router;
