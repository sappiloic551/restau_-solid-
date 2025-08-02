const Utilisateur = require ('../models/Utilisateur');



//get ALL USERS
exports.getAllUsers = async (req, res) => {
    try {
        const users = await Utilisateur.findAll();
        res.status(200).json(users);
    } catch (error){
        console.error ('Error getting users:', error);
        res.status(500).json({message: 'Server Error'});
    }
};

//Get single user by ID
exports.getUserById = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await Utilisateur.findByPk(id);
        if (!user) return res.status(404).json ({message: 'User not found'});

        res.status(200).json (user);
    } catch (error) {
        console.error ('Recovery Error', error);
        res.status (500).json ({message: 'Server Error'});
    }
};


//update user 
exports.updateUser = async (req, res) => {
    const {id} = req.params;
    const {name, email, telephone} = req.body;

    try {
        const user = await Utilisateur.findByPk(id);
        if(!user) return res.status(404).json({message: 'User not found'});

        await user.update({name, email, telephone});
        res.status(200).json({message: 'User updated successfully', user});
    } catch (error) {
        console.error ('Error update', error);
        res.status(500).json({message: 'Server Error'});
    }
};


//Delete user
exports.deleteUser = async (req, res) => {
    const {id} = req.params;

    try {
        const user = await Utilisateur.findByPk(id);
        if (!user) return res.status(404).json({message: 'User not found'});

        await user.destroy();
        res.status(200).json({message: 'User deleted succesfully'});
    } catch (error){
        console.error ('Delete erreur', error);
        res.status(500).json({message: 'Server Erreur'});
    }
};

//promote user to admin

exports.promoteToAdmin = async (req, res) => {
    const {id} = req.params;

    try {
        const user = await Utilisateur.findByPk(id);
        if(!user) return res.status(404).json({message: 'User not found'});

        //change role user to admin
        await user.update ({role: 'admin'});

        res.status(200).json({message: 'user promoted to admin', user});
    } catch (error) {
        console.error('Promotion Error', error );
        res.status(500).json({message: 'Server Error'});
    }
};