function btnCadastroEmpresa() {
    const nome_empresa_input  = input_nome_empresa_cadastro.value;
    const razao_social_input  = input_razao_social_cadastro.value;
    const cnpj_input = input_cnpj_cadastro.value;
    const cidade_input = input_cidade_cadastro.value;
          
    console.log(nome_empresa_input)
    console.log(razao_social_input)
    console.log(cnpj_input)
    console.log(cidade_input)
  
    if (
      nome_empresa_input == "" ||
      razao_social_input == "" ||
      cnpj_input == "" ||
      cidade_input == ""
    ) {
      alert("Nenhum campo pode estar vazio")
      return false;
    }
  
    fetch("../empresa/cadastrarEmpresa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomeEmpresaServer: nome_empresa_input,
        razaoSocialServer: razao_social_input,
        cnpjServer: cnpj_input,
        cidadeServer: cidade_input
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);
  
        if (resposta.ok) {
          setTimeout(() => {
            sessionStorageEmpresa()
            alert("Empresa Cadastrada!")
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

  function sessionStorageEmpresa(params) {
    var idUsuario = sessionStorage.ID_USUARIO;

    fetch("./usuarios/sessionEmpresa", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuarioServer: idUsuario,
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO sessionStorage da empresa()!")
    
        if (resposta.ok) {
            console.log(resposta);
     
        
            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.ID_EMPRESA = json.fkEmpresa;
                
            });
            window.location = "Dashboard.html"
        } else {
    
            console.log("Houve um erro ao tentar realizar o cadastro do session storage da empresa!");
    
            
        }
    
    }).catch(function (erro) {
        console.log(erro);
    })
    
    return false;
    }









  async function listarDados(){
    var idEmpresa = sessionStorage.ID_EMPRESA;

    await fetch(`/empresa/${idEmpresa}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                mudarHtml(resposta);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados da empresa: ${error.message}`);
        });
  }

  function mudarHtml(resposta){
    console.log(resposta[0].nomeEmpresa)

    console.log(JSON.stringify(resposta));

    var nomeEmpresaEditar = document.getElementById('input_nome_empresa_editar')
    var razaoSocialEditar = document.getElementById("input_razao_social_editar")
    var cnpjEditar = document.getElementById("input_cnpj_editar")
    var cidadeEditar = document.getElementById("input_cidade_editar")
    
    //exceção para o deletar
    var nomeDeletar = document.getElementById("input_nome_empresa_deletar")
    nomeDeletar.value = resposta[0].nomeEmpresa;
    nomeDeletar.disabled = true;

    nomeEmpresaEditar.value = resposta[0].nomeEmpresa;
    razaoSocialEditar.value = resposta[0].razaoSocial;
    cnpjEditar.value = resposta[0].cnpj;
    cidadeEditar.value = resposta[0].cidade;
    
    desabilitar();
  }

  function desabilitar(){
    var nomeEmpresaEditar = document.getElementById('input_nome_empresa_editar');
    var razaoSocialEditar = document.getElementById("input_razao_social_editar");
    var cnpjEditar = document.getElementById("input_cnpj_editar");
    var cidadeEditar = document.getElementById("input_cidade_editar");

    nomeEmpresaEditar.disabled = true;
    razaoSocialEditar.disabled = true;
    cnpjEditar.disabled = true;
    cidadeEditar.disabled = true;   
  }

  function habilitarEdicao(){
    var nomeEmpresaEditar = document.getElementById('input_nome_empresa_editar');
    var razaoSocialEditar = document.getElementById("input_razao_social_editar");
    var cnpjEditar = document.getElementById("input_cnpj_editar");
    var cidadeEditar = document.getElementById("input_cidade_editar");

    nomeEmpresaEditar.disabled = false;
    razaoSocialEditar.disabled = false;
    cnpjEditar.disabled = false;
    cidadeEditar.disabled = false;

    document.getElementById('btnEdit').style.display = 'none';
    document.getElementById('btnEnviar').style.display = 'flex';
    document.getElementById('btnEnviar').style.background = 'rgb(23, 126, 237)';
  }

  function enviarEdicao(){
    var idEmpresa = sessionStorage.ID_USUARIO;  //verificar pois se mudar aqui, nao funciona o session storage

    var nome_empresa_input_att  = input_nome_empresa_editar.value;
    var razao_social_input_att  = input_razao_social_editar.value;
    var cnpj_input_att = input_cnpj_editar.value;
    var cidade_input_att = input_cidade_editar.value;
          
    console.log(nome_empresa_input_att)
    console.log(razao_social_input_att)
    console.log(cnpj_input_att)
    console.log(cidade_input_att)
  
    if (
      nome_empresa_input_att == "" ||
      razao_social_input_att == "" ||
      cnpj_input_att == "" ||
      cidade_input_att == ""
    ) {
      alert("Nenhum campo pode estar vazio")
      return false;
    }

    fetch(`../empresa/atualizarEmpresa`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        novoNomeEmpresaServer: nome_empresa_input_att,
        novoRazaoSocialServer: razao_social_input_att,
        novoCnpjServer: cnpj_input_att,
        novoCidadeServer: cidade_input_att,
        idEmpresaServer: idEmpresa
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);
  
        if (resposta.ok) {
          setTimeout(() => {
            alert("Dados da empresa atualizados com sucesso")
          }, 1000);
        } else {
          throw new Error("Houve um erro ao tentar atualkizar a empresa!");
        }
      })
      .catch(function (erro) {
        console.error("#ERRO: ", erro);
      });
  };

  function removerEmpresa(idEmpresa) {
    var idEmpresa = sessionStorage.ID_EMPRESA;
    
    console.log("Criar função de apagar empresa escolhida - ID" + idEmpresa);
        fetch(`/empresa/removerEmpresa/${idEmpresa}`, {
            method: "DELETE",
            headers: { 
                "Content-Type": "application/json"
            }
        }).then(function (resposta) {

            if (resposta.ok) {
              setTimeout(() => {
                alert("Dados da empresa removidos com sucesso")
              }, 1000);
            } else if (resposta.status == 404) {
                window.alert("Deu 404!");
            } else {
                throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });  

        location.reload();
  }