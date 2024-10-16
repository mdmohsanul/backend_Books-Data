const mongoose = require("mongoose");
require("dotenv").config();

const mongo_Url = process.env.MONGODB_URL;

const initializeDb = () => {
  try {
    const connection = mongoose.connect(mongo_Url);
    if (connection) {
      console.log("Database connected");
    }
  } catch (error) {
    console.log("Failed to connect database ", error);
  }
};

module.exports = { initializeDb };
