import express from 'express';

import verify from '../middlewares/auth.middleware.js';
import { alltransactions, createorder, recenttransactions, verifyandsavepayment } from '../controllers/transaction.controller.js';

const router = express.Router();

router.post("/createorder", createorder);
router.post("/verifypay", verify, verifyandsavepayment);
router.post("/transactions", verify, alltransactions);

export default router;
