import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('book-car', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  // define: { timestamps: false },
});

export default sequelize;
