const express = require ('express');
const router = express.Router();
const categorieController = require ('../controller/categorieController');


router.get ('/', categorieController.getAllCategories) //get all categories
router.get ('/:id', categorieController.getAllCategoryById) // get category by id
router.post ('/', categorieController.createCategory) // post create new category
router.put ('/:id', categorieController.updateCategory) // update category
router.delete ('/:id', categorieController.deleteCategory) // delete category

module.exports = router;

/**
 * create categorie
 * method: post
 * url : http://localhost:3000/api/categories
 * body - json
 * 
 * json {
 * "nom": "fastfood",
 * "description": "Quick meals like burgers, fries"
 * }
 * 
 * get all categories
 * method: get 
 * http://localhost:3000/api/categories
 * 
 * update categorie
 * method: PUT
 * http://localhost:3000/api/categories
 * 
 * json
 * {
 * "nom": "updated fastfood",
 * "description": "updated Quick meals like burgers, fries"
 * }
 *
 * /** delete
 * metod: Delete
 * url: http://localhost:3000/api/categories/1
 * 
 * 
 *  */