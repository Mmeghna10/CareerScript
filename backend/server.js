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

// Define allowed origins
const allowedOrigins = [
    process.env.CLIENT_URL || "http://localhost:5173",
    "https://career-script.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173"
];

// Add dynamic Vercel preview URLs
const isDevelopment = process.env.NODE_ENV !== 'production';

// CORS configuration with dynamic origin checking
const corsOptions = {
    origin: function (origin, callback) {
        console.log('CORS - Request origin:', origin);
        
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Check if origin is in allowed list
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        
        // In development, allow any localhost
        if (isDevelopment && origin.includes('localhost')) {
            return callback(null, true);
        }
        
        // Allow Vercel preview URLs (they follow a specific pattern)
        if (origin.includes('vercel.app') && origin.includes('meghnas-projects')) {
            console.log('CORS - Allowing Vercel preview URL:', origin);
            return callback(null, true);
        }
        
        // More flexible Vercel pattern matching
        if (origin.match(/^https:\/\/career-script.*\.vercel\.app$/)) {
            console.log('CORS - Allowing Vercel deployment URL:', origin);
            return callback(null, true);
        }
        
        console.log('CORS - Rejected origin:', origin);
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
        "Content-Type", 
        "Authorization", 
        "X-Requested-With",
        "Accept",
        "Origin"
    ],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200,
    maxAge: 86400 // Cache preflight response for 24 hours
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Additional CORS headers for extra compatibility
app.use((req, res, next) => {
    const origin = req.headers.origin;
    
    // Set CORS headers manually as backup
    if (origin && (
        allowedOrigins.includes(origin) || 
        origin.includes('vercel.app') ||
        (isDevelopment && origin.includes('localhost'))
    )) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Max-Age', '86400');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    next();
});

// Middleware
app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ 
        message: 'CareerScript API is running!',
        timestamp: new Date().toISOString(),
        cors: {
            allowedOrigins: allowedOrigins,
            environment: process.env.NODE_ENV || 'development'
        }
    });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

// Static files with CORS headers
app.use('/uploads', express.static('uploads', {
    setHeaders: (res, path, stat) => {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
    }
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📁 Static files served from: ${path.join(__dirname, 'uploads')}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔒 CORS allowed origins:`, allowedOrigins);
    console.log(`🔧 Dynamic Vercel URLs: ${isDevelopment ? 'Enabled' : 'Pattern matching enabled'}`);
});