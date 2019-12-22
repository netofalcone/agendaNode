const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');
const path = require('path');

// const { loginRequired } = require('./src/middlewares/middleware');
const { loginRequired } = require(path.resolve(__dirname, 'src', 'middlewares', 'middleware.js'));

// Rotas da home
route.get('/', homeController.index);

//Rotas de Login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

//Rotas de Login
route.get('/contato/index', loginRequired, contatoController.index);
route.get('/contato/register', loginRequired, contatoController.index);

module.exports = route;
