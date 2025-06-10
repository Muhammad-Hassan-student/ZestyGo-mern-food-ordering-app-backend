import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string).then(() => console.log("Connected to database")
        );
    } catch (error) {
        console.log('MONGO DB ERROR: ', error);
    }
}