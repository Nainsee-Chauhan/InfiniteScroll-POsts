import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRoutes from './routes/authRoute.js'
import cors from "cors"

dotenv.config()

//database config
connectDB()

const app = express()

//middleware
app.use(cors())
app.use(express.json())


//routes
app.use('/api/v1/auth', authRoutes)

//rest api's
app.get('/', (req, res) => {
    res.send("<h1>Welcome</h1>")
})

//PORT
const PORT = process.env.PORT || 8080

//run app
app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`)
})