import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './utils/database.js';
import { authRoutes, placeRoutes, carRoutes, ticketRoutes } from './routes/index.js';
import { Driver } from './models/index.js';
import { City, Place, Car, TimePlace, CarType, CarInPlace, Guess, Ticket } from './models/index.js';
import { cars, carTypes, cities, drivers } from './constants/index.js';

const app = express();

app.use(bodyParser.json());

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

app.use('/auth', authRoutes);
app.use(carRoutes);
app.use(placeRoutes);
app.use(ticketRoutes);

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
Guess.belongsToMany(CarInPlace, { through: Ticket });
CarInPlace.belongsToMany(Guess, { through: Ticket });

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
  // .sync({ force: true }) // reset all database
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
