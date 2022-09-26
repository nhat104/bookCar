import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './utils/database.js';
import authRoutes from './routes/auth.js';
import City from './models/city.js';
import Place from './models/place.js';
import TimePlace from './models/time-place.js';
import Car from './models/car.js';
import { cars } from './constants/car.js';
import { cities } from './constants/timeWithPlace.js';
import Driver from './models/driver.js';
import { drivers } from './constants/driver.js';
import CarInPlace from './models/car-in-place.js';

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.use((error, _req, res, _next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: 'fail', status, data: message });
});

Place.belongsTo(City, { constraints: true, onDelete: 'CASCADE' });
City.hasMany(Place);
TimePlace.belongsTo(Place, { constraints: true, onDelete: 'CASCADE' });
Place.hasMany(TimePlace);
Place.belongsToMany(Car, { through: CarInPlace });
Car.belongsToMany(Place, { through: CarInPlace });

sequelize
  // .sync({ force: true })
  .sync()
  // .then(() => {
  //   cities.forEach((item) => {
  //     City.create({
  //       name: item.name,
  //       cityCode: item.code,
  //     }).then((city) => {
  //       item.places.forEach((place) => {
  //         city.createPlace({ name: place.name, placeCode: place.code }).then((item) => {
  //           place.time.forEach((time) => {
  //             item.createTimePlace({ time });
  //           });
  //         });
  //       });
  //     });
  //   });

  //   Car.bulkCreate(cars);
  //   Driver.bulkCreate(drivers);
  // })
  .then(() => {
    app.listen(8000);
  })
  .catch((err) => {
    console.log(err);
  });
