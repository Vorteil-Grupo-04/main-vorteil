var database = require("../database/config");

function cadastrarEmpresa(nomeEmpresa, razaoSocial, cnpj, cidade) {
    console.log("ACESSEI O EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa():", nomeEmpresa, razaoSocial, cnpj, cidade);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO empresaTuristica (nomeEmpresa, razaoSocial, cnpj, cidade) VALUES ('${nomeEmpresa}', '${razaoSocial}', '${cnpj}', '${cidade}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    attfk(cnpj);
    return database.executar(instrucaoSql);
};

function attfk(cnpj){
    console.log("cheguei e dei erro na function attfk():");
    //ESSA FUNÇÃO SERVE PARA ATRIBUIR O ID DA EMPRESA CRIADA AO PROPRIO USUARIO COM UM UPDATE NO BANCO

    var instrucaoSql = `
    UPDATE usuario JOIN empresaTuristica ON cnpj = '${cnpj}'
    SET fkEmpresa = empresaTuristica.idEmpresa WHERE fkEmpresa IS NULL;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarDadosPorEmpresa(idEmpresa){
    console.log("ACESSEI O EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarDadosPorEmpresa():", idEmpresa);
// SELECT * FROM empresa WHERE fk_empresa = ${idEmpresa}; - estava antes
    var instrucaoSql = `
        SELECT * FROM empresaTuristica JOIN usuario on fkEmpresa = idEmpresa WHERE fkEmpresa = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarEmpresa(novoNomeEmpresa, novoRazaoSocial, novoCnpj, novoCidade, idEmpresa){
    console.log(
        "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarEmpresa():",
        novoNomeEmpresa, novoRazaoSocial, novoCnpj, novoCidade, idEmpresa
      );

      var instrucaoSql = `
      UPDATE empresaTuristica SET nomeEmpresa = '${novoNomeEmpresa}', razaoSocial = '${novoRazaoSocial}', cnpj = '${novoCnpj}', cidade = '${novoCidade}' WHERE idEmpresa = ${idEmpresa};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function removerEmpresa(idEmpresa){
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function removerEmpresa():", idEmpresa);
    
    var instrucaoSql1 = `
        UPDATE usuario SET fkEmpresa = NULL WHERE fkEmpresa = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql1);
    database.executar(instrucaoSql1);
    
    var instrucaoSql = `
        DELETE FROM empresaTuristica WHERE idEmpresa = ${idEmpresa};
    `;
    console.log("Executando a segunda instrução SQL: \n" + instrucaoSql);
    database.executar(instrucaoSql);

    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarEmpresa,
    listarDadosPorEmpresa,
    atualizarEmpresa,
    removerEmpresa
};