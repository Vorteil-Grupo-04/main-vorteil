var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrarFiscal", function (req, res) {
    usuarioController.cadastrarFiscal(req, res);
})

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/cadastrarEmpresa", function (req, res) {
    usuarioController.cadastrarEmpresa(req, res);
});

router.put("/atualizarSenha", function (req, res) {
    usuarioController.atualizarSenha(req, res);
});

router.get("/:idUsuario", function (req, res) {
    usuarioController.listarDadosPorUsuario(req, res);
});

router.put("/atualizarUsuario", function (req, res) {
    usuarioController.atualizarUsuario(req, res);
});

router.delete("/removerUsuario/:idUsuario", function (req, res) {
    usuarioController.removerUsuario(req, res);
});

module.exports = router;