import express from 'express';

import verify from '../middlewares/auth.middleware.js';
import { alltransactions, cashpayment, createorder,  onlinesavepayment,  verifyandsavepayment } from '../controllers/transaction.controller.js';

const router = express.Router();

router.post("/createorder", createorder);
router.post("/verifypay", verify, verifyandsavepayment);
router.post("/transactions", verify, alltransactions);
router.post("/cashpayment", verify, cashpayment);
router.post("/onlinesavepayment", verify, onlinesavepayment);
export default router;
