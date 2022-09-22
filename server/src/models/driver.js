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
  dateOfBirth: Sequelize.DATE,
  image: Sequelize.STRING(1023),
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  code: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

export default Driver;
