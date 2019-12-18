const mongoose = require('mongoose');

import bcryptjs from 'bcryptjs'

import validator from 'validator'

// 'Login' será o nome da collection no banco de dados, no caso 'logins' pq lá ele fica no plural'


const LoginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const LoginModel = mongoose.model('Login', LoginSchema);

export class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }
 // Fazer login do usuário

  async login() {
    if (this.errors.length > 0) return;
    this.user = await LoginModel.findOne({ email: this.body.email });

    if(this.user){
      this.errors.push('Usuário ou senha inválidos') 
      return;
    } 

    if(bcryptjs.compareSync(this.body.password, this.user.password)){
      this.errors.push('Senha inválida');
      return;
   
  }
  };


////////  Registrar um novo usuário


  async register() {
    await this.valida();
    if (this.errors.length > 0)  return ;
    // console.log(this.errors)

    await this.userExists();
    if (this.errors.length > 0) return;
    // console.log(this.errors)


    const salt = bcryptjs.genSaltSync();
    console.log(salt)
    this.body.password = bcryptjs.hashSync(this.body.password, salt);
    console.log(this.body, '4 encriptou senha e vai criar o usuario')
    this.user = await LoginModel.create(this.body);

  };
  //



  //

  async userExists() {
    this.user = await LoginModel.findOne({ email: this.body.email });
    if (this.user) this.errors.push('Usuário já existe.');
    console.log(this.body, ' 3 passando pelo método user exists')
    console.log(this.errors)
    
    
  }


  valida() {
    this.cleanUp()
    // Outra maneira de validar
    // if(!validator.isEmail(this.body.email)) this.errors.push("Email inválido");

    let reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(this.body.email)) {
      this.errors.push('Digite o email corretamente');
    }
    if (this.body.password.length < 3 || this.body.password > 50) {
      this.errors.push('a senha precisa ser letras, entre 3 e 30 carateres')
    } console.log(this.body, '2')

  }
  //

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      } 
    }
    this.body = {
      email: this.body.email,
      password: this.body.password
     
    }
    //teste1
    console.log(this.body, '1') 

  }
  
}

module.exports = Login;

