import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.js';

const City = sequelize.define('city', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  cityCode: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

export default City;
