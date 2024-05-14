const { readProjectsData, createProject, returnProjectById, addUser, deleteProject, getProjectsByManager, getProjectsByUser } = require('../utilsProject');
const express = require('express');
const {returnUserById} = require("../utilsUser");
const filePath = './database/projects.json'
const router = express.Router();

router.get('/', getProjects);
router.put('/put', putProject);
router.get('/get/:id', getProjectById);
router.put('/add/:id', putUser);
router.delete('/del/:id', delProject);
router.get('/manager/:id', getManager);
router.get('/user/:id', getUser);

module.exports = router;

// Récupération de tous les projets
function getProjects(req, res) {
    res.json(readProjectsData(filePath, res));
}

// Création d'un projet
function putProject(req, res) {
    const newProject = {
        id: 1,
        name: req.body.name,
        desc: req.body.desc,
        nbOfMembers: 1,
        maxNbOfMembers: req.body.maxNbOfMembers,
        manager: req.body.manager,
        members : [
            req.body.manager
        ]
    }
    res.json(createProject(filePath, newProject));
}

// Récupération d'un projet par son id
function getProjectById(req, res) {
    res.json(returnProjectById(filePath, req.params.id));
}

// Ajout d'un utilisateur à un projet
function putUser(req, res) {
    res.json(addUser(filePath, parseInt(req.params.id), req.body.id));
}

// Suppression d'un projet
function delProject(req, res) {
    res.json(deleteProject(filePath, parseInt(req.params.id)));
}

// Récupération des projets gérés par un utilisateur
function getManager(req, res) {
    res.json(getProjectsByManager(filePath, parseInt(req.params.id)));
}

// Récupération des projets associés à un utilisateur
function getUser(req, res) {
    res.json(getProjectsByUser(filePath, parseInt(req.params.id)));
}

