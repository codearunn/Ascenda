const mongoose= require("mongoose");

async function connectionToDB(url) {
  await mongoose.connect(url);
}

module.exports= connectionToDB;