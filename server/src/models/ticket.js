import { DataTypes } from 'sequelize';
import sequelize from '../utils/database.js';

const Ticket = sequelize.define('ticket', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  hour: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  payment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  note: DataTypes.STRING,
  rate: DataTypes.INTEGER,
});

export default Ticket;
