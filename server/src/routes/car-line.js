import express from 'express';
import { getCarLine, setCarLine } from '../controllers/car.js';

const router = express.Router();

router.post('/get-car', getCarLine);
router.post('/set-car', setCarLine);

export default router;
