import "dotenv/config";
import mongoose from "mongoose";
import "../models/home";
import "../models/address";
import "../models/property";
import "../models/agent";
import "../models/company";
import "../models/item";
import "../models/owner";
import "../models/user";

async function connectDb() {
  const uri =
    process.env.NODE_ENV === "test"
      ? process.env.MONGODB_TEST_URI
      : process.env.MONGODB_URI;
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export default connectDb;
