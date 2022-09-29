import City from '../models/city.js';
import Place from '../models/place.js';

export const getPlace = async (req, res, next) => {
  const { city: cityName } = req.body;
  try {
    const city = await City.findOne({ where: { name: cityName } });
    const place = await Place.findAll({ where: { cityId: city.id } });
    res.status(200).json({
      message: 'success',
      status: 200,
      data: place.map((item) => ({ id: item.id, name: item.name })),
    });
  } catch (error) {
    next(error);
  }
};
