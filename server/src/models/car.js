import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.js';

const Car = sequelize.define('car', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  licensePlate: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

export default Car;
