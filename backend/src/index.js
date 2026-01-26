import dotenv from "dotenv";
dotenv.config();
import { app } from './app.js';
import connectDB from "./db/index.js";

connectDB()

app.get('/',(req,res)=>{
    res.send('server is Live!');
})
