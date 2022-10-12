import { DataTypes } from 'sequelize';
import sequelize from '../utils/database.js';

const Car = sequelize.define('car', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  image: DataTypes.STRING,
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: DataTypes.STRING,
  licensePlate: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default Car;
