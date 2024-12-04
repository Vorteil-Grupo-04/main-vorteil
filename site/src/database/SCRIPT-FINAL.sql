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
	FOREIGN KEY (fkEmpresa) REFERENCES empresaTuristica(idEmpresa) ON DELETE CASCADE,
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

-- SAMUEL PARTE
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

create table reclamacao(
comoComprouContratou varchar(244),
faixaEtaria varchar(244)
);

SELECT * FROM reclamacao;
SELECT * FROM atrasoCancelamento;
select * from usuario;
select * from empresaTuristica;