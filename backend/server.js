require("dotenv").config();
const express = require("express");
const connectDb = require("./utils/db");
const userRouter = require("./routes/user-route");
const salesRouter = require("./routes/sales-route");
const cors = require("cors");

// creating an instance of the express
const app = express();

// configure the database
connectDb();

// adding middlewares
app.use(express.json());
app.use(cors());
app.use("/api/user", userRouter);
app.use("/api/sales", salesRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server is running");
});
