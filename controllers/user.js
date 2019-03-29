require('dotenv').config();
const jwt = require('jsonwebtoken');
const { user } = require('../models/user');
const bcrypt = require('bcrypt');
const { returnService } = require('../utils/return');

const userService = {
  login(req, res) {
    const email = req.body.email;
    const senha = req.body.senha;

    user.findOne({ email: email })
      .then(data => {
        const usuarioRetorno = data ? data.toObject() : null;
        if (usuarioRetorno && bcrypt.compareSync(senha, usuarioRetorno.senha)) {
          // eslint-disable-next-line no-underscore-dangle
          const token = jwt.sign({ user: usuarioRetorno._id }, process.env.SECRET, {
            expiresIn: 600,
          });
          data.token = token;
          data.ultimo_login = new Date().toISOString();
          data.save();
          returnService.sender(res,200,true,null,null, data);
        } else {
          returnService.sendError(res,400,null,{ success: false, erro:"Login Inválido" });
        }
      }).catch(erro => {
        returnService.sendError(res,400,null,erro);
      });
  },

  logout(req, res) {
    returnService.sender(res,200,true,null,null,{ success: true, auth: false, token: null });
  },

  getInfo(req, res) {
    user.findById(req.userId, { dsSenha: 0 })   
      .then(data => {
        returnService.sender(res,200,false,null,null,data);
      }).catch(erro => {
        returnService.sendError(res,400,null,erro);
      });
  },
  
  add(req, res) {
    var newUser = new user();
    newUser.nome = req.body.nome;
    newUser.email = req.body.email;
    newUser.senha = req.body.senha;
    newUser.telefones = req.body.telefones;
    newUser.data_criacao = new Date().toISOString();
    newUser.data_atualizacao = '';
    newUser.ultimo_login = '';
    newUser.token = '';

    if (req.body.senha) {
      newUser.senha = bcrypt.hashSync(req.body.senha, 10);

      newUser.save()
        .then(x => { 
          console.log(x);
          returnService.sender(res,200,true,'','Usuario cadastrado com sucesso', newUser);
        }).catch(() => {
          returnService.sendError(res,400,'Falha ao cadastrar o usuario',null);
        });
    } else {
      returnService.sendError(res,401, 'Senha inválida', null);
    }
  },
};

module.exports = {
  userService,
}
