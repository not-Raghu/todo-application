import mongoose from 'mongoose';

export const db_connection = async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log("database is running");

    }catch(err){
        console.log("error connecting database: " , err);
    }
}
