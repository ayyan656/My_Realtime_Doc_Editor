const mongoose = require("mongoose");


const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Exit the process if connection fails
  }
};

// Optional: Connection Events
mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected");
});

module.exports = connectDb;
