CREATE database plantai_db;
USE plantai_db;

CREATE table usuarios(
  id int auto_increment primary key,
  contrasena char(76) not null,
  rut varchar(10) not null,
  id_tipo_usuario int not null,       -- f key
  nombre_usuario varchar(25),
  nombre varchar(25),    
  apellido varchar(25),
  email varchar(50),
  telefono varchar(12),
  genero varchar(10),
  fecha_nacimiento date
);

CREATE table direcciones(
  id int auto_increment primary key,
  id_usuario int,    -- f key
  comuna varchar(20),
  calle varchar(50),
  numero varchar(5),
  departamento varchar(4),
  referencia varchar(200)
);

CREATE table tipo_usuarios(
  id int auto_increment primary key,
  tipo varchar(15)
);

CREATE table usuarios_medios_pagos(
  id_usuario int,  -- f key
  id_medio_pago int, -- f key
  es_preferido bool
);


CREATE table productos(
  id int auto_increment primary key,
  SKU varchar(12),
  nombre varchar(50),
  id_categoria int, -- f key
  precio int,
  descripcion varchar(2048), 
  imagen varchar(200),
  cantidad int,
  unidades_vendidas int, 
  puntuacion decimal(3, 2),
  ancho int,
  alto int,
  largo int,
  peso int
);

CREATE table etiquetas(
  id_etiqueta int auto_increment primary key,
  etiqueta varchar(20)
);

CREATE table productos_etiquetas(
  id_producto int, -- f key
  id_etiqueta int -- f key
);

CREATE table pedidos(
  id int auto_increment primary key,
  id_usuario int, -- f key
  fecha_creacion date,
  id_medio_pago int, -- f key
  id_estado int, -- f key
  id_tipo_despacho int, -- f key
  id_carro int, -- f key
  fecha_entrega date
);

CREATE table carros(
  id int auto_increment primary key,
  id_usuario int, -- f key
  fecha_creacion date,
  fecha_cierre date  
);

CREATE table pagos(
  id int auto_increment primary key,
  id_medio_pago int, -- f key
  id_pedido int, -- f key
  fecha datetime, 
  monto int
);

CREATE table medio_pago(
  id int auto_increment primary key,
  nombre varchar(20),
  habilitado bool
);

CREATE table tipo_despacho(
  id int auto_increment primary key,
  tipo varchar(20)
);

CREATE table estados_pedido(
  id int auto_increment primary key,
  estado varchar(12)
);


CREATE table categorias(
  id int auto_increment primary key,
  categoria varchar(10)
);