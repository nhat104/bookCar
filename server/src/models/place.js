import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.js';

const Place = sequelize.define('place', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  placeCode: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

export default Place;
