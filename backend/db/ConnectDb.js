import mongoose from 'mongoose'

export const ConnectDb= async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGDODB_URI)
        console.log(`mongodb connected on:${conn.connection.host}`)
    } catch (error) {
        console.log("Error connection to mongodb", error.message)
        process.exit(1)
    }

}