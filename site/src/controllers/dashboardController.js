var dashboardModel = require("../models/dashboardModel");
function comoComprou(req, res) {
    dashboardModel
      .puxarComoComprou()
      .then(function (resultadoAutenticar) {
        console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String
        if (resultadoAutenticar.length >= 1) {
            console.log(resultadoAutenticar);
            console.log("to aqui")
            res.status(200).json(
              resultadoAutenticar);
        
        } else if (resultadoAutenticar.length == 0) {
          res.status(403).send("Deu ruim");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao trazer dados",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
function faixaEtaria(req, res) {
    dashboardModel
      .puxarFaixaEtaria()
      .then(function (resultadoAutenticar) {
        console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String
        if (resultadoAutenticar.length >= 1) {
            console.log(resultadoAutenticar);
            console.log("to aqui")
            res.status(200).json(
              resultadoAutenticar);
        
        } else if (resultadoAutenticar.length == 0) {
          res.status(403).send("Deu ruim");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao trazer dados",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
function dadosKPIAero(req, res) {
    dashboardModel
      .puxarDadosKPIAero()
      .then(function (resultadoAutenticar) {
        console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String
        if (resultadoAutenticar.length >= 1) {
            console.log(resultadoAutenticar);
            console.log("to aqui")
            res.status(200).json(
              resultadoAutenticar);
        
        } else if (resultadoAutenticar.length == 0) {
          res.status(403).send("Deu ruim");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao trazer dados",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
function dadosKPI(req, res) {
    dashboardModel
      .puxarDadosKPI()
      .then(function (resultadoAutenticar) {
        console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String
        if (resultadoAutenticar.length >= 1) {
            console.log(resultadoAutenticar);
            console.log("to aqui")
            res.status(200).json(
              resultadoAutenticar);
        
        } else if (resultadoAutenticar.length == 0) {
          res.status(403).send("Deu ruim");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao trazer dados",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
  function atrasosEmpresa(req, res) {
    dashboardModel
      .puxarDadoEmpresaAtrasos()
      .then(function (resultadoAutenticar) {
        console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String
        if (resultadoAutenticar.length >= 1) {
            console.log(resultadoAutenticar);
            console.log("to aqui")
            res.status(200).json(
              resultadoAutenticar);
        
        } else if (resultadoAutenticar.length == 0) {
          res.status(403).send("Deu ruim");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao trazer dados",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
function atrasosAeroporto(req, res) {
    dashboardModel
      .puxarDadoAeroportoAtrasos()
      .then(function (resultadoAutenticar) {
        console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String
        if (resultadoAutenticar.length >= 1) {
            console.log(resultadoAutenticar);
            console.log("to aqui")
            res.status(200).json(
              resultadoAutenticar);
        
        } else if (resultadoAutenticar.length == 0) {
          res.status(403).send("Deu ruim");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao trazer dados",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
function cancelamentosAeroporto(req, res) {
    dashboardModel
      .puxarDadoAeroportoCancelamento()
      .then(function (resultadoAutenticar) {
        console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String
        if (resultadoAutenticar.length >= 1) {
            console.log(resultadoAutenticar);
            console.log("to aqui")
            res.status(200).json(
              resultadoAutenticar);
        
        } else if (resultadoAutenticar.length == 0) {
          res.status(403).send("Deu ruim");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao trazer dados",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
function cancelamentosEmpresa(req, res) {

      dashboardModel
        .puxarDadoEmpresaCancelamento()
        .then(function (resultadoAutenticar) {
          console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
          console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String
  
          if (resultadoAutenticar.length >= 1) {
            console.log(resultadoAutenticar);
            console.log("to aqui")
            res.status(200).json(
              resultadoAutenticar);
        
          } else if (resultadoAutenticar.length == 0) {
            res.status(403).send("Deu ruim");
          }
        })
        .catch(function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao trazer dados",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        });
    }
    module.exports = {
        cancelamentosEmpresa,
        cancelamentosAeroporto,
        atrasosEmpresa,
        atrasosAeroporto,
        dadosKPI,
        dadosKPIAero,
        faixaEtaria,
        comoComprou,
       
    };
