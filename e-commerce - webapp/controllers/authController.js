import { comparePasswords, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";


export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    //validation
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "phone Number is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }

    // user
    const existingUser = await userModel.findOne({ email });
    //exixting user
    if (existingUser) {
      return res.status(200).send({ 
        success: false, 
        message: "Email already exists" 
    });
    }

    // register user

    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer
    }).save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).send({
      success: false,
      message: "Registration error",
      error,
    });
  }
};

// POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;


    // validation email & password
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password!",
      });
    }
    // check user 
    const user = await userModel.findOne({email})


    // validation user 
    if(!user){
    return res.status(404).send
    ({ 
        success: false, 
        message: "User not found" 
    })
    }
    const match = await comparePasswords(password, user.password)

    if(!match){
        return res.status(200).send
        ({
            success: false,
            message: "Incorrect password"
        })
    }

    //create token

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { 
        expiresIn: "1h" 
    });
    res.status(200).send({
        success: true,
        message: "Login successful",
        user: {
            _id: user._id,
            name: user.name,
            // password : user.password, 
            email: user.email,
            phone: user.phone,
            address: user.address,
            role:user.role
        },
        token
    })

  } catch (error) {
    console.error(error);
    res.status(500).send({ 
    success: false, 
    message: "Login error", 
    error 
    });
  }
};

//forgotPasswordController

export const forgotPasswordController = async (req,res)=>{
  try{
    const {email,answer,newPassword} = req.body;
    if(!email){
      return res.status(400).send({ message: "Email is Required" });
    }
    if(!answer){
      return res.status(400).send({ message: "Question is Required" });
    }
    if(!newPassword){
      return res.status(400).send({ message: "New Password is Required" });
    }
    //check 
    const user = await userModel.findOne({email,answer})
    if(!user){
      return res.status(404).send({ 
        success:false,
        message: "User not found"
        
      });
    }
   
    // update password
    const hashedPassword = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id,{password:hashedPassword})
    res.status(200).send({ 
      success:true,
      message: "Password updated successfully"
      
    });
  }catch(error){
    console.error(error);
    res.status(500).send({ 
      success:false,
      message: "Forgot Password Error",
      error
    });
  }
}

// test controller 

export const testController = async (req, res) => {
    try {
        res.send("Protected Routes");
      } catch (error) {
        console.log(error);
        res.send({ error });
      }
};



export const updateUserProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;  // Destructure from req.body (not as an array)
    
    const user = await userModel.findById(req.user._id);
    
    // Validate password length
    if (password && password.length < 6) {
      return res.json({ error: 'Password must be at least 6 characters long' });
    }

    // Hash password if it's provided
    const hashedPassword = password ? await hashPassword(password) : undefined;

    // Update user profile
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: 'User profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error updating user profile',
      error,
    });
  }
};
