require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");

const errorHandler = require("./middleware/errorMiddleware");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "DropNote API is running 🚀",
  });
});

// Error handling middleware
app.use(errorHandler);

// Start the server only after MongoDB connects
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`DropNote server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(
      "Failed to start DropNote server:",
      error.message
    );

    process.exit(1);
  }
};

startServer();