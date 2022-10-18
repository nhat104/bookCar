import express from 'express';
import { allTicket, buyTicket, rateTicket } from '../controllers/ticket.js';

const router = express.Router();

router.get('/all-ticket', allTicket);
router.post('/buy-ticket', buyTicket);
router.post('/rate-ticket', rateTicket);

export default router;
