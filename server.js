const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const sequelize = require('./config/database');
const authRoutes = require('./src/routes/authRoutes');
const protectedRoutes = require('./src/routes/protectedRoutes');
const setupAssociations = require('./src/models/associations');
const userRoutes = require('./src/routes/userRoutes');
const categorieRoutes = require('./src/routes/categorieRoutes');
const platRoutes = require('./src/routes/platRoutes');
const commandeRoutes = require('./src/routes/commandeRoutes');
const dashboardRoutes = require('./src/routes/dashboardRoutes');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// Enhanced Security Middleware
app.use(helmet());

// Rate Limiting Configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    status: 429,
    error: 'Too many requests, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// CORS Configuration
const allowedOrigins = process.env.CORS_ORIGINS 
  ? process.env.CORS_ORIGINS.split(',').map(o => o.trim()) 
  : [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://localhost:8080'
    ];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin && process.env.NODE_ENV !== 'production') {
      // Allow requests with no origin in development
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.warn(`[CORS] Blocked origin: ${origin}`);
    return callback(new Error('Not allowed by CORS'), false);
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept'
  ],
  exposedHeaders: ['Authorization'],
  credentials: true, // Enable if you need cookies/auth headers
  maxAge: 86400, // 24 hours
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Apply Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categorieRoutes);
app.use('/api/plats', platRoutes);
app.use('/api/commandes', commandeRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  if (err.name === 'CorsError') {
    return res.status(403).json({ 
      status: 'error', 
      message: 'CORS policy violation' 
    });
  }
  
  console.error('[Server Error]', err);
  res.status(500).json({ 
    status: 'error', 
    message: 'Internal Server Error' 
  });
});

// Database Sync
setupAssociations();
sequelize.sync({ alter: process.env.NODE_ENV !== 'production' })
  .then(() => console.log('✅ Database synced successfully'))
  .catch(err => console.error('❌ Database sync failed:', err));

// Server Start
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Allowed CORS origins: ${allowedOrigins.join(', ')}`);
});

// Graceful Shutdown
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});