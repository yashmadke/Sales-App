const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

function connectDb() {
  mongoose.connect(URI);

  mongoose.connection.on("connected", () => {
    console.log("Connection established with database!");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Error occured while connecting to database", err);
  });
}

module.exports = connectDb;
