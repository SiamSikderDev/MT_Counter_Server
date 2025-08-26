import mongoose from "mongoose";

const DB = (URI) => {
mongoose
    .connect(URI)
    .then(() => {
        console.log('MongoDB connected successfully!')
    })
    .catch((e) => {
        console.log(`MongoDB connection failed: `, e)
    })
}

export default DB;