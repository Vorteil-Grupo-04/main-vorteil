var tokenModel = require("../models/tokenModel");

function insertToken(req, res) {
    var token = req.body.tokenServer;
    var idEmpresa = req.body.idEmpresaServer;

    if (token == undefined) {
        res.status(400).send("Seu token está undefined!");
    } else if (idEmpresa == undefined) {
        res.status(400).send("Seu id de empresa está undefined!");
    }else {
        tokenModel.insertToken(token, idEmpresa)
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




function selectToken(req, res) {
    var tokenCodigo = req.body.codigoTokenServer;
    console.log("TOKENNNNNNNNNNNNNNNNNNNNNNN", tokenCodigo)
    var idEmpresa = req.body.idEmpresaServer;
  
    if (tokenCodigo == undefined) {
      console.log("Seu token está undefined!")
      res.status(400).send("Seu token está undefined!");
    } else if (idEmpresa == undefined) {
      console.log("Sua idEmpresa está indefinida!")
      res.status(400).send("Sua idEmpresa está indefinida!");
    } else {
      tokenModel
        .selectToken(tokenCodigo, idEmpresa)
        .then(function (resultadoSelectToken) {
          console.log(`\nResultados encontrados: ${resultadoSelectToken.length}`);
          console.log(`Resultados: ${JSON.stringify(resultadoSelectToken)}`); // transforma JSON em String
  
          if (resultadoSelectToken.length == 1) {
            console.log(resultadoSelectToken);
            res.json({
              dataExpiracao: resultadoSelectToken[0].dataExpiracao, //id do usuario
              statusToken: resultadoSelectToken[0].statusToken
            });
        
          } else if (resultadoSelectToken.length == 0) {
            res.status(403).send("Select token inválido(s)");
          } else {
            res.status(403).send("Mais de um token com o mesmo token e empresa!");
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







function updateToken(req, res) {
    var tokenCodigo = req.body.codigoTokenServer;
    var idEmpresa = req.body.idEmpresaServer;
    var status = req.body.statusServer

    if (tokenCodigo == undefined) {
        res.status(400).send("Seu Codigo token está undefined!");
    } else if (idEmpresa == undefined) {
        res.status(400).send("Seu id de empresa está undefined!");
    }else if (status == undefined) {
        res.status(400).send("Seu status do token  está undefined!");
    }else {
        tokenModel.updateToken(tokenCodigo, idEmpresa, status)
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

function deleteToken(req, res) {
    var tokenCodigo = req.body.codigoServer;
    var idEmpresa = req.body.empresaServer;

    if (tokenCodigo == undefined) {
        res.status(400).send("Seu codigo do token está undefined!");
    } else if (idEmpresa == undefined) {
        res.status(400).send("Seu id de empresa está undefined!");
    }else {
        tokenModel.deleteToken(tokenCodigo, idEmpresa)
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

module.exports = {
    insertToken,
    deleteToken,
    updateToken,
    selectToken
}