const Categorie = require ('../models/Categorie');

//get all categories 
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Categorie.findAll();
        res.json(categories);
    } catch (err) {
        res.status(500).json ({message: 'Error fetching categories', error : err.message});
    }
};

//get all categoried by ID
exports.getAllCategoryById = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Categorie.findByPk(id);
        if (!category) return res.status(404).json ({message: 'Category not found'});
        res.json(category);
    } catch (err) {
        res.status(500).json ({message: 'Error fetching category', error: err.message});
    }
};



//create a new category

exports.createCategory = async (req, res) => {
    try {
        const {nom , description} = req.body;
        const newCategory = await Categorie.create({nom, description});
        res.status(201).json (newCategory);
    } catch (err) {
        res.status (500).json ({message: 'error creating category', error: err.message});
    }
};

//update category

exports.updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Categorie.findByPk(id);
        if (!category) return res.status(404).json ({message: 'Categorie not found'});


        const {nom, description} = req.body;
        category.nom = nom || category.nom;
        category.description = description || category.description;
        await category.save();

        res.json ({message: 'Category Updated', category});
    } catch (err) {
        res.status(500).json ({message: 'error updating category', error: err.message});
    }
};


//delete category
exports.deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await Categorie.destroy ({where: {id_categorie: id}});
        if (!deleted) return res.status(404).json ({message: 'Category not found', error: err.message})
        res.json({message: 'Category deleted succesfully'});
        } catch (err) {
            res.status(500).json ({message: 'Error deleting Category', error: err.mesaage});
        }
};