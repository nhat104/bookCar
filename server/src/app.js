import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './utils/database.js';
import authRoutes from './routes/auth.js';
import carRoutes from './routes/car-line.js';
import City from './models/city.js';
import Place from './models/place.js';
import Car from './models/car.js';
import TimePlace from './models/time-place.js';
import CarType from './models/car-type.js';
import { cars, carTypes, cities, drivers } from './constants/index.js';
import Driver from './models/driver.js';
import CarInPlace from './models/car-in-place.js';

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use(carRoutes);

app.use((error, _req, res, _next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: 'fail', status, data: message });
});

Place.belongsTo(City, { constraints: true, onDelete: 'CASCADE' });
City.hasMany(Place);
TimePlace.belongsTo(Place, { constraints: true, onDelete: 'CASCADE' });
Place.hasMany(TimePlace);
CarInPlace.belongsTo(Car);
Car.hasMany(CarInPlace);
CarType.hasMany(Car, { foreignKey: 'carTypeId' });
Car.belongsTo(CarType);
CarInPlace.belongsTo(Place, { as: 'placeFrom', foreignKey: 'placeFromId' });
CarInPlace.belongsTo(Place, { as: 'placeTo', foreignKey: 'placeToId' });

// Place.belongsToMany(Place, {
//   through: CarInPlace,
//   as: 'placeFrom',
//   foreignKey: 'placeFromId',
// });
// Place.belongsToMany(Place, {
//   through: CarInPlace,
//   as: 'placeTo',
//   foreignKey: 'placeToId',
// });

sequelize
  // .sync({ force: true })
  .sync()
  // .then(async () => {
  //   Driver.bulkCreate(drivers);
  //   carTypes.forEach(async (item, index) => {
  //     const carType = await CarType.create(item);
  //     cars[index].forEach((car) => {
  //       carType.createCar(car);
  //     });
  //   });
  //   cities.forEach(async (item) => {
  //     const city = await City.create({ name: item.name, cityCode: item.code });
  //     item.places.forEach(async (place) => {
  //       const placeItem = await city.createPlace({ name: place.name, placeCode: place.code });
  //       place.time.forEach(async (time) => {
  //         placeItem.createTimePlace({ time });
  //       });
  //     });
  //   });
  // })
  // .then(async () => {
  //   const allCity = await City.findAll();
  //   const place1 = await Place.findAll({ where: { cityId: allCity[0].id } });
  //   const place2 = await Place.findAll({ where: { cityId: allCity[1].id } });
  //   place1.forEach((placeFrom) => {
  //     place2.forEach((placeTo) => {
  //       CarInPlace.create({
  //         placeFromId: placeFrom.id,
  //         placeToId: placeTo.id,
  //         quantity: 1,
  //         carId: Math.floor(Math.random() * 12) + 1,
  //       });
  //       CarInPlace.create({
  //         placeFromId: placeTo.id,
  //         placeToId: placeFrom.id,
  //         quantity: 1,
  //         carId: Math.floor(Math.random() * 12) + 1,
  //       });
  //     });
  //   });
  // })
  .then(() => {
    app.listen(8000);
  })
  .catch((err) => {
    console.log(err);
  });
