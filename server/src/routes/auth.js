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
        return Promise.reject('Username already exists!');
      }
    }),
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom(async (value) => {
        const userDoc = await User.findOne({ where: { email: value } });
        if (userDoc) {
          return Promise.reject('Email address already exists!');
        }
      }),
    body('password')
      .trim()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long.'),
    body('role').custom((value) => {
      if (value !== 'user' && value !== 'admin') {
        return Promise.reject('Role must be either user or admin.');
      }
      return true;
    }),
  ],
  signup
);

router.post('/login', login);

export default router;
