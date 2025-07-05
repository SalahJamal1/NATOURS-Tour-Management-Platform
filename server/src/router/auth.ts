import express from 'express';
import { login, logout, protect, signUp, getMe } from '../controller/auth';

const router = express.Router();

router.route('/Signup').post(signUp);
router.route('/Login').post(login);
router.route('/Logout').get(logout);
router.route('/me').get(protect, getMe);

export default router;
