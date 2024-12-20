
var database = require("../database/config");

function insertToken(token, idEmpresa) {
    console.log("ACESSEI O EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa():", token, idEmpresa);
    
    var instrucaoSql = `
        INSERT INTO token (codigo, fkEmpresa, statusToken) VALUES ('${token}', ${idEmpresa}, "ativo");
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
};

function deleteToken(tokenCodigo, idEmpresa) {
    console.log("ACESSEI O EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa():", tokenCodigo, idEmpresa);
    
    var instrucaoSql = `
        delete from token where fkEmpresa = ${idEmpresa} and codigo = "${tokenCodigo}";
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
};


function updateToken(tokenCodigo, idEmpresa, status) {
    console.log("ACESSEI O EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa():", tokenCodigo, idEmpresa, status);
    
    var instrucaoSql = `
        UPDATE token
        SET statusToken =  "${status}"
        WHERE codigo = "${tokenCodigo}" 
        AND fkEmpresa = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
};

function selectToken(tokenCodigo, idEmpresa) {
    console.log("ACESSEI O EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa():", tokenCodigo, idEmpresa);
    
    var instrucaoSql = `
            SELECT 
            dataExpiracao,
            statusToken
        FROM token
        WHERE codigo = '${tokenCodigo}' AND fkEmpresa = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
};

module.exports = {
    insertToken,
    deleteToken,
    updateToken,
    selectToken
};