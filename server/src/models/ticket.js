import { DataTypes } from 'sequelize';
import sequelize from '../utils/database.js';

const Ticket = sequelize.define('ticket', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  payment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  driverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Ticket;
