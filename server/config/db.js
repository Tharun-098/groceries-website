import mongoose from "mongoose";

const connectDatabase = async () => {
    try {
        mongoose.connection.on("connected", () => console.log("Database Connected"))
        const uri = 'mongodb+srv://Tharun:Tharun123@cluster0.jgumop3.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0';
        await mongoose.connect(uri);

    } catch (error) {
        console.log(error.message);
    }
}
export default connectDatabase
