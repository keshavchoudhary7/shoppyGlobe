import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js';
//protected route token base

export const requireSignIn = async (req,res,next)=>{
    try {
        const decode = JWT.verify(
            req.headers.authorization, 
            process.env.JWT_SECRET
        );
        req.user = decode;
        next();
    }catch(error){
        console.log(error)
    }
};

// admin access 
export const isAdmin = async (req, res, next) => {
    try {
      if (!req.user || !req.user._id) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized! Invalid user token.",
        });
      }
  
      const user = await userModel.findById(req.user._id);
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found.",
        });
      }
  
      if (user.role !== 1) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized! Access denied.",
        });
      }
  
      next();
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in admin middleware",
      });
    }
  };
  