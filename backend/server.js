require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db")

const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');

const app = express();

// Connect Database
connectDB();

// Add this before your CORS middleware for debugging
app.use((req, res, next) => {
    console.log('Origin:', req.headers.origin);
    console.log('CLIENT_URL:', process.env.CLIENT_URL);
    next();
});

//Middleware to handle Cors
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
        credentials: true, // Add this if you're sending cookies/auth tokens
        preflightContinue: false,
        optionsSuccessStatus: 200
    })
);

//Middleware
app.use(express.json());

// Health check route (good practice)
app.get('/health', (req, res) => {
  res.status(200).json({ 
    message: 'CareerScript API is running!',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

app.use('/uploads', express.static('uploads', {
  setHeaders: (res) => {
    res.set('Access-Control-Allow-Origin', '*');
  }
}));

//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running at port ${PORT}`);
});