import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRoutes from './routes/authRoute.js'
import Post from './models/postModel.js'
import mongoose from "mongoose"
import cors from "cors"

dotenv.config()

//database config 
connectDB()

const app = express()

//middleware
app.use(cors())
app.use(express.json())

// Generate dummy data
const generateDummyData = () => {
    const dummyData = [];
    for (let i = 0; i < 1000; i++) {
      const randomImageNum = Math.floor(Math.random() * 70) + 1;
      dummyData.push({
        title: `Post ${i + 1}`,
        content: `https://dummyjson.com/quotes/random`,
        createdAt: new Date(),
        imageUrl: `https://i.pravatar.cc/600?img=${randomImageNum}`,
      });
    }
    return dummyData;
  };

  //save dummy data
  const saveDummyData = async () => {
    try {
      const dummyData = generateDummyData();
      await Post.insertMany(dummyData);
      console.log("Dummy data added successfully.");
    } catch (error) {
      console.error("Error adding dummy data:", error);
    } finally {
      mongoose.disconnect();
    }
  };
  
//   saveDummyData()

//routes
app.use('/api/v1/auth', authRoutes)

// Route to fetch paginated posts

app.get("/api/posts", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;
    try {
      const posts = await Post.find().skip(skip).limit(pageSize).exec();
      res.json(posts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

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