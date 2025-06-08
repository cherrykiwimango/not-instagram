import mongoose from "mongoose"

export  const connectDB = async ()=>{
  try
  {const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log("Mongo DB connected successfully: ", conn.connection.name);}
  catch(error){
    console.error("Error in connecting to DB: ", error);
    process.exit(1);
  }
}