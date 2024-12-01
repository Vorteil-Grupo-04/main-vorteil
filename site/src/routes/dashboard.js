var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.get("/cancelamentosEmpresa", function (req, res) {
    dashboardController.cancelamentosEmpresa(req, res);
})
router.get("/cancelamentosAeroporto", function (req, res) {
    dashboardController.cancelamentosAeroporto(req, res);
})
router.get("/atrasosEmpresa", function (req, res) {
    dashboardController.atrasosEmpresa(req, res);
})
router.get("/atrasosAeroporto", function (req, res) {
    dashboardController.atrasosAeroporto(req, res);
})
router.get("/puxarDadosKPI", function (req, res) {
    dashboardController.dadosKPI(req, res);
})
router.get("/puxarDadosKPIAero", function (req, res) {
    dashboardController.dadosKPIAero(req, res);
})
router.get("/comoComprou", function (req, res) {
    dashboardController.comoComprou(req, res);
})
router.get("/faixaEtaria", function (req, res) {
    dashboardController.faixaEtaria(req, res);
})




module.exports = router;