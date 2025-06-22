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

const allowedOrigins = [
    'http://localhost:5173',
    'https://career-script.vercel.app',
    // Add pattern for Vercel preview deployments
    /^https:\/\/career-script.*\.vercel\.app$/
];

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (mobile apps, Postman, etc.)
            if (!origin) return callback(null, true);
            
            // Check if origin matches any allowed pattern
            const isAllowed = allowedOrigins.some(allowed => {
                if (typeof allowed === 'string') {
                    return allowed === origin;
                } else if (allowed instanceof RegExp) {
                    return allowed.test(origin);
                }
                return false;
            });
            
            if (isAllowed) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
        credentials: true
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