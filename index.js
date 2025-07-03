const express = require("express");
const cors = require("cors");
const http = require("http");
require("dotenv").config();

const connectDb = require("./Config/db");
const documentRoutes = require("./routes/documentRoutes");
const authRoutes = require("./routes/authRoutes");
const initSocket = require("./Socket/socket");
const sendShareEmail = require('./utils/mailer');

const app = express();

// ✅ Create HTTP server
const server = http.createServer(app);

// ✅ Connect to MongoDB
connectDb();

// Test email on server start
// sendShareEmail('naveedayyan89@gmail.com', 'demoDocId12345');
// ✅ Middlewares
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000", // React app origin
  credentials: true
}));

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/docs", documentRoutes);

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("Google Docs Clone Backend is running 🚀");
});

// ✅ Initialize WebSocket with HTTP server AFTER routes
initSocket(server);

// ✅ Start server (not `app.listen`)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
