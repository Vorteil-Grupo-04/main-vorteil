var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

//Recebendo os dados do html e direcionando para a função cadastrar de empresaController.js
router.post("/cadastrarEmpresa", function (req, res) {
    empresaController.cadastrarEmpresa(req, res);
});

router.get("/:idEmpresa", function (req, res) {
    empresaController.listarDadosPorEmpresa(req, res);
});

router.put("/atualizarEmpresa", function (req, res) {
    empresaController.atualizarEmpresa(req, res);
});

router.delete("/removerEmpresa/:idEmpresa", function (req, res) {
    empresaController.removerEmpresa(req, res);
});

// router.post("/autenticar", function (req, res) {
//     empresaController.autenticar(req, res);
// });

// router.put("/atualizarSenha", function (req, res) {
//     empresaController.atualizarSenha(req, res);
// });

module.exports = router;