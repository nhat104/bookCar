import jwt from 'jsonwebtoken';

const isAuth = (req, _, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = { message: 'Not authenticated.', status: 401 };
    throw error;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'some-supersecret');
  } catch (err) {
    const error = { message: 'Not authenticated.', status: 401 };
    throw error;
  }
  if (!decodedToken) {
    const error = { message: 'Not authenticated.', status: 401 };
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};

export default isAuth;
