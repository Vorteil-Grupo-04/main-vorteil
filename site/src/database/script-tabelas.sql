
CREATE DATABASE vorteilTeste;
USE vorteilTeste;

CREATE TABLE responsavelFiscal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NULL,
    email VARCHAR(45) NULL,
    senha VARCHAR(45) NULL
);

CREATE TABLE endereco (
    cep VARCHAR(45) NOT NULL PRIMARY KEY,
    cidade VARCHAR(45) NULL,
    numero VARCHAR(45) NULL,
    logradouro VARCHAR(45) NULL
);

CREATE TABLE empresaTuristica (
    id INT AUTO_INCREMENT PRIMARY KEY,
    CNPJ VARCHAR(45) NOT NULL,
    nome VARCHAR(45) NULL,
    token VARCHAR(45) NULL,
    fkResponsavel INT NOT NULL,
    fkEndereco VARCHAR(45) NOT NULL,
    FOREIGN KEY (fkResponsavel) REFERENCES responsavelFiscal(id),
    FOREIGN KEY (fkEndereco) REFERENCES endereco(cep)
);

CREATE TABLE funcionario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NULL,
    email VARCHAR(45) NULL,
    senha VARCHAR(45) NULL,
    fkEmpresa INT NOT NULL,
    FOREIGN KEY (fkEmpresa) REFERENCES empresaTuristica(id)
);

CREATE TABLE companhiaAerea (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sigla VARCHAR(45) NULL,
    nome VARCHAR(45) NULL
);

CREATE TABLE aeroportoSaida (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NULL,
    sigla VARCHAR(4) NULL,
    UF VARCHAR(45) NULL
);

CREATE TABLE aeroportoDestino (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NULL,
    sigla VARCHAR(45) NULL,
    UF VARCHAR(45) NULL
);

CREATE TABLE viagemAerea (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fkCompanhiaAerea INT NOT NULL,
    fkAeroportoSaida INT NOT NULL,
    fkAeroportoDestino INT NOT NULL,
    porcentagemCancelamentos INT NULL,
    atraso30min INT NULL,
    atraso60min INT NULL,
    FOREIGN KEY (fkCompanhiaAerea) REFERENCES companhiaAerea(id),
    FOREIGN KEY (fkAeroportoSaida) REFERENCES aeroportoSaida(id),
    FOREIGN KEY (fkAeroportoDestino) REFERENCES aeroportoDestino(id)
);
