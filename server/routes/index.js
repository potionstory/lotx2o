import express from 'express';
import account from './account';
import user from './user';
import lotto from './lotto';

const router = express.Router();
router.use('/account', account);
router.use('/lotto', lotto);
router.use('/user', user);

export default router;