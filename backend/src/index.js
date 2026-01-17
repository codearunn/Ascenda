require("dotenv").config();
const express = require("express");
const app= express();
const PORT= process.env.PORT || 8000;
const cookieParser = require("cookie-parser");

//mongoDB connection
const connectionToDB= require("./config/connectDB");
const mongoURI= process.env.MONGO_URI;
connectionToDB(mongoURI)
  .then(() => console.log("DB connected"))
  .catch((e) => console.log(e));

//Middlewares
app.use(express.json());
app.use(cookieParser());

//ROUTES
const userRoute= require("./routes/user");

app.use("/api/user", userRoute);



app.listen(PORT, () => console.log(`Sever Started at PORT:${PORT}`));
