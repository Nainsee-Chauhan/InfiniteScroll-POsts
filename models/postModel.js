import mongoose from "mongoose";

// Define the Post schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,
    required: true,
    },
  
});

// Create a Post model based on the schema
 // Specify collection name here

export default mongoose.model('Post', postSchema)