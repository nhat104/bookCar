import express from 'express';
import { getCarLine, getCars, setCarLine } from '../controllers/car.js';

const router = express.Router();

router.get('/cars', getCars);
router.post('/get-car', getCarLine);
router.post('/set-car', setCarLine);

export default router;
