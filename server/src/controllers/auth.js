import { validationResult } from 'express-validator';
import User from '../models/user.js';

export const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array().reduce((acc, err) => {
      return { ...acc, [err.param]: err.msg };
    }, {});
    const error = {
      message: message || 'Validation failed.',
      status: 422,
    };
    console.log(errors.array());
    // throw error;
    return next(error);
  }
  const { name, username, password, address, phone, cccd, role = 'user' } = req.body;

  try {
    const user = await User.create({ name, username, password, address, phone, cccd, role });
    res.status(201).json({
      message: 'User created!',
      status: 201,
      data: {
        user: {
          id: user.id.toString(),
          username,
          name: user.name,
          role: user.role,
          address: user.address,
          phone: user.phone,
          cccd: user.cccd,
          role: user.role,
        },
      },
    });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

export const login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = {
      message: errors.array()[0].msg || 'Validation failed.',
      status: 422,
    };
    console.log(errors.array());
    throw error;
  }

  const { username, password } = req.body;
  User.findOne({ where: { username, password } })
    .then((user) => {
      if (!user) {
        const error = new Error('Wrong username or password. Please try again.');
        error.status = 401;
        throw error;
      }
      res.status(200).json({
        message: 'successful!',
        status: 200,
        data: {
          user: {
            id: user.id.toString(),
            username,
            name: user.name,
            role: user.role,
            address: user.address,
            phone: user.phone,
            cccd: user.cccd,
            role: user.role,
          },
        },
      });
    })
    .catch((err) => {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    });
};
