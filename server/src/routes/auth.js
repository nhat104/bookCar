import express from 'express';
import { body } from 'express-validator';
import { login, signup } from '../controllers/auth.js';
import User from '../models/user.js';

const router = express.Router();

router.post(
  '/signup',
  [
    body('username').custom(async (value) => {
      const userDoc = await User.findOne({ where: { username: value } });
      if (userDoc) {
        console.log(userDoc);
        return Promise.reject('Username already exist!');
      }
    }),
  ],
  signup
);

router.post('/login', login);

export default router;
