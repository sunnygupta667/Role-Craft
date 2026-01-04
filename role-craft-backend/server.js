// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
// import portfolioRoutes from "./routes/portfolioRoutes.js";
// import uploadRoutes from "./routes/uploadRoutes.js";
// import { errorHandler, notFound } from "./middleware/errorHandler.js";

// // Load environment variables
// dotenv.config();

// // Connect to database
// connectDB();


// // Initialize express app
// const app = express();

// // Middleware
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL || "https://role-craft.vercel.app",
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "Multi-Portfolio API is running",
//     version: "1.0.0",
//   });
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/portfolios", portfolioRoutes);
// app.use("/api/upload", uploadRoutes);

// // Error handling
// app.use(notFound);
// app.use(errorHandler);

// // Start server
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(
//     `🚀 Server running in ${
//       process.env.NODE_ENV || "development"
//     } mode on port ${PORT}`
//   );
// });


import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize express app
const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://role-craft.vercel.app",
        process.env.FRONTEND_URL,
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: false, // YOU ARE USING JWT HEADER, NOT COOKIES
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ REQUIRED
app.options("*", cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Multi-Portfolio API is running",
    version: "1.0.0",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/portfolios", portfolioRoutes);
app.use("/api/upload", uploadRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${PORT}`
  );
});