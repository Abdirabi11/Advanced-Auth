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
const __dirname= path.resolve()

const allowedOrigins = [
	"http://localhost:5173",
	"http://localhost:5005",
	// "https://your-frontend-production-domain.com"
]

app.use(cors({
	origin:  function (origin,callback){
		if(!origin){
			return callback(null, true)
		}
		if (allowedOrigins.indexOf(origin) === -1) {
			const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
			return callback(new Error(msg), false);
		}
		  return callback(null, true);
	},
	credentials: true,
}))

// app.use(cors ({origin: "http://localhost:5173", credentials: true }))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "/frontend/dist")))

    app.get('/*\w', (req, res)=>{
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}

app.listen(PORT, ()=>{
	ConnectDb()
    console.log(`server runns on: ${PORT}`)
})

