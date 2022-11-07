import express from 'express';
import { allTicket, buyTicket, cancelTicket, rateTicket } from '../controllers/ticket.js';

const router = express.Router();

router.post('/all-ticket', allTicket);
router.post('/buy-ticket', buyTicket);
router.post('/rate-ticket', rateTicket);
router.post('/cancel-ticket', cancelTicket);

export default router;
