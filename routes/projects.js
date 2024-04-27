const { readProjectsData, createProject, addUser, deleteProject, getProjectsByManager, getProjectsByUser } = require('../utilsProject');
const express = require('express');
const filePath = './database/projects.json'
const router = express.Router();

router.get('/', getProjects);
router.put('/put', putProject)
router.post('/add/:id', putUser);
router.delete('/del/:id', delProject)
router.get('/manager/:id', getManager);
router.get('/user/:id', getUser);

module.exports = router;

// Récupération de tous les projets
function getProjects(req, res) {
    res.json(readProjectsData(filePath, res));
}

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

// Ajout d'un utilisateur à un projet
function putUser(req, res) {
    res.json(addUser(filePath, req.body.id, parseInt(req.params.id)));
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

