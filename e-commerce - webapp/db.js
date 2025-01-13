import mongoose from "mongoose";
import colors from 'colors'
// Connect to MongoDB

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to mongoDB Database ${conn.connection.host}`.bgMagenta.white)
    }catch(err){
        console.log(`Error in mongoDB ${err}`.bgRed.white)
    }
};

export default connectDB;
