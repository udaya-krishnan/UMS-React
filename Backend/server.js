const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("../Backend/router/userRouter");
const adminRouter=require('../Backend/router/adminRouter')
const connectDB = require("./database/database"); 
require('dotenv').config()
app.use(express.json());
app.use(cors());
connectDB()


app.use("/", userRouter);
app.use("/admin", adminRouter);

app.listen(5555, () => {
  console.log("server running http://localhost:5555/");
});
