class ValidadeForm {
  constructor() {
    this.form = document.querySelector('.formulario')
    this.eventos();
  }

  eventos() {
    this.form.addEventListener('submit', e => {
       this.handleSubmit(e);   
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const validCampo = this.isValid();
    const validaSenha = this.senhaValida();
    const nome = document.querySelector(".nome");
    const sobrenome = document.querySelector(".sobrenome");
    if(validCampo  && validaSenha) {
      alert(`Olá, ${nome.value + ' ' +  sobrenome.value}, Você entrou na página`)
    }
  }

  senhaValida() {
    let valid = true;

    const senha = document.querySelector(".senha");
    const repetirSenha = document.querySelector(".repetir-senha");

    if(senha.value !== repetirSenha.value) {
      valid = false;
      this.error(senha, 'A senha precisa ser igual ao "repetir senha"')
      this.error(repetirSenha, 'repetir senha  precisa ser igual a "senha"')
  
    }
    
    return valid;
  }

  isValid() {
    let valid = true;

    for(let errorText  of this.form.querySelectorAll('.error-text')) {
      errorText.remove()
    }

    for(let campo of this.form.querySelectorAll('.validar')) {
      const label = campo.previousElementSibling.innerHTML
        if(!campo.value) {
            this.error(campo, `Campo ${label} não pode estar vazio`)
            valid = false;
        }

        if(campo.classList.contains('cpf')) {
          if(!this.ValidaCpf(campo)) valid = false;
        } 


        if(campo.classList.contains('usuario')) {
          if(!this.validaUsuario(campo)) valid = false;
        } 
    }

    return valid;
  }

  validaUsuario(campo) {
    const user = campo.value;
    let valid = true;

    if(user.length > 12 || user.length < 3) {
      this.error(campo, 'Usuário deverá ter entre 3 e 12 caracteres')
      valid = false;  
    }
    
    if(!user.match(/[a-zA-Z0-9]+/g)){
        this.error(campo ,"Usuário só poderá conter letras e/ou números")
        valid = false;
    }
    else {
      this.correct(campo, 'Usuário Correto')
    }
    
    return valid;
  } 


  ValidaCpf(campo) {
    const cpf = new ValidaCpf(campo.value);

    if(!cpf.valida()) {
      this.error(campo, 'CPF inválido :(');
      return false;
    }
    else {
      this.correct(campo, 'CPF Válido :)')
    } 
    return true;
  }

  correct(campo, mensagem) {
    for(let  correct of this.form.querySelectorAll('.correct-text')) {
      correct.remove()
    }

    let divCpfCerto = document.createElement('div');

    divCpfCerto.innerText = mensagem;
    divCpfCerto.classList.add('correct-text')
    campo.insertAdjacentElement('afterend', divCpfCerto)
  } 

  error(campo, mensagem) {
    let div = document.createElement('div');
    div.innerHTML = mensagem;
    div.classList.add('error-text')
    campo.insertAdjacentElement('afterend', div)
  }
}

const form = new ValidadeForm();


