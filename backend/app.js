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



export default app





