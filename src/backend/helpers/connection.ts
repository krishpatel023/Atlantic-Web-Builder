import mongoose from "mongoose";

//MongoDB CONNECTION
export const connect = async () => {
  if (mongoose.connections[0].readyState) {
    return true;
  }
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("CONNECTED --- MongoDB");
      return true;
    } else {
      throw Error("MongoDB URI not found");
    }
  } catch (error) {
    console.log(error);
  }
};

// mongoose.connection.on("disconnected", () => {
//   console.log("DISCONNECTED --- MongoDB");
//   connect();
// });
