const fs = require('fs');
//const {createBlog, deleteBlog} = require("./utilsBlog");

// Fonction pour lire les données utilisateur
function readUsersData(filePath) {
    let data = fs.readFileSync(filePath, 'utf-8');
    let jsonData = JSON.parse(data);
    return jsonData;
}

// Fonction pour creer un utilisateur et le blog associé
function createUser(filePath, dataObject) {
    let users = readUsersData(filePath);

    let maxId = Math.max(...users.map(users => users.id));
    dataObject.id = maxId + 1;
    /*
    dataObject.idBlog = maxId + 1;
    */
    //createBlog('./database/blogs.json', dataObject);

    users.push(dataObject);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    console.log("Utilisateur ajouté");
    return true;
}

// Fonction pour modifier des paramètres d'un utilisateur
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

// Fonctions utilisée pour supprimer un utilisateur dont son id est en paramètre
function deleteUser(filePath, idData) {
    let users = readUsersData(filePath);
    const idUserToDelete = parseInt(idData);
    const indexUserToDelete = users.findIndex(user => user.id === idUserToDelete);

    if (indexUserToDelete !== -1) {
        users.splice(indexUserToDelete, 1);

        //deleteBlog('./database/blogs.json', idData); // On supprime aussi le blog lié à l'utilisateur

        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

        console.log("Utilisateur supprimé");
        return true;
    } else {
        console.log("Utilisateur " + idUserToDelete + " inexistant");
        return false;
    }
}
/*
// Fonction utilisée pour connecter l'utilisateur au site
function connectUser(filePath, mail, password) {
    const utilisateurs = readUserData(filePath);
    const utilisateur = utilisateurs.find(utilisateur => utilisateur.email === mail);

    if (!utilisateur) {
        throw new Error(`Utilisateur "${mail}" non trouvé.`);
    }

    if(!utilisateur.motDePasse === password) {
        throw new Error(`Utilisateur ${password} mauvais.`);
    }

    console.log(mail);
    console.log(password);

    if(utilisateur.motDePasse === password) {
        return utilisateur;
    }

    return undefined;
}
*/

module.exports = {
    readUsersData,
    createUser,
    modifyUser,
    deleteUser,/*
    connectUser,*/
};