const express = require ('express');
const router = express.Router();
const utilisateurController = require ('../controller/utilisateurController');



router.get ('/', utilisateurController.getAllUsers);// get all users
router.get ('/:id', utilisateurController.getUserById); //get one user
router.put ('/:id', utilisateurController.updateUser); //update one user by ID
router.delete ('/:id', utilisateurController.deleteUser); //delete userbyid
router.post('/promote/:id', utilisateurController.promoteToAdmin); //promote normal user to admin



module.exports = router;
