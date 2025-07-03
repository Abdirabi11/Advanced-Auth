import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import cookieParser from "cookie-parser"
import cors from 'cors'
import { ConnectDb } from './db/ConnectDb.js'
import authRoutes from './routes/auth.route.js'

dotenv.config()

const app= express()
const PORT= process.env.PORT || 5005

const allowedOrigins = [
	
	"https://advanced-auth1.netlify.app"
  ];

app.use(cors(origin:"http://localhost:5173",")credentials: true,);

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)



app.listen(PORT, ()=>{
	ConnectDb()
    console.log(`server runns on: ${PORT}`)
})

