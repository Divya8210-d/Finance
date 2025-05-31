
import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import crypto from "crypto"



const app = express();

//YEH HUM LOG KARTE TAKI USI ORIGIN KO ALLOW KARE HAMARE BACVKEND KE SSATH DATA SHARE OR GET KARNE KE LIYE
app.use(cors({  origin:'http://localhost:5173',
  credentials: true}
))




//YEH SAB MIDDLEWARE HAI CHECK LAGANE KE LIYE
app.use(express.json())
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(bodyParser.json());

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});



export default app





