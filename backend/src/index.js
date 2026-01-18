import dotenv from "dotenv";
dotenv.config();
import { app } from './app.js';

const port=process.env.PORT||3000;

app.listen(port, ()=>{
    console.log(`🚀 Server running at http://localhost:${port}`);
})

app.get('/',(req,res)=>{
    res.send('server is Live!');
})
