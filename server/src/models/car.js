import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.js';

const Car = sequelize.define('car', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  code: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  name: Sequelize.STRING,
  seat: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

export default Car;
