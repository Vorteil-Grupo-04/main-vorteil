var express = require("express");
var router = express.Router();


var tokenController = require("../controllers/tokenController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/insertToken", function (req, res) {
    tokenController.insertToken(req, res);
})

module.exports = router;
