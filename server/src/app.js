import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './utils/database.js';
import authRoutes from './routes/auth.js';

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.use((error, _req, res, _next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: 'fail', status, data: message });
});

sequelize
  // .sync({ force: true })
  .sync()
  // .then(() => {
  //   return User.findByPk(1);
  // })
  // .then((user) => {
  //   return user ? user : User.create({ name: 'John Doe', email: 'example@example.com' });
  // })
  // .then((user) => user.createCart())
  .then(() => {
    app.listen(8000);
  })
  .catch((err) => {
    console.log(err);
  });
