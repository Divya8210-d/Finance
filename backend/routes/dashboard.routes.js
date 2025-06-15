import express from 'express';
import { addexpense,updateexpense,  } from '../controllers/spending.controller.js';
import verify from '../middlewares/auth.middleware.js';
import { givetips } from '../controllers/tips.controller.js';
import { adddebt ,filtereddebts,getDebt,removeDebt,updatedebt } from '../controllers/debt.controller.js';
import { gst , emi,fdmatureamount,creditCardPayoff } from '../controllers/calculator.controller.js';
import { track } from '../controllers/progress.controller.js';
import { saving, spendingtrends, weeklytrend } from '../controllers/insights.controller.js';



const router = express.Router();

router.post("/expenses",verify, addexpense);
router.post("/updateexpenses", verify, updateexpense);
router.post("/tips", verify, givetips);
router.post("/track",verify,track);
router.post("/adddebt",verify, adddebt);
router.post("/getdebt", verify, getDebt);
router.post("/updatedebt", verify, updatedebt);
router.post("/filterdebt", verify, filtereddebts);
router.post("/deletedebt", verify, removeDebt);
router.post("/gst",verify,gst);
router.post("/emi",verify, emi);
router.post("/fd", verify, fdmatureamount);
router.post("/credit", verify, creditCardPayoff);
router.post("/saving",verify, saving);
router.post("/spendingtrends", verify, spendingtrends);
router.post("/weeklytrend", verify, weeklytrend);





export default router;
