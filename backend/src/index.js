require("dotenv").config();
const express = require("express");
const app= express();
const PORT= process.env.PORT || 8000;


app.get("/api/test", (req, res) =>{
  res.send("Test successfull");
})



app.listen(PORT, () => console.log(`Sever Started at PORT:${PORT}`));
