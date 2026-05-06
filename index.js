import express from 'express'
import mongoose from 'mongoose'
import studentRouter from './routers/studentRouter.js';
import userRouter from './routers/userRouter.js';
import authenticate from './middlewares/authenticate.js';
import dns from "node:dns";
import productRouter from './routers/productRouter.js';
import dotenv from "Dotenv"

dotenv.config()





dns.setServers(["1.1.1.1", "8.8.8.8"]);

const mongoDBURI = process.env.MONGO_URI

mongoose.connect(mongoDBURI).then(
    ()=>{
        console.log("Connected to mongodb successfully")
    }
)

const app = express()

app.use(express.json())
app.use(authenticate)

app.use("/student" , studentRouter)
app.use("/users" ,  userRouter)
app.use("/products" , productRouter)




app.listen(3000, ()=> {
    console.log("Server started successfully")
    }
)
