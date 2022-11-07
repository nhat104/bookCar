import { DataTypes } from 'sequelize';
import sequelize from '../utils/database.js';

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: DataTypes.STRING,
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cccd: DataTypes.STRING,
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
