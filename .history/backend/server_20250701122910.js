import express from 'express'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { ConnectDb } from './db/ConnectDb.js'
import authRoutes from './routes/auth.route.js'

dotenv.config()

const app= express()
const PORT= process.env.PORT || 5005

const __filename= fileURLToPath(import.meta.url)
const __dirname= path.dirname(__filename)

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)

ConnectDb()

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("/*", (_req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, ()=>{
    console.log(`server runns on: ${PORT}`)
})

