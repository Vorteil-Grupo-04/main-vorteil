var notificacaoModel = require("../models/notificacaoModel");

function alertar(req, res) {
    let numeros = [];

    notificacaoModel.alertar()
        .then((resultado) => {
            console.log(`\nResultados encontrados: ${resultado.length}`);
            // console.log(`Resultados: ${JSON.stringify(resultado)}`);
            for (var i = 0; i < resultado.length; i++) {
                numeros.push(resultado[i].porcentCancelamentos);
            }
            res.status(200).json({
                numeros,
            });
        })
        .catch((e) => {
            console.log(e);
            res.status(500).send("Erro ao buscar os dados.");
        });
}

module.exports = {
    alertar
}