// db.js
const mongoose = require('mongoose');
console.log("inside db file")
const connectDB = async () => {
console.log("inside db file")
try {
    const conn = await mongoose.connect('mongodb://localhost:27017/nodeTask', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
