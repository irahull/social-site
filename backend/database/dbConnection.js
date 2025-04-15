const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URL )
      .then(() => console.log("Connection Sucessful"))
      .catch(() => console.log("No Connection"));
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnection;