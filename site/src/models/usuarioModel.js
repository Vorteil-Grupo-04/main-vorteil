var database = require("../database/config")

function autenticar(email, senha) {
    console.log(
      "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
      email,
      senha
    );
    var instrucaoSql = `
          SELECT idUsuario, usuario.nome, email, fkEmpresa, fkCargo FROM usuario WHERE email = '${email}' AND senha = '${senha}';
      `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }
  function cargo(id) {
    console.log(
      "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
      id
    );
    var instrucaoSql = `
    SELECT  c.nome AS nome_cargo
FROM usuario u
JOIN cargo c ON u.fkCargo = c.id where id = ${id};
      `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }

  function sessionEmpresa (idUsuario) {
    console.log(
      "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
      idUsuario
    );
    var instrucaoSql = `
          SELECT fkEmpresa FROM usuario WHERE idUsuario = '${idUsuario}';
      `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrarFuncionario(nome, email, senha, cargo, token) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, cargo, token);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha, fkCargo, fkEmpresa)
        SELECT '${nome}', '${email}', '${senha}', ${cargo}, t.fkEmpresa
        FROM token t
        WHERE t.codigo = '${token}';
    `;  
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha, cargo, empresa) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, empresa);
  
  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.

  // INSERT INTO usuario (nome, email, senha, fkCargo, fkEmpresa) VALUES ('${nome}', '${email}','${senha}', '${cargo}', '${empresa}'); - TROCAR POR ESSE QUALQUER COISA
  var instrucaoSql = `
      INSERT INTO usuario (nome, email, senha, fkCargo) VALUES ('${nome}', '${email}','${senha}', ${cargo});
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrarEmpresa(nome, email, senha, cnpj) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, cnpj);
  
  var instrucaoSql = `
      INSERT INTO empresa (cnpj, nome_empresa, email_empresa, senha_empresa) VALUES ('${cnpj}', '${nome}', '${email}', '${senha}');
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function atualizarSenha(email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    email,
    senha
  );

  var instrucaoSql = `
      UPDATE usuario
      SET senha = '${senha}'
      WHERE email = '${email}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listarDadosPorUsuario(idUsuario){
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarDadosPorUsuario():", idUsuario);

      var instrucaoSql = `
          SELECT * FROM usuario WHERE idUsuario = ${idUsuario};
      `;
      console.log("Executando a instrução SQL: \n" + instrucaoSql);
      return database.executar(instrucaoSql);
}

function atualizarUsuario(novoNomeUsuario, novoEmailUsuario, idUsuario){
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarUsuario():",
    novoNomeUsuario, novoEmailUsuario, idUsuario
  );

  var instrucaoSql = `
  UPDATE usuario SET nome = '${novoNomeUsuario}', email = '${novoEmailUsuario}' WHERE idUsuario = ${idUsuario};
`;
console.log("Executando a instrução SQL: \n" + instrucaoSql);
return database.executar(instrucaoSql);
}

function removerUsuario(idUsuario){
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function removerUsuario():", idUsuario);

    var instrucaoSql = `
        DELETE FROM usuario WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a segunda instrução SQL: \n" + instrucaoSql);

    var instrucaoSql2 = `
        DELETE FROM empresaTuristica WHERE idEmpresa = ${idUsuario};
    `;
    console.log("Executando a segunda instrução SQL: \n" + instrucaoSql2);
    database.executar(instrucaoSql2);

    return database.executar(instrucaoSql);
}

function atualizarEmpresaDoUsuario(idUsuario, fkEmpresa){
    const instrucaoSql = `UPDATE usuario set fkEmpresa = ${fkEmpresa} where idUsuario = ${idUsuario};`
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar, 
    cadastrarEmpresa,
    atualizarSenha,
    listarDadosPorUsuario,
    atualizarUsuario,
    removerUsuario,
    sessionEmpresa,
    cadastrarFuncionario,
    atualizarEmpresaDoUsuario,
    cargo
};