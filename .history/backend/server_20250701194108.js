import express from 'express'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import cors from 'cors'
import { ConnectDb } from './db/ConnectDb.js'
import authRoutes from './routes/auth.route.js'

dotenv.config()

const app= express()
const PORT= process.env.PORT || 5005

const allowedOrigins = [
	"http://localhost:5173",
	"https://advanced-auth1.netlify.app"
  ];

  app.use(cors({
	origin: function(origin, callback){
	  // allow requests with no origin like mobile apps or curl requests
	  if(!origin) return callback(null, true);
	  if(allowedOrigins.indexOf(origin) === -1){
		const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
		return callback(new Error(msg), false);
	  }
	  return callback(null, true);
	},
	credentials: true,
  }));
  
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)



app.listen(PORT, ()=>{
	ConnectDb()
    console.log(`server runns on: ${PORT}`)
})

