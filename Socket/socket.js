const { Server } = require("socket.io");

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // 🔁 Replace this in production
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 New client connected:", socket.id);

    // 🎯 Join document room
    socket.on("join-document", (documentId) => {
      if (documentId) {
        socket.join(documentId);
        console.log(`📄 User ${socket.id} joined room: ${documentId}`);
      }
    });

    // 📝 Listen for changes and broadcast
    socket.on("send-changes", ({ documentId, delta }) => {
      if (documentId && delta) {
        console.log(`✏️ Broadcasting changes for document: ${documentId}`);
        socket.to(documentId).emit("receive-changes", delta);
      }
    });

    // 🔌 Disconnect event
    socket.on("disconnect", (reason) => {
      console.log(`🔴 Client disconnected: ${socket.id} (${reason})`);
    });

    // ⚠️ Error handling
    socket.on("error", (err) => {
      console.error("❌ Socket error:", err);
    });

    // 🔁 Optional reconnect logic (from client)
    socket.on("reconnect_attempt", () => {
      console.log(`🔁 Reconnection attempt by ${socket.id}`);
    });
  });
};

module.exports = initSocket;
