var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
  
    if (email == undefined) {
      console.log("Seu email está undefined!")
      res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
      console.log("Sua senha está indefinida!")
      res.status(400).send("Sua senha está indefinida!");
    } else {
      usuarioModel
        .autenticar(email, senha)
        .then(function (resultadoAutenticar) {
          console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
          console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String
  
          if (resultadoAutenticar.length == 1) {
            console.log(resultadoAutenticar);
            res.json({
              idUsuario: resultadoAutenticar[0].idUsuario, //id do usuario
              email: resultadoAutenticar[0].email,
              nome: resultadoAutenticar[0].nome,
              senha: resultadoAutenticar[0].senha,
              idEmpresa: resultadoAutenticar[0].idEmpresa
            });
        
          } else if (resultadoAutenticar.length == 0) {
            res.status(403).send("Email e/ou senha inválido(s)");
          } else {
            res.status(403).send("Mais de um usuário com o mesmo login e senha!");
          }
        })
        .catch(function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao realizar o login! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        });
    }
  }

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var cargo = req.body.cargoServer;
    var empresa = req.body.empresaServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    }else if (empresa == undefined) {
      res.status(400).send("Sua empresa está undefined!");
    }else if(cargo == undefined){
      res.status(400).send("Seu cargo está undefined!");
    }
    else {
        usuarioModel.cadastrar(nome, email, senha, cargo, empresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarFiscal(req, res) {
  var nome = req.body.nomeServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
 

  if (nome == undefined) {
      res.status(400).send("Seu nome está undefined!");
  } else if (email == undefined) {
      res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
      res.status(400).send("Sua senha está undefined!");
  }else {
      usuarioModel.cadastrar(nome, email, senha)
          .then(
              function (resultado) {
                  res.json(resultado);
              }
          ).catch(
              function (erro) {
                  console.log(erro);
                  console.log(
                      "\nHouve um erro ao realizar o cadastro! Erro: ",
                      erro.sqlMessage
                  );
                  res.status(500).json(erro.sqlMessage);
              }
          );
  }
}

function cadastrarEmpresa(req, res) {
  var nome = req.body.nomeEmpresaServer;
  var email = req.body.emailEmpresaServer;
  var senha = req.body.senhaEmpresaServer;
  var cnpj = req.body.cnpjServer;

  if (nome == undefined) {
      res.status(400).send("Seu nome está undefined!");
  } else if (email == undefined) {
      res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
      res.status(400).send("Sua senha está undefined!");
  }else if (cnpj == undefined) {
    res.status(400).send("Sua empresa está undefined!");
  }else {
      usuarioModel.cadastrarEmpresa(nome, email, senha, cnpj)
          .then(
              function (resultado) {
                  res.json(resultado);
              }
          ).catch(
              function (erro) {
                  console.log(erro);
                  console.log(
                      "\nHouve um erro ao realizar o cadastro! Erro: ",
                      erro.sqlMessage
                  );
                  res.status(500).json(erro.sqlMessage);
              }
          );
  }
}

function atualizarSenha(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email === undefined) {
    console.log("Seu email está undefined!");
    return res.status(400).send("Seu email está undefined!");
  } else if (senha === undefined) {
    console.log("Sua senha está undefined!");
    return res.status(400).send("Sua senha está undefined!");
  }

  usuarioModel.atualizarSenha(email, senha)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.error(erro);
      console.error("Houve um erro ao realizar a troca de avatar! Erro: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    autenticar,
    cadastrar,
    cadastrarEmpresa,
    atualizarSenha
}