import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import connectDB from './db/connect.js';



connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

