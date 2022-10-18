import express from 'express';
import {
  reportByCustomer,
  reportByDriver,
  reportByDriverRate,
  reportByPlace,
} from '../controllers/ticket.js';
import { reportByDate, reportByMonth, reportByYear } from '../controllers/ticket.js';

const router = express.Router();

router.post('/date', reportByDate);
router.post('/month', reportByMonth);
router.post('/year', reportByYear);
router.post('/driver', reportByDriver);
router.post('/place', reportByPlace);
router.post('/driver-rate', reportByDriverRate);
router.get('/customer', reportByCustomer);

export default router;
