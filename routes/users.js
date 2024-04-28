const { readUsersData, createUser, returnUserById, modifyUser, deleteUser, connectUser } = require('../utilsUser');
const express = require('express');
const filePath = './database/users.json'

const router = express.Router();

router.get('/', getUsers);
router.get('/get/:id', getUserById);
router.put('/add', putUser);
router.post('/post', postUser)
router.delete('/delete/:id', delUser);
router.post('/login', loginUser);

module.exports = router;

// Récupération de tous les utilisateurs
function getUsers(req, res) {
    res.json(readUsersData(filePath));
}

// Récupération d'un utilisateur par son id
function getUserById(req, res) {
    res.json(returnUserById(filePath, req.params.id));
}

// Création d'un utilisateur
function putUser(req, res) {
    const newUser = {
        id: 1,
        name: req.body.name,
        lastname: req.body.lastname,
        password: req.body.password
    };

    res.json(createUser(filePath, newUser));
}

// Modification d'un utilisateur
function postUser(req, res) {
    const altUser = {
        id: req.body.id,
        name: req.body.name,
        lastname: req.body.lastname
    };

    res.json(modifyUser(filePath, altUser));
}

// Suppression d'un utilisateur
function delUser(req, res) {
    res.json(deleteUser(filePath, req.params.id));
}

// Connexion de l'utilisateur
function loginUser(req, res) {
    res.json(connectUser(filePath, req.body.name, req.body.password));
}

