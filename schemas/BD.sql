-- BD Producción
-- CREATE DATABASE IF NOT EXISTS heroku_8710917fecf1cf0;
-- USE heroku_8710917fecf1cf0;

-- BD Beta
CREATE DATABASE IF NOT EXISTS heroku_314befdd836197e;
USE heroku_314befdd836197e;

-- Roles que pueden tener cada Entity
CREATE TABLE rol (
    id_role TINYINT AUTO_INCREMENT,
    name VARCHAR(10) NOT NULL,
    PRIMARY KEY(id_role)
);

-- Etiquetas que describen cada Entity y Activity
CREATE TABLE tags (
	id_tags INT AUTO_INCREMENT,
	name VARCHAR(20) NOT NULL,
	PRIMARY KEY (id_tags)
);

-- Entidades, son tanto participantes como creadores de contenidos.
-- También son establecimientos que ofertan sus actividades (se distinguen por el role)
CREATE TABLE entity (
    id_entity INT AUTO_INCREMENT,
    id_role TINYINT NOT NULL,
    nick VARCHAR(10) NOT NULL,
    name VARCHAR(30) NOT NULL,
    surname VARCHAR(120),
    description VARCHAR(500) NOT NULL,
    mail VARCHAR(120) NOT NULL,
    phone INT NOT NULL, 
    location VARCHAR(100) NOT NULL,
    pass VARCHAR(30) NOT NULL,
    avatar LONGTEXT NOT NULL,
    PRIMARY KEY (id_entity),
    FOREIGN KEY (id_role) REFERENCES rol (id_role)
);

-- Actividades ofertadas
CREATE TABLE activity (
    id_activity INT AUTO_INCREMENT,
    id_entity_creador INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(500) NOT NULL,
    seats INT NOT NULL,
    price DOUBLE NOT NULL,
    location VARCHAR(100) NOT NULL,
    dateAct DATE NOT NULL,
    min_duration INT NOT NULL,
    PRIMARY KEY(id_activity),
    FOREIGN KEY (id_entity_creador) REFERENCES entity (id_entity)
);

-- Comentarios asociados a cada Actividad
CREATE TABLE review (
    id_review INT AUTO_INCREMENT,
    id_activity INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    points TINYINT NOT NULL,
    PRIMARY KEY(id_review),
    FOREIGN KEY (id_activity) REFERENCES activity (id_activity)
);

-- Listado de participantes que hay apuntados en una actividad
CREATE TABLE entityToActivity(
	id_entity INT NOT NULL,
    id_activity INT NOT NULL,
	FOREIGN KEY (id_entity) REFERENCES entity (id_entity),
	FOREIGN KEY (id_activity) REFERENCES activity (id_activity)
);

-- Listado de Etiquetas que tiene una Entidad, es decir
-- Los gustos a los que les gustaría suscribirse
CREATE TABLE tags_ent (
	id_entity INT,
    id_tags INT,
	PRIMARY KEY (id_tags, id_entity),
	FOREIGN KEY (id_tags) REFERENCES tags (id_tags),
	FOREIGN KEY (id_entity) REFERENCES entity (id_entity)
);

-- Listado de Etiquetas que tiene una Actividad, es decir
-- Los gustos que los identifica ante una Entidad
CREATE TABLE tags_act (
	id_activity INT,
    id_tags INT,
	PRIMARY KEY (id_tags, id_activity),
	FOREIGN KEY (id_tags) REFERENCES tags (id_tags),
	FOREIGN KEY (id_activity) REFERENCES activity (id_activity)
);