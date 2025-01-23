-- Tabla de promociones
CREATE TABLE promociones(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    descripcion varchar(100),
    codigo varchar(20), -- Clave para activar el cupón. Ejemplo: bootcamp2024
    tipo ENUM("TRADICIONAL", "CUPON"),  -- Si se aplica por defecto o si hay que validarlo con cupón
    habilitado BOOLEAN,
    fecha_inicio DATE NOT NULL,
    fecha_termino DATE NOT NULL,
    fecha_eliminacion DATE, -- Para softdelete
    productos_asignados ENUM("TODOS", "SELECCIONADOS"),
    tipo_descuento ENUM("PORCENTAJE", "FIJO"), -- Si será un descuento por porcentaje o le dará un valor nuevo al producto
    valor INT   -- Valor del % de descuento o del precio fijo
);

-- Tabla de productos seleccionados por promoción
CREATE TABLE productos_promociones(
    id_producto INT,
    id_promocion INT,
    PRIMARY KEY (id_producto, id_promocion),
    FOREIGN KEY (id_producto) REFERENCES productos(id),
    FOREIGN KEY (id_promocion) REFERENCES promociones(id)
);

