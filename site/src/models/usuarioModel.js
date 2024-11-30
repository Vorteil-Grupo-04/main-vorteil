var database = require("../database/config")

function autenticar(email, senha) {
    console.log(
      "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
      email,
      senha
    );
    var instrucaoSql = `
          SELECT idUsuario, usuario.nome, email, fkEmpresa FROM usuario WHERE email = '${email}' AND senha = '${senha}';
      `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }


// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrarFiscal(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');
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
    database.executar(instrucaoSql);

    return database.executar(instrucaoSql);
}


module.exports = {
    autenticar,
    cadastrar, 
    cadastrarEmpresa,
    atualizarSenha,
    listarDadosPorUsuario,
    atualizarUsuario,
    removerUsuario
};