import { validationResult } from 'express-validator';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array().reduce((acc, err) => {
      return { ...acc, [err.param]: err.msg };
    }, {});
    const error = {
      message: message || 'Validation failed.',
      statusCode: 422,
    };
    console.log(errors.array());
    throw error;
  }
  const { name, username, password, role = 'user' } = req.body;

  return User.create({ name, username, password, role })
    .then((user) => {
      res.status(201).json({ message: 'User created!', userId: user.id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

export const login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = {
      message: errors.array()[0].msg || 'Validation failed.',
      statusCode: 422,
    };
    console.log(errors.array());
    throw error;
  }

  const { username, password } = req.body;
  User.findOne({ where: { username, password } })
    .then((user) => {
      if (!user) {
        const error = new Error('Wrong username or password. Please try again.');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          username: user.username,
          userId: user.id.toString(),
        },
        'some-supersecret',
        { expiresIn: '1h' }
      );
      res.status(200).json({
        message: 'successful!',
        status: 200,
        data: {
          token,
          user: {
            id: user.id.toString(),
            username,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
      });
      // return user.password === password;
    })
    // .then((isEqual) => {
    //   if (!isEqual) {
    //     const error = new Error('Wrong password!');
    //     error.statusCode = 401;
    //     throw error;
    //   }
    // })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
