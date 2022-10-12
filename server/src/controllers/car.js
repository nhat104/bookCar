import { Op } from 'sequelize';
import CarInPlace from '../models/car-in-place.js';
import CarType from '../models/car-type.js';
import Car from '../models/car.js';
import Ticket from '../models/ticket.js';
import TimePlace from '../models/time-place.js';

export const getCars = async (req, res) => {
  try {
    const cars = await Car.findAll({ include: [{ model: CarType }] });
    res.status(200).json({
      message: 'success',
      status: 200,
      data: cars.map((car) => ({
        id: car.id,
        name: car.name,
        image: car.image,
        desc: car.desc,
        licensePlate: car.licensePlate,
        seat: car.carType.seat,
        price: car.carType.price,
      })),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Xử lý logic tìm tuyến xe
export const getCarLine = async (req, res, next) => {
  const { placeFromId, placeToId, date } = req.body;
  try {
    let carInfo = await CarInPlace.findAll({
      where: { placeFromId, placeToId },
      include: [{ model: Car, include: [{ model: CarType }] }],
    });
    let times = await TimePlace.findAll({ where: { placeId: placeFromId } });

    carInfo = await Promise.all(
      carInfo.map(async (carsPlace) => {
        times = await Promise.all(
          // Tính số ghế còn trống của mỗi chuyến theo thời gian.
          times.map(async (time) => {
            const timePart = time.time.split('h');
            const dateTime = `${date} ${timePart[0]}:${timePart[1]}:00`;
            const getTickets = await Ticket.findAndCountAll({
              where: {
                date: dateTime,
                carsPlaceId: carsPlace.id,
              },
            });
            return {
              ...time.toJSON(),
              emptySeat: carsPlace.car.carType.seat - getTickets.count,
            };
          })
        );
        return {
          ...carsPlace.toJSON(),
          times: times.map((time) => ({ time: time.time, emptySeat: time.emptySeat })),
        };
      })
    );

    res.status(200).json({
      message: 'success',
      status: 200,
      data: carInfo.map((item) => ({
        id: item.id,
        carId: item.carId,
        name: item.car.name,
        emptySeat: item.emptySeat,
        desc: item.desc,
        seat: item.car.carType.seat,
        emptySeats: carInfo.emptySeats,
        price: item.car.carType.price,
        times: item.times,
      })),
    });
  } catch (error) {
    next(error);
  }
};

export const setCarLine = async (req, res, next) => {
  const { carId, placeFromId, placeToId, quantity } = req.body;
  try {
    const carLine = await CarInPlace.create({
      carId,
      placeFromId,
      placeToId,
      quantity,
    });
    res.status(200).json({ message: 'success', status: 200, data: carLine });
  } catch (error) {
    next(error);
  }
};
