const { readUsersData, createUser, modifyUser, deleteUser } = require('../utilsUser');
const express = require('express');
const filePath = './database/users.json'
//const { createBlog } = require('../utilsProject');

const router = express.Router();

router.get('/', getUsers);
router.put('/add', putUser);
router.post('/post', postUser)
router.delete('/delete/:id', delUser);
//router.post('/login', loginUser);

module.exports = router;

// Récupère tout les utilisateurs
function getUsers(req, res) {
    res.json(readUsersData(filePath));
}

// Ajoute un utilisateur
function putUser(req, res) {
    const newUser = {
        id: 1,
        name: req.body.name,
        lastname : req.body.lastname
    };

    res.json(createUser(filePath, newUser));
}

// Modifie un utilisateur
function postUser(req, res) {
    const altUser = {
        id: req.body.id,
        name: req.body.name,
        lastname : req.body.lastname
    };

    res.json(modifyUser(filePath, altUser));
}

// Fonction pour supprimer avec son id
function delUser(req, res) {
    res.json(deleteUser(filePath, req.params.id));
}

/*
// Fonction pour connecter un utilisateur
function loginUser(req, res) {
    res.json(connectUser(filePath, req.body.email, req.body.password));
}

 */