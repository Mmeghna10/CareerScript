require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');

const app = express();

// Connect Database
connectDB();

// Enhanced CORS configuration
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://career-script.vercel.app',
    // Pattern for Vercel preview deployments
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
                console.log('CORS blocked origin:', origin);
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
        credentials: true
    })
);

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Enhanced static file serving with proper headers
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res, filePath) => {
        // Set CORS headers for images
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        
        // Set cache headers
        res.set('Cache-Control', 'public, max-age=86400'); // 24 hours
        
        // Set content type based on file extension
        const ext = path.extname(filePath).toLowerCase();
        switch (ext) {
            case '.jpg':
            case '.jpeg':
                res.set('Content-Type', 'image/jpeg');
                break;
            case '.png':
                res.set('Content-Type', 'image/png');
                break;
            case '.webp':
                res.set('Content-Type', 'image/webp');
                break;
        }
    }
}));

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ 
        message: 'CareerScript API is running!',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ 
            message: 'File too large',
            error: 'Maximum file size is 5MB' 
        });
    }
    
    if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({ 
            message: 'Too many files',
            error: 'Maximum 2 files allowed' 
        });
    }
    
    if (err.message.includes('CORS')) {
        return res.status(403).json({ 
            message: 'CORS Error',
            error: 'Origin not allowed' 
        });
    }
    
    res.status(500).json({ 
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong' 
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ 
        message: 'Route not found',
        path: req.originalUrl 
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📁 Static files served from: ${path.join(__dirname, 'uploads')}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
