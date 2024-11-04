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
    id INT AUTO_INCREMENT PRIMARY KEY,
    CNPJ VARCHAR(18) NOT NULL UNIQUE,
    nome_empresa VARCHAR(245) NOT NULL,
    email_empresa VARCHAR(245) NOT NULL UNIQUE,
    senha_empresa VARCHAR(255) NOT NULL
);

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL, 
    fk_empresa INT NOT NULL,
    FOREIGN KEY (fk_empresa) REFERENCES empresa(id)
);

