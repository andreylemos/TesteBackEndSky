const routes = require('express').Router();
const { userService } = require('../controllers/user');

//routes.post('/user/logon', user.login);
//routes.get('/user/logout', user.logout);
routes.post('/user/signup', userService.adicionar);


module.exports = routes;