
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const telefones =  new Schema({ 
    numero: { type: Number, required: true },
    ddd: { type: Number, required: true },
});

const usuarios =  new Schema({ 
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    telefones: [telefones],
    data_criacao:{ type: String, required: true },
    data_atualizacao:{ type: String },
    ultimo_login:{ type: String },
    token:{ type: String },
});

var user = mongoose.model('user', usuarios);


module.exports = {
    user
}