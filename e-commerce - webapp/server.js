import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './db.js';
import authRoutes from './routes/authRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cors from 'cors'

//configure env
dotenv.config();

// databse config 

connectDB();

// rest obj 
const app = express()

// middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

// routes 
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/product', productRoutes)

// rest api 

app.get('/',(req,res)=>{
    res.send({
        message: '<h1>HELLO FROM MERN STACK PROJECT</h1>'
        
    })
})

// port 
const PORT = process.env.PORT || 8080;


// run listen 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.bgCyan.white);
})