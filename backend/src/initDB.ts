import mongoose from "mongoose";

module.exports = () => {
  const MONGODB_URI = String(process.env.MONGODB_URI);
  const mongooseConnect = async () => {
    try {
      await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        // useCreateIndex: true, DON'T USE THIS: Doesn't allow unique email addresses.
        useUnifiedTopology: true,
      });
      console.log("Mongodb connected....");
    } catch (err) {
      console.log(err);
      console.log("(Initial) MongoDB Connection Failed: " + MONGODB_URI);
    }
  };
  mongooseConnect();

  const connection = mongoose.connection;

  connection.on("connected", () => {
    console.log("Mongoose connected to db...");
  });

  connection.on("error", (err) => {
    console.log(err.message);
  });

  connection.on("disconnected", () => {
    console.log("Mongoose connection is disconnected...");
  });

  process.on("SIGINT", () => {
    connection.close(() => {
      console.log(
        "Mongoose connection is disconnected due to app termination..."
      );
      process.exit(0);
    });
  });
};
