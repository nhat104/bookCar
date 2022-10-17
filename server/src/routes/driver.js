import express from 'express';
import { deleteDriver, editDriver, getDrivers } from '../controllers/driver.js';

const router = express.Router();

router.get('/drivers', getDrivers);

router.put('/driver/:id', editDriver);

router.delete('/driver/:id', deleteDriver);

export default router;
