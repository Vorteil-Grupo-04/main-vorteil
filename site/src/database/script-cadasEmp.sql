create database if not exists vorteil;

use vorteil;

create table vorteil(
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

CREATE TABLE usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL, 
    fk_empresa INT NOT NULL,
    FOREIGN KEY (fk_empresa) REFERENCES empresa(idEmpresa) ON DELETE CASCADE
);

insert into empresa values
(default, 'Teste', 'tst', '1111111', 'sp');

insert into usuario values 
(default, 'cleber', 'cleber@gmail.com', 'cleber', 1);




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

CREATE TABLE usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    fk_empresa INT DEFAULT NULL,
    FOREIGN KEY (fk_empresa) REFERENCES empresa(idEmpresa) ON DELETE CASCADE
);
