CREATE DATABASE sekta;

USE sekta;

CREATE TABLE IF NOT EXISTS usuarios (
  `CI` varchar(50) NOT NULL PRIMARY KEY,
  `contrasena` varchar(255) NOT NULL,
  `id_rol` int NOT NULL
);

CREATE TABLE IF NOT EXISTS personas (
  `id_persona` varchar(50) NOT NULL PRIMARY KEY,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  FOREIGN KEY (`id_persona`) REFERENCES usuarios(`CI`)
);

CREATE TABLE IF NOT EXISTS entrenador (
  `id_entrenador` varchar(50) NOT NULL PRIMARY KEY,
  FOREIGN KEY (`id_entrenador`) REFERENCES personas(`id_persona`)
);

CREATE TABLE IF NOT EXISTS clientes (
  `id_cliente` varchar(50) NOT NULL PRIMARY KEY,
  `user_estado` int NOT NULL,
  `alertas` varchar(50) NOT NULL,
  FOREIGN KEY (`id_cliente`) REFERENCES personas(`id_persona`)
);

CREATE TABLE IF NOT EXISTS pagos (
  `id_pago` int NOT NULL AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS evaluaciones (
  `id_evaluacion` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `cumplimiento_agenda` int NOT NULL,
  `resistencia_anaerobica` int NOT NULL,
  `resistencia_muscular` int NOT NULL,
  `flexibilidad` int NOT NULL,
  `resistencia_monotonia` int NOT NULL,
  `resiliencia` int NOT NULL,
  `nota` int NOT NULL
);

CREATE TABLE IF NOT EXISTS sucursales (
  `id_sucursal` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `capacidad` int
);

CREATE TABLE IF NOT EXISTS planes (
  `id_plan` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `tipo` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS ejercicios (
  `id_ejercicio` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `tipo` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS deportes (
  `id_deporte` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `tipo` varchar(50),
  `nombre` varchar(50),
  `descripcion` varchar(255)
);

CREATE TABLE IF NOT EXISTS sesiones (
  `id_sesion` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `fecha` date,
  `hora_inicio` time,
  `hora_fin` time,
  `asistencia` TINYINT(1)
);

CREATE TABLE IF NOT EXISTS horarios (
  `id_horario` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `dia` varchar(50),
  `hora_inicio` time,
  `hora_fin` time
);

CREATE TABLE IF NOT EXISTS estados (
  `id_estado` int NOT NULL AUTO_INCREMENT PRIMARY KEY
);


-- Crear tabla de equipos
CREATE TABLE IF NOT EXISTS equipos (
    id_equipo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre_equipo VARCHAR(50) NOT NULL,
    deporte VARCHAR(50) NOT NULL,
    tipo_actividad VARCHAR(50) NOT NULL
);






-- Relaciones

CREATE TABLE IF NOT EXISTS clientes_equipos (
    id_equipo INT NOT NULL,
    id_cliente VARCHAR(50) NOT NULL,
    PRIMARY KEY (id_equipo, id_cliente),
    FOREIGN KEY (id_equipo) REFERENCES equipos(id_equipo),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);


CREATE TABLE IF NOT EXISTS planes_ejercicios (
  `id_plan` int NOT NULL,
  `id_ejercicio` int NOT NULL,
  PRIMARY KEY (`id_plan`, `id_ejercicio`),
  FOREIGN KEY (`id_plan`) REFERENCES planes(`id_plan`),
  FOREIGN KEY (`id_ejercicio`) REFERENCES ejercicios(`id_ejercicio`)
);

CREATE TABLE IF NOT EXISTS clientes_estados (
  `id_cliente` varchar(50) NOT NULL,
  `id_estado` int NOT NULL,
  PRIMARY KEY (`id_cliente`, `id_estado`),
  FOREIGN KEY (`id_cliente`) REFERENCES clientes(`id_cliente`),
  FOREIGN KEY (`id_estado`) REFERENCES estados(`id_estado`)
);

CREATE TABLE IF NOT EXISTS clientes_evaluaciones (
  `id_cliente` varchar(50) NOT NULL,
  `id_evaluacion` int NOT NULL,
  `fecha_evaluacion` date,
  PRIMARY KEY (`id_cliente`, `id_evaluacion`),
  FOREIGN KEY (`id_cliente`) REFERENCES clientes(`id_cliente`),
  FOREIGN KEY (`id_evaluacion`) REFERENCES evaluaciones(`id_evaluacion`)
);

CREATE TABLE IF NOT EXISTS clientes_deportes (
  `id_cliente` varchar(50) NOT NULL,
  `id_deporte` int NOT NULL,
  PRIMARY KEY (`id_cliente`, `id_deporte`),
  FOREIGN KEY (`id_cliente`) REFERENCES clientes(`id_cliente`),
  FOREIGN KEY (`id_deporte`) REFERENCES deportes(`id_deporte`)
);

CREATE TABLE IF NOT EXISTS clientes_sesiones (
  `id_cliente` varchar(50) NOT NULL,
  `id_sesion` int NOT NULL,
  PRIMARY KEY (`id_cliente`, `id_sesion`),
  FOREIGN KEY (`id_cliente`) REFERENCES clientes(`id_cliente`),
  FOREIGN KEY (`id_sesion`) REFERENCES sesiones(`id_sesion`)
);

CREATE TABLE IF NOT EXISTS entrenador_sesiones (
  `id_entrenador` varchar(50) NOT NULL,
  `id_sesion` int NOT NULL,
  PRIMARY KEY (`id_entrenador`, `id_sesion`),
  FOREIGN KEY (`id_entrenador`) REFERENCES entrenador(`id_entrenador`),
  FOREIGN KEY (`id_sesion`) REFERENCES sesiones(`id_sesion`)
);

CREATE TABLE IF NOT EXISTS entrenador_horario (
  `id_entrenador` varchar(50) NOT NULL,
  `id_horario` int NOT NULL,
  PRIMARY KEY (`id_entrenador`, `id_horario`),
  FOREIGN KEY (`id_entrenador`) REFERENCES entrenador(`id_entrenador`),
  FOREIGN KEY (`id_horario`) REFERENCES horarios(`id_horario`)
);

CREATE TABLE IF NOT EXISTS entrenador_crea (
  `id_entrenador` varchar(50) NOT NULL,
  `id_ejercicio` int NOT NULL,
  `id_plan` int NOT NULL,
  PRIMARY KEY (`id_entrenador`, `id_ejercicio`, `id_plan`),
  FOREIGN KEY (`id_entrenador`) REFERENCES entrenador(`id_entrenador`),
  FOREIGN KEY (`id_ejercicio`) REFERENCES ejercicios(`id_ejercicio`),
  FOREIGN KEY (`id_plan`) REFERENCES planes(`id_plan`)
);

CREATE TABLE IF NOT EXISTS sucursal_horario (
  `id_sucursal` int NOT NULL,
  `id_horario` int NOT NULL,
  PRIMARY KEY (`id_sucursal`, `id_horario`),
  FOREIGN KEY (`id_sucursal`) REFERENCES sucursales(`id_sucursal`),
  FOREIGN KEY (`id_horario`) REFERENCES horarios(`id_horario`)
);

CREATE TABLE IF NOT EXISTS clientes_pagos (
  `id_cliente` varchar(50) NOT NULL,
  `id_pago` int NOT NULL,
  `fecha_pago` date,
  PRIMARY KEY (`id_cliente`, `id_pago`),
  FOREIGN KEY (`id_cliente`) REFERENCES clientes(`id_cliente`),
  FOREIGN KEY (`id_pago`) REFERENCES pagos(`id_pago`)
);

CREATE TABLE IF NOT EXISTS clientes_planes (
  `id_cliente` varchar(50) NOT NULL,
  `id_plan` int NOT NULL,
  fecha_asignacion date default current_date,
  PRIMARY KEY (`id_cliente`, `id_plan`),
  FOREIGN KEY (`id_cliente`) REFERENCES clientes(`id_cliente`),
  FOREIGN KEY (`id_plan`) REFERENCES planes(`id_plan`)

);

insert into usuarios (CI, contrasena, id_rol) values    
(99999999, '$2y$10$nDU.z2lxToX.csqMO2BViuBgvShS5/A2A/k5Hos64ywiNa8QIivDq', 10);