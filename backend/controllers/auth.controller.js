import UserModel from "../models/user.model.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req, res)=>{
  try {
    const {name, email, password} = req.body;
    const user = await UserModel.findOne({email});
    if(user){
      return res.status(409).json({success:false, message: "User already exists"});
    }
    const newUser = new UserModel({name, email, password});
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    res.status(200).json({success: true, message: "User created successfully"});
  } catch (error) {
    console.log("Error in signing up: ", error);
    res.status(500).json({success:false, message: "Internal Server Error"}); 
  }
}

export const login = async(req, res)=>{
  try {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email});
    if(!user){
      return res.status(403).json({success: false, message: "Authentication failed, email or password is wrong"});
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if(!isPassEqual){
      return res.status(403).json({success: false, message: "Authentication failed, email or password is wrong"});
    }
    const jwtToken = jwt.sign(
      {email: user.email, _id: user._id},
      process.env.JWT_SECRET,
      {expiresIn: '24h'},
    );
    res.status(200).json({
      success: true, 
      message: "User logged in successfully",
      jwtToken,
      email,
      name: user.name,
    });
  } catch (error) {
    console.log("Error in logging in: ", error);
    res.status(500).json({success: false, message: "Internal Server Error"});
  }
}