import express from 'express';
import { buyTicket } from '../controllers/ticket.js';

const router = express.Router();

router.post('/buy-ticket', buyTicket);

export default router;
