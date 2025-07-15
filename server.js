const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');
const Utilisateur = require('./src/models/Utilisateur'); 

const authRoutes = require('./src/routes/authRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const passwordRoutes = require('./src/routes/passwordRoutes');

const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('API is working!');
});

//Auth routes
app.use('/api/auth', authRoutes);

//Admin-only routes
app.use('/api/admin', adminRoutes);
app.use('/api/password', passwordRoutes);


sequelize.sync({ alter: true }) 
  .then(() => {
    console.log('✅ Sequelize synced: Tables created/updated.');
    app.listen(3000, () => {
      console.log('🚀 Server running on http://localhost:3000');
    });
  })
  .catch(err => {
    console.error('❌ Unable to connect to the database:', err.message);
  });
