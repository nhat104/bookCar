import express from 'express';
import { getPlace } from '../controllers/place.js';

const router = express.Router();

router.post('/get-place', getPlace);

export default router;
