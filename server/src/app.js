import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './utils/database.js';
import authRoutes from './routes/auth.js';
import Lane from './models/lane.js';
import PlaceLane from './models/place_lane.js';
import TimePlaceLane from './models/time_place_lane.js';
import { lanes } from './constants/timeWithPlace.js';
import Car from './models/car.js';
import { cars } from './constants/car.js';

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
  //   Lane.bulkCreate([
  //     { name: 'Nam Định - Hà Nội', laneCode: 'ND_HN' },
  //     { name: 'Hà Nội - Nam Định', laneCode: 'HN_ND' },
  //   ]);

  //   const places = [];
  //   for (const lane in lanes) {
  //     lanes[lane].forEach((place) => {
  //       places.push({ name: place.name, placeCode: place.code, laneCode: lane });
  //     });
  //   }
  //   PlaceLane.bulkCreate(places);

  //   const times = [];
  //   for (const lane in lanes) {
  //     lanes[lane].forEach((place) => {
  //       place.time.forEach((time) => {
  //         times.push({ time, placeCode: place.code, laneCode: lane });
  //       });
  //     });
  //   }
  //   TimePlaceLane.bulkCreate(times);

  //   Car.bulkCreate(cars);
  // })
  .then(() => {
    app.listen(8000);
  })
  .catch((err) => {
    console.log(err);
  });
