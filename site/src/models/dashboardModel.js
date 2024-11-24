var database = require("../database/config")


function puxarDadoAeroportoAtrasos() {
    console.log(
      "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    );
    var instrucaoSql = `
         SELECT 
    nomeAeroportoDestino, 
    AVG(porcentAtrasoSuperior30) AS mediaAtrasoSuperior30
FROM vorteil
GROUP BY nomeAeroportoDestino
ORDER BY mediaAtrasoSuperior30 DESC
LIMIT 6;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }
function puxarDadoEmpresaAtrasos() {
    console.log(
      "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    );
    var instrucaoSql = `
        
SELECT 
    empresaAerea, 
    AVG(porcentAtrasoSuperior30) AS mediaAtrasoSuperior30
FROM vorteil
GROUP BY empresaAerea
ORDER BY mediaAtrasoSuperior30 DESC
LIMIT 6;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }

  function puxarDadoEmpresaCancelamento() {
    console.log(
      "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    );
    var instrucaoSql = `
         
SELECT 
    empresaAerea, 
    AVG(porcentCancelamentos) AS mediaCancelamentos,
    AVG(porcentAtrasoSuperior30) AS mediaAtrasos30Min,
    AVG(porcentAtrasoSuperior60) AS mediaAtrasos60Min
FROM vorteil
GROUP BY empresaAerea
ORDER BY mediaCancelamentos DESC,
    mediaAtrasos30Min DESC, 
    mediaAtrasos60Min DESC
LIMIT 6;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }
function puxarDadosKPIAero() {
    console.log(
      "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    );
    var instrucaoSql = `
         
SELECT 
    nomeAeroportoSaida,
    AVG(porcentCancelamentos) AS mediaCancelamentos,
    AVG(porcentAtrasoSuperior30) AS mediaAtrasos30Min,
    AVG(porcentAtrasoSuperior60) AS mediaAtrasos60Min
FROM 
    vorteil
GROUP BY 
    nomeAeroportoSaida
ORDER BY 
    mediaCancelamentos DESC, 
    mediaAtrasos30Min DESC, 
    mediaAtrasos60Min DESC
LIMIT 1;

    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }
  function puxarDadosKPI() {
    console.log(
      "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    );
    var instrucaoSql = `
         
SELECT 
    empresaAerea,
    AVG(porcentCancelamentos) AS mediaCancelamentos
FROM 
    vorteil
GROUP BY 
    empresaAerea
ORDER BY 
    mediaCancelamentos DESC
LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }


  function puxarDadoAeroportoCancelamento() {
    console.log(
      "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    );
    var instrucaoSql = `
         SELECT 
    nomeAeroportoSaida, 
    AVG(porcentCancelamentos) AS mediaCancelamentos
FROM vorteil
GROUP BY nomeAeroportoSaida
ORDER BY mediaCancelamentos DESC
LIMIT 6;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }

module.exports = {
    puxarDadoAeroportoCancelamento,
    puxarDadoEmpresaCancelamento,
    puxarDadoAeroportoAtrasos,
    puxarDadoEmpresaAtrasos,
    puxarDadosKPI,
    puxarDadosKPIAero
};