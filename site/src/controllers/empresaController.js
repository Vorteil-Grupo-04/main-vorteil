var empresaModel = require("../models/empresaModel");

function cadastrarEmpresa(req, res) {
    var nomeEmpresa = req.body.nomeEmpresaServer;
    var razaoSocial = req.body.razaoSocialServer;
    var cnpj = req.body.cnpjServer;
    var cidade = req.body.cidadeServer;

    if (nomeEmpresa == undefined) {
        res.status(400).send("Seu nome de empresa está undefined!");
    } else if (razaoSocial == undefined) {
        res.status(400).send("Sua razão social está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu CNPJ está undefined!");
    }else if (cidade == undefined) {
      res.status(400).send("Sua cidade está undefined!");
    }else {
        empresaModel.cadastrarEmpresa(nomeEmpresa, razaoSocial, cnpj, cidade)
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

function listarDadosPorEmpresa(req,res){
    var idEmpresa = req.params.idEmpresa;
    console.log("Entrei no listarDadosPorEmpresa" + idEmpresa)

    empresaModel.listarDadosPorEmpresa(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar dados da empresa.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function atualizarEmpresa(req,res){
    var idEmpresa = req.body.idEmpresaServer;

    var novoNomeEmpresa = req.body.novoNomeEmpresaServer;
    var novoRazaoSocial = req.body.novoRazaoSocialServer;
    var novoCnpj = req.body.novoCnpjServer;
    var novoCidade = req.body.novoCidadeServer;

    if (novoNomeEmpresa == undefined) {
        res.status(400).send("Seu novo nome de empresa está undefined!");
    } else if (novoRazaoSocial == undefined) {
        res.status(400).send("Sua nova razão social está undefined!");
    } else if (novoCnpj == undefined) {
        res.status(400).send("Seu novo CNPJ está undefined!");
    }else if (novoCidade == undefined) {
      res.status(400).send("Sua nova cidade está undefined!");
    }else {
        empresaModel.atualizarEmpresa(novoNomeEmpresa, novoRazaoSocial, novoCnpj, novoCidade, idEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a atualização da empresa! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function removerEmpresa(req,res){
    var idEmpresa = req.params.idEmpresa;

    empresaModel.removerEmpresa(idEmpresa) 
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar a empresa: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}



module.exports = {
    cadastrarEmpresa,
    listarDadosPorEmpresa,
    atualizarEmpresa,
    removerEmpresa
}