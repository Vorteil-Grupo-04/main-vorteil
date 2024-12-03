var express = require("express");
var router = express.Router();

var notificacaoController = require("../controllers/notificacaoController");

router.get("/alertar/", function (req, res) {
    notificacaoController.alertar(req, res);
});

module.exports = router;