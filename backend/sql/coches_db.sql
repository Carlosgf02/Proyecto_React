-- Crear la base de datos
CREATE DATABASE coches_db;
USE coches_db;

-- Crear la tabla de Marcas
CREATE TABLE marcas (
    id_marca INT AUTO_INCREMENT PRIMARY KEY,  -- Entero
    nombre VARCHAR(100) NOT NULL,  -- Cadena de texto
    pais VARCHAR(100),  -- Cadena de texto
    fundacion YEAR,  -- Fecha
    activo BOOLEAN DEFAULT TRUE,  -- Booleano
    logo VARCHAR(255),  -- Cadena de texto
    valor_mercado DECIMAL(15,2) -- Real (millones de dólares)
);

-- Crear la tabla de Modelos
CREATE TABLE modelos (
    id_modelo INT AUTO_INCREMENT PRIMARY KEY,  -- Entero
    nombre VARCHAR(100) NOT NULL,  -- Cadena de texto
    tipo VARCHAR(50),  -- Cadena de texto
    precio DECIMAL(10,2),  -- Real
    fecha_lanzamiento DATE,  -- Fecha
    disponible BOOLEAN DEFAULT TRUE,  -- Booleano
    potencia_hp INT,  -- Entero
    consumo_litros FLOAT,  -- Real
    id_marca INT,  -- Entero (FK)
    FOREIGN KEY (id_marca) REFERENCES marcas(id_marca) ON DELETE CASCADE
);

-- Crear la tabla de Marcas
CREATE TABLE marcas (
    id_marca INT AUTO_INCREMENT PRIMARY KEY,  -- Entero
    nombre VARCHAR(100) NOT NULL,  -- Cadena de texto
    pais VARCHAR(100),  -- Cadena de texto
    fundacion YEAR,  -- Fecha
    activo BOOLEAN DEFAULT TRUE,  -- Booleano
    logo VARCHAR(255),  -- Cadena de texto
    valor_mercado DECIMAL(15,2) -- Real (millones de dólares)
);

-- Crear la tabla de Modelos
CREATE TABLE modelos (
    id_modelo INT AUTO_INCREMENT PRIMARY KEY,  -- Entero
    nombre VARCHAR(100) NOT NULL,  -- Cadena de texto
    tipo VARCHAR(50),  -- Cadena de texto
    precio DECIMAL(10,2),  -- Real
    fecha_lanzamiento DATE,  -- Fecha
    disponible BOOLEAN DEFAULT TRUE,  -- Booleano
    potencia_hp INT,  -- Entero
    consumo_litros FLOAT,  -- Real
    id_marca INT,  -- Entero (FK)
    FOREIGN KEY (id_marca) REFERENCES marcas(id_marca) ON DELETE CASCADE
);
