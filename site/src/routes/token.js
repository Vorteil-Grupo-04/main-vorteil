var express = require("express");
var router = express.Router();


var tokenController = require("../controllers/tokenController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/insertToken", function (req, res) {
    tokenController.insertToken(req, res);
})

router.post("/deleteToken", function (req, res) {
    tokenController.deleteToken(req, res);
})

router.post("/selectToken", function (req, res) {
    tokenController.selectToken(req, res);
})

router.put("/updateToken", function (req, res) {
    tokenController.updateToken(req, res);
})

module.exports = router;
