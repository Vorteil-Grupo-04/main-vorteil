DROP DATABASE vorteil;
CREATE DATABASE vorteil;
USE vorteil;

CREATE TABLE empresaTuristica (
    idEmpresa INT AUTO_INCREMENT PRIMARY KEY,
    nomeEmpresa VARCHAR(45) NOT NULL,
    razaoSocial VARCHAR(45) NOT NULL,
    cnpj VARCHAR(45) NOT NULL,
    cidade VARCHAR (45) NOT NULL,
    token VARCHAR(45)
);

CREATE TABLE cargo(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45)
);

INSERT INTO cargo (nome) VALUES ('Responsável Fiscal'); 
INSERT INTO cargo (nome) VALUES ('Funcionario');

CREATE TABLE usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL ,
    email VARCHAR(45) NOT NULL UNIQUE,
    senha VARCHAR(45) NOT NULL,
    fkEmpresa INT DEFAULT NULL,
	FOREIGN KEY (fkEmpresa) REFERENCES empresaTuristica(idEmpresa),
    fkCargo INT NOT NULL,
    FOREIGN KEY (fkCargo) REFERENCES cargo(id)
);

CREATE TABLE token(
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo CHAR(8),
    dataCriacao DATE,
    dataExpiracao DATE,
    statusToken VARCHAR(45),
    fkEmpresa INT NOT NULL,
    FOREIGN KEY (fkEmpresa) REFERENCES empresaTuristica(idEmpresa)
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