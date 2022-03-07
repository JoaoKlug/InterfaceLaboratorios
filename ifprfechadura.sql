CREATE DATABASE db_tcc;
USE db_tcc;

CREATE TABLE IF NOT EXISTS tbCargo
(
	id SERIAL NOT NULL,
	nome_cargo character varying(50) NOT NULL,
	CONSTRAINT tbCargo_pkey PRIMARY KEY (id),
    CONSTRAINT tbCargo_nome_cargo_key UNIQUE (nome_cargo)
);

CREATE TABLE IF NOT EXISTS tbPessoa
(
    id SERIAL NOT NULL,
    nome_pessoa character varying(50) NOT NULL,
    cracha_pessoa bigint NOT NULL,
    matricula_pessoa bigint NOT NULL,
	ativo character varying(1) default 'S' NOT NULL,
	ano_entrada integer NOT NULL,
	id_cargo_pessoa integer NOT NULL,
    CONSTRAINT tbPessoa_pkey PRIMARY KEY (id),
    CONSTRAINT tbPessoa_cracha_pessoa_key UNIQUE (cracha_pessoa),
    CONSTRAINT tbPessoa_pessoa_key UNIQUE (matricula_pessoa),
    CONSTRAINT tbPessoa_nome_pessoa_key UNIQUE (nome_pessoa),
	CONSTRAINT tbPessoa_tbCargo_fk FOREIGN KEY(id_cargo_pessoa)
	REFERENCES tbCargo(id)
);

CREATE TABLE IF NOT EXISTS tbDirecaoEnsino
(
	id SERIAL NOT NULL,
	email_direcaoEnsino character varying(50) NOT NULL,
	senha_direcaoEnsino character varying(50) NOT NULL,
	id_pessoa integer NOT NULL,
	CONSTRAINT tbDirecaoEnsino_pkey PRIMARY KEY(id),
	CONSTRAINT tbDirecaoEnsino_email_direcaoEnsino_key UNIQUE(email_direcaoEnsino),
	CONSTRAINT tbDirecaoEnino_tbPessoa_fk FOREIGN KEY(id_pessoa)
	REFERENCES tbPessoa (id)
);

CREATE TABLE IF NOT EXISTS tbFechadura
(
	id SERIAL NOT NULL ,
	nome_fechadura character varying(10) NOT NULL,
	estado_fechadura boolean DEFAULT 'true' NOT NULL ,
	CONSTRAINT tbFechadura_pkey PRIMARY KEY(id),
	CONSTRAINT tbFechadura_nome_fechadura_key UNIQUE(nome_fechadura)
);

CREATE TABLE IF NOT EXISTS tbRegistro
(
	id SERIAL NOT NULL,
	data_hora timestamp NOT NULL,
	id_fechadura integer NOT NULL,
	id_pessoa integer NOT NULL,
	CONSTRAINT tbRegistro_pkey PRIMARY KEY(id),
	CONSTRAINT tbRegistro_tbFechadura_fk FOREIGN KEY(id_fechadura)
	REFERENCES tbFechadura(id),
	CONSTRAINT tbRegistro_tbPessoa_fk FOREIGN KEY(id_pessoa)
	REFERENCES tbPessoa(id)
);

INSERT INTO tbCargo(nome_cargo) VALUES('aluno');
INSERT INTO tbCargo(nome_cargo) VALUES('professor');
INSERT INTO tbCargo(nome_cargo) VALUES('servidor');

INSERT INTO tbPessoa(nome_pessoa, cracha_pessoa, matricula_pessoa, id_cargo_pessoa, ativo, ano_entrada) VALUES('pessoa1', '6224966', '20203018810', (select id from tbCargo where nome_cargo='aluno'), 'S', 2019)
INSERT INTO tbPessoa(nome_pessoa, cracha_pessoa, matricula_pessoa, id_cargo_pessoa, ativo, ano_entrada) VALUES('pessoa2', '7058559', '20203018811', (select id from tbCargo where nome_cargo='professor'), 'S', 2019)
INSERT INTO tbPessoa(nome_pessoa, cracha_pessoa, matricula_pessoa, id_cargo_pessoa, ativo, ano_entrada) VALUES('pessoa3', '17507995', '20203018812', (select id from tbCargo where nome_cargo='servidor'), 'S', 2019)

INSERT INTO tbFechadura(nome_fechadura) VALUES('LAB1');
INSERT INTO tbFechadura(nome_fechadura) VALUES('LAB2');
INSERT INTO tbFechadura(nome_fechadura) VALUES('LAB3');
INSERT INTO tbFechadura(nome_fechadura) VALUES('LAB4');
INSERT INTO tbFechadura(nome_fechadura) VALUES('LABJOGOS');
INSERT INTO tbFechadura(nome_fechadura) VALUES('LABTELECOM');
INSERT INTO tbFechadura(nome_fechadura) VALUES('LABPROJETO');
INSERT INTO tbFechadura(nome_fechadura) VALUES('LABELETRO');
INSERT INTO tbFechadura(nome_fechadura) VALUES('LABEDIFICA');