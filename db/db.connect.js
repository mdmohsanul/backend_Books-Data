const mongoose = require("mongoose");
require("dotenv").config();

const mongo_Url = process.env.MONGODB_URL;

const initializeDb = async () => {
  try {
    const connection = await mongoose.connect(mongo_Url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (connection) {
      console.log("Database connected");
    }
  } catch (error) {
    console.log("Failed to connect database ", error);
  }
};

module.exports = { initializeDb };
