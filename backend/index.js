import dotenv from 'dotenv';
dotenv.config();
//DOTENV IS LIYE ADD
import app from "./app.js";
import cookieParser from "cookie-parser";
import express from 'express';
import { register,login,logout, deleteaccount, profilefetch, edit } from './controllers/user.controller.js';

import { upload } from './middlewares/multer.middleware.js';

 import connectDB from "./db/connect.js";
import verify from './middlewares/auth.middleware.js';
import { addexpense, updateexpense } from "./controllers/spending.controller.js";
import { givetips } from "./controllers/tips.controller.js";
import { track } from "./controllers/progress.controller.js";
import { createorder, recenttransactions, verifyandsavepayment } from "./controllers/transaction.controller.js";
import { adddebt, getDebt, updatedebt } from "./controllers/debt.controller.js";
import { creditCardPayoff, emi, fdmatureamount, gst } from "./controllers/calculator.controller.js";
import { saving, spendingtrends, weeklytrend } from "./controllers/insights.controller.js";

connectDB()
.then(() => {
    app.listen(5000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})




//endpoints 
app.post("/api/v1/users/register",upload.fields([
    {
        name: "profile",
        maxCount: 1
    }]),register
)


app.post("/api/v1/users/login",login
)


app.post("/api/v1/users/logout",verify,logout
)

app.post("/api/v1/users/delete",verify, deleteaccount
)

app.get("/api/v1/users/profile",verify, profilefetch
)

app.post("/api/v1/users/expenses",verify, addexpense
)
app.post("/api/v1/users/updateexpenses",verify, updateexpense
)
app.post("/api/v1/users/edit",verify,upload.fields([
    {
        name: "profile",
        maxCount: 1
    }]), edit
)
app.post("/api/v1/users/tips",verify, givetips
)
app.post("/api/v1/users/track",verify, track
)



app.post("/api/v1/createorder",verify, createorder
)
app.post("/api/v1/verifypay",verify, verifyandsavepayment
)
app.post("/api/v1/todaytransaction",verify, recenttransactions
)
 


app.post("/api/v1/adddebt",verify, adddebt
)
app.post("/api/v1/getdebt",verify, getDebt
)
app.post("/api/v1/updatedebt",verify, updatedebt
)





app.post("/api/v1/gst",verify, gst
)
app.post("/api/v1/emi",verify, emi
)
app.post("/api/v1/fd",verify, fdmatureamount
)
app.post("/api/v1/credit",verify, creditCardPayoff
)


app.post("/api/v1/saving",verify, saving
)
app.post("/api/v1/spendingtrends",verify, spendingtrends
)

app.post("/api/v1/weeklytrend",verify, weeklytrend
)









//will handle google signin in forntend.