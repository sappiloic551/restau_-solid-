const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const sequelize = require('./config/database');
const authRoutes = require('./src/routes/authRoutes');
const protectedRoutes = require('./src/routes/protectedRoutes');
const categorieRoutes = require ('./src/routes/categorieRoutes');
const platRoutes = require ('./src/routes/platRoutes');
const utilisateurRoutes = require ('./src/routes/utilisateurRoutes')
const commandeRoutes = require('./src/routes/commandeRoutes');
const paiementRoutes = require('./src/routes/paiementRoutes');
const path = require ('path'); // needed to serve static files connection
const reservationRoutes = require('./src/routes/reservationRoutes');
const serviceTraiteurRoutes = require('./src/routes/serviceTraiteurRoutes');






require('dotenv').config(); 

const db = require ('./src/models'); // to load database and models

const app = express(); // 

// Limit repeated requests to public APIs to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100                  // limit each IP to 100 requests per windowMs
});

// Apply middleware
const corsOptions = {
  //origin: 'http://localhost:5000'
};

app.use(cors(corsOptions));
app.use(express.json());    // Parse incoming JSON requests
app.use(limiter);           // Apply rate limiting
app.use('/api/auth', authRoutes); // Mount auth routes at /api/auth
app.use('/api/protected', protectedRoutes);
app.use('/api/categories', categorieRoutes);
app.use ('/api/plats', platRoutes); 
app.use ('/api/utilisateur', utilisateurRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads'))); //static folder for uploaded files
app.use('/api/commandes', commandeRoutes);
app.use('/api/paiements', paiementRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/services-traiteur', serviceTraiteurRoutes);



//test db connection.
db.sequelize.authenticate()
.then (()=>{
  console.log ('Connected to the database');
})
.catch (err => {
  console.error ('Unable to connect to database', err);
});


// Sync Sequelize models with the database
db.sequelize.sync({ alter: true })
  .then(() => console.log('Database synced successfully'))
  .catch(err => console.log('Database sync failed:', err));

// Start server on specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));




//{
//"name": "Admin 2",
//"email": "admin2@gmail.com",
//"password": "Password@123",
//"telephone": "600000009"
//}


//"user": {
	//	"name": "Test 1",
	//	"email": "test1@example.com",
	//	"telephone": "600000001",
	//	"role": "utilisateur"
//	}


//"test email": {
	//	"name": "Test email",
	//	"email": "loicsamuel435@gmail.com",
	//	"telephone": "600000006",
	//	"role": "utilisateur"
//	}


//http://localhost:5000/uploads/plat-1754147761143.jpg
//http://localhost:3000/uploads/plat-1754148363116.jpg