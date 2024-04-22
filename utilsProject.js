const fs = require('fs');

// Récupération de tous les projets
function readProjectsData(filePath) {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

// Création d'un projet
function createProject(filepath, dataObject) {
    let projects = readProjectsData(filepath);
    let maxId = Math.max(...projects.map(projects => projects.id));
    dataObject.id = maxId + 1;

    projects.push(dataObject);
    fs.writeFileSync(filepath, JSON.stringify(projects, null, 2));
    console.log("Projet crée");
    return true;
}

// Ajout d'un utilisateur à un projet
function addUser(filepath, idProject, idUser) {
    let projects = readProjectsData(filepath);
    let project = projects.find(project => project.id === idProject);

    if (project.nbOfMembers < project.maxNbOfMembers) {
        if (!project.members.includes(idUser)) {
            project.members.push(idUser);
            project.nbOfMembers++;
            fs.writeFileSync(filepath, JSON.stringify(projects, null, 2));
            console.log('Utilisateur ajouté au projet');
            return true;
        } else {
            console.log('Utilisateur déjà présent au projet')
            return false;
        }
    } else {
        console.log('Nombre max de membres atteint');
        return false;
    }
}

// Suppression d'un projet
function deleteProject(filePath, idProjectToDelete) {
    let projects = readProjectsData(filePath);
    const indexProjectToDelete = projects.findIndex(user => user.id === idProjectToDelete);

    if (indexProjectToDelete !== -1) {
        projects.splice(indexProjectToDelete, 1);
        fs.writeFileSync(filePath, JSON.stringify(projects, null, 2));
        console.log("Projet supprimé");
        return true;
    } else {
        console.log("Projet " + idProjectToDelete + " inexistant");
        return false;
    }
}

// Récupération des projets gérer par un utilisateur
function getProjectsByManager(filePath, idManager) {
    let projects = readProjectsData(filePath);
    return projects.filter(project => project.manager === idManager);
    /*
    let managerProjects = projects.filter(project => project.manager === idManager);
    console.log('Filtre ' + managerProjects.map(projet => projet.id));
    return managerProjects;
    */
}

// Récupération des projets associés à un utilisateur
function getProjectsByUser(filePath, idUser) {
    let projects = readProjectsData(filePath);
    return projects.filter(project => project.members.includes(idUser));
}

function getProjectMembers(file, idProject) {

}


module.exports = {
    readProjectsData,
    createProject,
    addUser,
    deleteProject,
    getProjectsByManager,
    getProjectsByUser,
    getProjectMembers
};