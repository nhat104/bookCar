import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.js';

const timePlaceLane = sequelize.define('timePlaceLane', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  time: Sequelize.STRING,
  placeCode: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  laneCode: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default timePlaceLane;
