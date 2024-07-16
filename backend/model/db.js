import mongoose from "mongoose";

const connectDb = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

export default connectDb;
