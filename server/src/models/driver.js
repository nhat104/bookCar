import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.js';

const Driver = sequelize.define('driver', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  gender: Sequelize.STRING,
  dateOfBirth: Sequelize.DATE,
  avatar: Sequelize.STRING(1023),
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  rate: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
  },
  rateCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

export default Driver;
