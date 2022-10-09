import express from 'express';
import { reportByDriver, reportByPlace } from '../controllers/ticket.js';
import { reportByDate, reportByMonth, reportByYear } from '../controllers/ticket.js';

const router = express.Router();

router.post('/date', reportByDate);
router.post('/month', reportByMonth);
router.post('/year', reportByYear);
router.post('/driver', reportByDriver);
router.post('/place', reportByPlace);

export default router;
