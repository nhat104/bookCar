import CarInPlace from '../models/car-in-place.js';
import CarType from '../models/car-type.js';
import Car from '../models/car.js';

export const getCarLine = async (req, res, next) => {
  const { placeFromId, placeToId } = req.body;
  try {
    const carInfo = await CarInPlace.findAll({
      where: { placeFromId, placeToId },
      include: [{ model: Car, include: [{ model: CarType }] }],
    });
    res.status(200).json({
      message: 'success',
      status: 200,
      data: carInfo.map((item) => ({
        id: item.id,
        placeFromId: item.placeFromId,
        placeToId: item.placeToId,
        carId: item.carId,
        name: item.car.name,
        seat: item.car.carType.seat,
        price: item.car.carType.price,
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
