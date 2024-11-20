
CREATE DATABASE vorteilTeste;
USE vorteilTeste;


CREATE TABLE empresaTuristica (
    id INT AUTO_INCREMENT PRIMARY KEY,
    CNPJ VARCHAR(45) NOT NULL,
    nome VARCHAR(45) NOT NULL,
    razaoSocial VARCHAR(45) NOT NULL,
    token VARCHAR(45) NOT NULL
);

CREATE TABLE cargo(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45)
)

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NULL,
    email VARCHAR(45) NULL,
    senha VARCHAR(45) NULL,
    fkEmpresa INT NOT NULL,
    FOREIGN KEY (fkEmpresa) REFERENCES empresaTuristica(id)
    fkCargo INT NOT NULL,
    FOREIGN KEY (fkCargo) REFERENCES cargo(id)
);

CREATE TABLE token(
    id INT AUTO_INCREMENT PRIMARY KEY,
    dataCriacao DATE,
    dataExpiracao DATE,
    statusToken VARCHAR(45),
    fkEmpresa INT NOT NULL,
    FOREIGN KEY (fkEmpresa) REFERENCES empresaTuristica(id)
)



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
