import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

await mongoose.connect(
  `mongodb+srv://public:ApximD4MGjekimWC@cscc01-splitease.cza76vh.mongodb.net/SplitEaseDB?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);


const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to MongoDB"));

export default mongoose;
