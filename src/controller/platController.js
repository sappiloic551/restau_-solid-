const Plat = require ('../models/Plat');
const path = require ('path');

module.exports = {
    async createPlat (req, res) {
        try {
            const {nom_plat, description_plat, prix, id_categorie} = req.body;
            const imagePath = req.file? req.file.path.replace ('public/', ''): null;

            const plat = await Plat.create ({
                nom_plat,
                description_plat,
                prix,
                id_categorie,
                image: imagePath
            });

            res.status(201).json(plat);

        }catch (err) {
            res.status(500).json({error: err.message});
        }
    },

//get all plats 
async getAllPlats(req, res) {
    try {
        const plats = await Plat.findAll();
        res.json(plats);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
},

//get one plat

async getPlatById (req, res) {
    try {
        const plat = await Plat.findByPk(req.params.id);
        if (!plat) return res.status(404).json({message: 'plat not found'});
        res.json(plat);
    } catch (err){
        res.status(500).json ({message: err.message});
    }
},

//Update plat
async updatePlat (req, res) {
    try {
        const {nom_plat, description_plat, prix, id_categorie} = req.body;
        const plat = await findByPk(req.params.id);
        if (!plat) return res.status(404).json ({message: 'Plat not found'});

        //update fields
        plat.nom_plat = nom_plat;
        plat.description_plat = description_plat;
        plat.prix = prix;
        plat.id_categorie = id_categorie;
        if (req.file){
            plat.image = req.file.path.replace('public/', '');
        }
        await plat.save();
        res.json(plat);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
},

//delete plat
async deletePlat (req, res) {
    try {
        const plat = await Plat.findByPk(req.params.id);
        if (!plat) return res.status(404).json ({message: 'plat not found'});

        await plat.destroy();
        res.json({message: 'Plat deleted successfully'});
    } catch (err) {
        res.status (500).json ({err: err.message});
    }
}


};