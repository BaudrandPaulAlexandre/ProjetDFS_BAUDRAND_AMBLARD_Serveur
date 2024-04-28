const fs = require('fs');
const { getProjectsByManager, deleteProject} = require('./utilsProject');

// Récupération de tous les utilisateurs
function readUsersData(filePath) {
    let data = fs.readFileSync(filePath, 'utf-8');
    return  JSON.parse(data);
}

// Création d'un utilisateur
function createUser(filePath, dataObject) {
    let users = readUsersData(filePath);
    let maxId = Math.max(...users.map(users => users.id));
    dataObject.id = maxId + 1;

    users.push(dataObject);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    console.log("Utilisateur crée");
    return true;
}

// Récupération d'un utilisateur par son identifiant
function returnUserById(filePath, idData) {
    let users = readUsersData(filePath);
    const idUserToGet = parseInt(idData);
    const user = users.find(user => user.id === idUserToGet);
    return user || false;
}

// Modification d'un utilisateur
function modifyUser(filepath, dataObject) {
    let users = readUsersData(filepath);
    const idUserToModify = dataObject.id;
    const userToModify = users.find(user => user.id === idUserToModify);
    console.log(idUserToModify + ' ' + userToModify)

    if (userToModify) {
        userToModify.name = dataObject.name;
        userToModify.lastname = dataObject.lastname;

        fs.writeFileSync(filepath, JSON.stringify(users, null, 2));

        console.log("Utilisateur modifié");
        return true;
    } else {
        console.log("Utilisateur " + idUserToModify + " inexistant");
        return false;
    }
}

// Suppression d'un utilisateur et des projets qu'il a crées
function deleteUser(filePath, idData) {
    let users = readUsersData(filePath);
    const idUserToDelete = parseInt(idData);
    const indexUserToDelete = users.findIndex(user => user.id === idUserToDelete);

    if (indexUserToDelete !== -1) {
        let managerProjects = (getProjectsByManager('./database/projects.json', idUserToDelete)).map(project => project.id);
        for (let i = 0; i < managerProjects.length; i++) {
            deleteProject('./database/projects.json', managerProjects[i]);
        }
        users.splice(indexUserToDelete, 1);
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
        console.log("Utilisateur supprimé");
        return true;
    } else {
        console.log("Utilisateur " + idUserToDelete + " inexistant");
        return false;
    }
}

// Connexion de l'utilisateur
function connectUser(filePath, name, password) {
    const users = readUsersData(filePath);
    const user = users.find(user => user.name === name);

    if (!user) {
        throw new Error(`Utilisateur innexistant`);
    }
    if(!user.password === password) {
        throw new Error(`Mot de passe incorecte.`);
    }
    if(user.password === password) {
        return user;
    }
    return undefined;
}

module.exports = {
    readUsersData,
    createUser,
    returnUserById,
    modifyUser,
    deleteUser,
    connectUser
};