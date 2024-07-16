import express from 'express';
import dotenv from "dotenv";
import AuthRoute from "./routes/auth.routes.js"
import UserRoute from "./routes/user.routes.js"
import PostRoute from "./routes/post.routes.js"
import NotificationRoute from "./routes/notification.routes.js"

import cors from "cors";


import connectDb from "./model/db.js"
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});


const app = express();

const PORT=process.env.PORT || 5001;

const corsOptions={
    origin: "http://localhost:3000",
}


app.use(express.json({ limit: "5mb" })); // to parse req.body
// limit shouldn't be too high to prevent DOS
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser())
app.use(cors(corsOptions))

app.use("/auth",AuthRoute)
app.use("/users",UserRoute);
app.use("/posts",PostRoute);
app.use("/notifications",NotificationRoute);


app.get("/",(req,res)=>{
    res.status(200).json({msg:"HII"})
})



app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
    connectDb();
})