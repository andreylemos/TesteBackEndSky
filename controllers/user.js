
const jwt = require('jsonwebtoken');
const { user } = require('../models/user');
const bcrypt = require('bcrypt');

const userService = {
   
    adicionar(req, res) {
        var novoUsuario = new user();
        novoUsuario.nome = req.body.nome;
        novoUsuario.email = req.body.email;
        novoUsuario.senha = req.body.senha;
        novoUsuario.telefones = req.body.telefones;
        novoUsuario.data_criacao = new Date().toISOString();
        novoUsuario.data_atualizacao = '';
        novoUsuario.ultimo_login = '';
        novoUsuario.token = '';

        if (req.body.senha) {
            novoUsuario.senha = bcrypt.hashSync(req.body.senha, 10);

            novoUsuario.save()
                .then(x => { 
                    res.send('oi');
                }).catch(erro => {
                    res.send('oi2');
                });
        } else {
            res.send('oi3');
        }
    }
};

module.exports = {
    userService
}
