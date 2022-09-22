import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.js';

const PlaceLane = sequelize.define('placeLane', {
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
  laneCode: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default PlaceLane;
