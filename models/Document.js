const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: Object, // Quill Delta format
    default: {},
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  collaborators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true }); // ⏱ adds createdAt and updatedAt fields automatically

module.exports = mongoose.model("Document", DocumentSchema);
