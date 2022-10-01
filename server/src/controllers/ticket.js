import { Sequelize } from 'sequelize';
import { CarInPlace, Driver, Guess } from '../models/index.js';

export const buyTicket = async (req, res, next) => {
  const { carLineId, payment, time, userInfo } = req.body;
  const hourPart = time.hour.split('h');
  const date = `${time.date} ${hourPart[0]}:${hourPart[1]}:00`;
  try {
    const guess = await Guess.create(userInfo);
    const carLine = await CarInPlace.findOne({ where: { id: carLineId } });
    const driver = await Driver.findOne({ order: Sequelize.literal('rand()') });
    const ticket = await carLine.addGuess(guess, {
      through: { payment, date, driverId: driver.id },
    });
    res.status(200).json({
      message: 'success',
      status: 200,
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};
