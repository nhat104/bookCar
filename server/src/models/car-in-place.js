import { DataTypes } from 'sequelize';
import sequelize from '../utils/database.js';
import Car from './car.js';

const CarInPlace = sequelize.define('carsPlace', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  carId: {
    type: DataTypes.INTEGER,
    references: {
      model: Car,
      key: 'id',
    },
  },
  placeFromId: {
    type: DataTypes.INTEGER,
  },
  placeToId: {
    type: DataTypes.INTEGER,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  // date: {
  //   type: DataTypes.DATE,
  //   allowNull: false,
  // },
  // time: {
  //   type: DataTypes.TIME,
  //   allowNull: false,
  // },
});

export default CarInPlace;
