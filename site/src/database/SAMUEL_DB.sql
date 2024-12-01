
CREATE DATABASE vorteil;
USE vorteil;
drop database vorteil;


CREATE TABLE empresaTuristica (
    id INT AUTO_INCREMENT PRIMARY KEY,
    CNPJ VARCHAR(45) NOT NULL,
    nome VARCHAR(45) NOT NULL,
    razaoSocial VARCHAR(45) NOT NULL,
    token VARCHAR(45) NOT NULL
);

INSERT INTO empresaTuristica (CNPJ, nome, razaoSocial, token) VALUES ('0000-0000', "Sem Empresa", "Sem Empresa", "000"); 
select * from empresaTuristica;

CREATE TABLE cargo(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45)
);

INSERT INTO cargo (nome) VALUES ('Responsável Fiscal'); 
INSERT INTO cargo (nome) VALUES ('Funcionario');

select * from cargo;

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL ,
    email VARCHAR(45) NOT NULL UNIQUE,
    senha VARCHAR(45) NOT NULL,
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES empresaTuristica(id),
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

create table atrasoCancelamento(
empresaAerea varchar(244),
siglaAeroportoSaida varchar(244),
nomeAeroportoSaida varchar(244),
ufAeroportoSaida varchar(244),
paisAeroportoSaida varchar(244),
siglaAeroportoDestino varchar(244),
nomeAeroportoDestino varchar(244),
ufAeroportoDestino varchar(244),
paisAeroportoDestino varchar(244),
porcentCancelamentos float,
porcentAtrasoSuperior30 float,
porcentAtrasoSuperior60 float
);

CREATE TABLE empresa (
    idEmpresa INT AUTO_INCREMENT PRIMARY KEY,
    nomeEmpresa VARCHAR(245) NOT NULL,
    razaoSocial VARCHAR(245) NOT NULL,
    cnpj VARCHAR(18) NOT NULL UNIQUE,
    cidade VARCHAR(245) NOT NULL
);

create table reclamacao(
comoComprouContratou varchar(244),
faixaEtaria varchar(244)
);
select * from reclamacao;



-- TESTAR ASSIM DEPOIS
CREATE TABLE empresa (
    idEmpresa INT AUTO_INCREMENT PRIMARY KEY,
    nomeEmpresa VARCHAR(245) NOT NULL,
    razaoSocial VARCHAR(245) NOT NULL,
    cnpj VARCHAR(18) NOT NULL UNIQUE,
    cidade VARCHAR(245) NOT NULL,
    fk_usuarioChefe INT NOT NULL,
    FOREIGN KEY (fk_usuarioChefe) REFERENCES usuario(idUsuario) ON DELETE CASCADE
);

select * from atrasoCancelamento;

SELECT faixaEtaria
FROM reclamacao
ORDER BY faixaEtaria DESC
LIMIT 5;

SELECT comoComprouContratou, COUNT(*) AS frequency
FROM reclamacao
GROUP BY comoComprouContratou
ORDER BY frequency DESC
LIMIT 3;

SELECT faixaEtaria, COUNT(*) AS frequency
FROM reclamacao
GROUP BY faixaEtaria
ORDER BY frequency DESC
LIMIT 5;



