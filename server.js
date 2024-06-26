const express = require('express');
const app = express();
const PORT= 3333;

// Gestion des en-tête CORS
app.use((req, res, next) => {
    res.header('Access-control-allow-origin', 'http://localhost:4200');
    res.header('Access-control-allow-methods', 'GET,PUT,POST,DELETE');
    res.header('Access-control-allow-headers', 'Content-type');
    res.header('Access-control-allow-credentials', 'true');
    next();
})

app.use(express.json());

// Routage des requêtes
const projectsRouter = require('./routes/projects');
const usersRouter = require('./routes/users');
app.use('/projects', projectsRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
})