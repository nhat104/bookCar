import { DataTypes } from 'sequelize';
import sequelize from '../utils/database.js';

const Guess = sequelize.define('guess', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  phone: DataTypes.STRING,
  address: DataTypes.STRING,
  cccd: DataTypes.STRING,
});

export default Guess;
