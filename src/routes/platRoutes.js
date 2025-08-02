const express = require ('express');
const router = express.Router();
const platController = require ('../controller/platController');
const upload = require ('../utils/upload');


router.post ('/', upload.single('image') ,platController.createPlat); //create a plat post
router.get ('/', platController.getAllPlats) ; // list all plats
router.get ('/:id', platController.getPlatById);
router.put ('/:id', upload.single('image'),platController.updatePlat) // update plat
router.delete ('/:id', platController.deletePlat) // to delete plat


module.exports = router;

/***
 * body type to test using insonmia
 * body type: multipart/form-data
 * 
 * 
 * 
 */