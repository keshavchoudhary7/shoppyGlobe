import express from 'express'
import { 
    registerController, 
    loginController, 
    testController, 
    forgotPasswordController,
    updateUserProfileController
    } from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

//router obj
const router = express.Router();

// routing 
// register || method post 
router.post('/register',registerController)

// login || method post
router.post('/login',loginController)

//forgot password
router.post('/forgot-password',forgotPasswordController)


//test routes

router.get('/test',requireSignIn, isAdmin, testController)

//protected route user
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})

//protected route admin
router.get('/admin-auth',requireSignIn, isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})

//update user profile

router.put('/profile',requireSignIn, updateUserProfileController)
export default router;