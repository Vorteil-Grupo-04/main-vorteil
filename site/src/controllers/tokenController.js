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
    deleteToken
}