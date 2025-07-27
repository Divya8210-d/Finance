import express from 'express';
import { addexpense,updateexpense,  } from '../controllers/spending.controller.js';
import verify from '../middlewares/auth.middleware.js';
import { givetips } from '../controllers/tips.controller.js';
import { adddebt ,filtereddebts,getDebt,removeDebt,updatedebt } from '../controllers/debt.controller.js';
import { gst , emi,fdmatureamount,creditCardPayoff } from '../controllers/calculator.controller.js';
import { track } from '../controllers/progress.controller.js';
import { budgetinsight, budgetprediction, cashflow, saving, spendingtrends, weeklytrend } from '../controllers/insights.controller.js';
import { getBudgetmonthly, setbudget } from '../controllers/budget.controller.js';
import { transacsuggestion } from '../controllers/transaction.controller.js';
import { fetchcrypto, fetchgold, fetchmutualfunds, fetchstocks, savecrypto, savegold, savemutualfunds, savestocks } from '../controllers/tracker.controller.js';



const router = express.Router();

router.post("/expenses",verify, addexpense);
router.post("/updateexpenses", verify, updateexpense);
router.post("/setbudget", verify, setbudget);
router.post("/getbudgetmonthly", verify, getBudgetmonthly);
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
router.post("/cashflow",verify,cashflow)
router.post("/futureprediction",verify,budgetprediction)
router.post("/budgetinsight",verify,budgetinsight);
router.post("/suggestions",verify,transacsuggestion);


router.post("/savemutualfunds",verify,savemutualfunds)
router.post("/savestocks",verify,savestocks)
router.post("/savegold",verify,savegold);
router.post("/savecrypto",verify,savecrypto);
router.post("/mutualfunds",verify,fetchmutualfunds)
router.post("/stocks",verify,fetchstocks)
router.post("/golds",verify,fetchgold);
router.post("/crypto",verify,fetchcrypto);




export default router;
