import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.js';

const Lane = sequelize.define('lane', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  laneCode: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

export default Lane;
