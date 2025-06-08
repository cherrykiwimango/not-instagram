import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./models/db.js";
import cors from 'cors';
import { authRouter, postsRouter } from "./routers/auth.router.js";
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();
const app = express();
cloudinary.config({
  cloud_name: 'dltdkjlbk',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use('/auth', authRouter);
app.use('/api', postsRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is live at http://localhost:${PORT}`,);
})