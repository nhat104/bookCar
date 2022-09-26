import { DataTypes } from 'sequelize';
import sequelize from '../utils/database.js';

const CarInPlace = sequelize.define('carsPlace', {
  carId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'cars',
      key: 'id',
    },
  },
  placeFromId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'places',
      key: 'id',
    },
  },
  placeToId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'places',
      key: 'id',
    },
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
});

export default CarInPlace;
