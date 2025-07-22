const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const sequelize = require('./config/database');
const authRoutes = require('./src/routes/authRoutes');
const protectedRoutes = require('./src/routes/protectedRoutes');
require('dotenv').config(); 

const app = express(); // 

// Limit repeated requests to public APIs to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100                  // limit each IP to 100 requests per windowMs
});

// Apply middleware
const corsOptions = {
  origin: 'http://localhost:5000'
};

app.use(cors(corsOptions));
app.use(express.json());    // Parse incoming JSON requests
app.use(limiter);           // Apply rate limiting
app.use('/api/auth', authRoutes); // Mount auth routes at /api/auth
app.use('/api/protected', protectedRoutes);

// Sync Sequelize models with the database
sequelize.sync()
  .then(() => console.log('Database synced successfully'))
  .catch(err => console.log('Database sync failed:', err));

// Start server on specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
