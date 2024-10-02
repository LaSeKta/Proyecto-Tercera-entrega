-- Crear la base de datos
CREATE DATABASE gimnasioDB;

-- Seleccionar la base de datos
USE gimnasioDB;

-- Crear la tabla 'usuario'
CREATE TABLE usuario (
    ci INT PRIMARY KEY,         -- CI como clave primaria
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE
);

-- Crear la tabla 'persona'
CREATE TABLE persona (
    ci INT PRIMARY KEY,         -- CI como clave primaria y también referencia la de 'usuario'
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE,
    genero VARCHAR(10),
    telefono VARCHAR(15),
    direccion VARCHAR(255),
    FOREIGN KEY (ci) REFERENCES usuario(ci)  -- Clave foránea referenciando a 'usuario'
);

-- Crear la tabla 'entrenador'
CREATE TABLE entrenador (
    ci INT PRIMARY KEY,         -- CI como clave primaria que hereda de 'persona'
    especialidad VARCHAR(100),
    experiencia INT,            -- Años de experiencia
    salario DECIMAL(10, 2),
    FOREIGN KEY (ci) REFERENCES persona(ci)  -- Clave foránea referenciando a 'persona'
);

-- Crear la tabla 'cliente'
CREATE TABLE cliente (
    ci INT PRIMARY KEY,         -- CI como clave primaria que hereda de 'persona'
    fecha_inicio DATE,          -- Fecha de inicio del cliente en el sistema
    membresia VARCHAR(50),      -- Tipo de membresía
    objetivos TEXT,             -- Objetivos del cliente
    FOREIGN KEY (ci) REFERENCES persona(ci)  -- Clave foránea referenciando a 'persona'
);

insert into usuario (ci, username, password, email) values
(12345678, 'admin', 'admin', 'a@a.com'),
(12345679, 'user', 'user', 'b@b.com');