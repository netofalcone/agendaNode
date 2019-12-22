const mongoose = require('mongoose');
import validator from 'validator'

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String,required: true , default: '' },
  email: { type: String,required: true , default: '' },
  telefone: { type: String,required: true , default: '' },
  criadoEm: { type: Date, default: Date.now }
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body) {
 this.body = body;
 this.errors = [];
 this.contato = null; 
}





Contato.prototype.register = ()=>{
  this.valida();
};

Contato.prototype.valida() = function() {
  this.cleanUp()
  if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push("Email inválido");

  if(!this.body.nome) this.errors.push(); this.errors.push('Nome é obrigatório');
  if(!this.body.email && !this.body.telefone) { this.errors.push('pelo menos um contato precisa ser enviado: e-mail ou telefone.') }

   
}//
Contato.prototype.cleanUp() = function() {
  for (const key in this.body) {
    if (typeof this.body[key] !== 'string') {
      this.body[key] = '';
    } 
  }
  this.body = {
    nome: this.body.nome,
    sobrenome: this.body.sobrenome,
    email: this.body.email,
    telefone: this.body.telefone
   
    };
  }


module.exports = Contato;
