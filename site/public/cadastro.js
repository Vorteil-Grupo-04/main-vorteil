function btnRedefinirSenha(params) {
  window.location = "redefinirSenha.html"
}



function formatarCNPJ(input_cpnj_cadastro) {
 let cnpj = input_cpnj_cadastro.value

  cnpj = cnpj.replace(/\D/g, '');

  if (cnpj.length > 12) {
      cnpj = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  } else if (cnpj.length > 8) {
      cnpj = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{1,4})/, "$1.$2.$3/$4");
  } else if (cnpj.length > 5) {
      cnpj = cnpj.replace(/(\d{2})(\d{3})(\d{1,3})/, "$1.$2.$3");
  } else if (cnpj.length > 2) {
      cnpj = cnpj.replace(/(\d{2})(\d{1,3})/, "$1.$2");
  }

  input_cpnj_cadastro.value = cnpj;;
}

function exibirMsgErro(mensagem) {
  alert(mensagem)
}

function validarNome(params) {
  let nome = input_nome.value;
  let mensagemNome = "";
  if (nome.length > 20){
      mensagemNome = 'O nome não pode ter mais de 20 caracteres.';
      exibirMsgErro(mensagemNome)
  }else{
      return true;
  } 

}

function validarEmail() {
let input_email = document.getElementById('input_email');
    let email = input_email.value;
    let mensagemEmail = '';
    let emailCom = email.endsWith('.com');
    let emailArroba = email.indexOf("@");
    if (emailCom == false || emailArroba == -1) {
        mensagemEmail = 'Email inválido';
        exibirMsgErro(mensagemEmail)
    } else {
        return true;
    }
}



function validarSenha() {
    let senha = input_senha.value;
    let confirmarSenha = input_confirmar_senha.value;
    let mensagemSenha = '';

    if (confirmarSenha != senha) {         
        mensagemSenha = 'Os campos de senha precisam ser iguais.';
        exibirMsgErro(mensagemSenha);
    }else if (!/[A-Z]/.test(senha)) {
        mensagemSenha = 'Senha deve conter pelo menos uma letra maiúscula.';
        exibirMsgErro(mensagemSenha);
    }
    else if (!/[a-z]/.test(senha)) {
        mensagemSenha = 'Senha deve conter pelo menos uma letra minúscula.';
        exibirMsgErro(mensagemSenha);
    }
    else if (senha.length < 8) {
        mensagemSenha = 'Senha deve ter no mínimo 8 caracteres.';
        exibirMsgErro(mensagemSenha);
    }else if (senha.length > 20) {
        mensagemSenha = 'Senha deve ter no máximo 20 caracteres.';
        exibirMsgErro(mensagemSenha);
    }
    else {
        return true;
    }
}



function entrarLogin() {

  let email_input = input_log_email.value;
  let senha_input = input_log_senha.value;
  
  if (email_input == "" || senha_input == "") {
      return false;
  }
  
  
  console.log("FORM LOGIN: ", email_input);
  console.log("FORM SENHA: ", senha_input);
  
  fetch("./usuarios/autenticar", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          emailServer: email_input,
          senhaServer: senha_input
      })
  }).then(function (resposta) {
      console.log("ESTOU NO THEN DO entrar()!")
  
      if (resposta.ok) {
          console.log(resposta);
   
      
          resposta.json().then(json => {
              console.log(json);
              console.log(JSON.stringify(json));
              sessionStorage.EMAIL_USUARIO = json.email;
              sessionStorage.NOME_USUARIO = json.nome;
              sessionStorage.ID_USUARIO = json.idUsuario;
              sessionStorage.ID_EMPRESA = json.idEmpresa;

              setTimeout(function () {
                alert("login realizado com sucesso");
                window.location = "Dashbord.html"
              }, 1000);
          });
  
      } else {
  
          console.log("Houve um erro ao tentar realizar o login!");
  
          
      }
  
  }).catch(function (erro) {
      console.log(erro);
  })
  
  return false;
  }

function btnCadastro() {
  let nomeValido = validarNome();
  let emailValido = validarEmail();
  let senhaValida = validarSenha();

  if (!emailValido || !senhaValida || !nomeValido) {
    return false;
}

  const nome_input  = input_nome.value;
  const email_input = input_email.value;
  const senha_input = input_senha.value;
  const confirmacao_senha_input = input_confirmar_senha.value;
  const tipoConta_input =  id_tipo_conta.value;
        
  console.log(nome_input)
  console.log(email_input)
  console.log(senha_input)
  console.log(confirmacao_senha_input)
  console.log(tipoConta_input)

  if (
    nome_input == "" ||
    email_input == "" ||
    senha_input == "" ||
    confirmacao_senha_input == ""
  ) {
    return false;
  }

  if (tipoConta_input == "funcionario") {
  fetch("../usuarios/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomeServer: nome_input,
      emailServer: email_input,
      senhaServer: senha_input,
      cargoServer: 2
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        setTimeout(() => {
          alert("Usuário Cadastrado!")
         
        }, "2000");


      } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });

  return false;
  }
  
  else{
    //fiscal
    fetch("../usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomeServer: nome_input,
        emailServer: email_input,
        senhaServer: senha_input,
        cargoServer: 1,
        empresaServer: 1
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);
  
        if (resposta.ok) {
          setTimeout(() => {
            alert("Fiscal Cadastrado!")
           
          }, "2000");
  
  
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });
  
    return false;
  }
  }
 
