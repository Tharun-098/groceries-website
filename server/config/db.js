import mongoose from "mongoose";

const connectDatabase = async () => {
    try {
        mongoose.connection.on("connected", () => console.log("Database Connected"))
        //const uri = 'mongodb+srv://tharun:tharun123@cluster0.gjhs5os.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
        await mongoose.connect(process.env.URL);

    } catch (error) {
        console.log(error.message);
    }
}
export default connectDatabase
