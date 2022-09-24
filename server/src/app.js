import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './utils/database.js';
import authRoutes from './routes/auth.js';
import Lane from './models/lane.js';
import PlaceLane from './models/place_lane.js';
import TimePlaceLane from './models/time_place_lane.js';
import Car from './models/car.js';
import { cars } from './constants/car.js';
import { lanes } from './constants/timeWithPlace.js';
import Driver from './models/driver.js';
import { drivers } from './constants/driver.js';

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.use((error, _req, res, _next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: 'fail', status, data: message });
});

PlaceLane.belongsTo(Lane, { constraints: true, onDelete: 'CASCADE' });
Lane.hasMany(PlaceLane);
TimePlaceLane.belongsTo(PlaceLane, { constraints: true, onDelete: 'CASCADE' });
PlaceLane.hasMany(TimePlaceLane);

sequelize
  // .sync({ force: true })
  .sync()
  // .then(() => {
  //   lanes.forEach((item) => {
  //     Lane.create({
  //       name: item.name,
  //       laneCode: item.code,
  //     }).then((lane) => {
  //       item.places.forEach((place) => {
  //         lane.createPlaceLane({ name: place.name, placeCode: place.code }).then((placeLane) => {
  //           place.time.forEach((time) => {
  //             placeLane.createTimePlaceLane({ time });
  //           });
  //         });
  //       });
  //     });
  //   });

  //   Car.bulkCreate(cars);
  //   Driver.bulkCreate(drivers)
  // })
  .then(() => {
    app.listen(8000);
  })
  .catch((err) => {
    console.log(err);
  });
