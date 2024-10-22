
-- Inserción de datos en tipo_usuarios
INSERT INTO tipo_usuarios (tipo) VALUES
('Admin'), ('Cliente'), ('Proveedor'), ('Vendedor'), ('Distribuidor'), 
('Soporte'), ('Gerente'), ('Supervisor'), ('Contador'), ('Asistente');

-- Inserción de datos en medio_pago
INSERT INTO medio_pago (nombre, habilitado) VALUES
('Tarjeta de Crédito', true), ('Tarjeta de Débito', true), ('Transferencia', true), 
('Paypal', true), ('Criptomonedas', false), ('Efectivo', true),
('Cheque', false), ('Google Pay', false), ('Apple Pay', true), ('Mercado Pago', true);

-- Inserción de datos en usuarios
INSERT INTO usuarios (contrasena, rut, id_tipo_usuario, nombre_usuario, nombre, apellido, email, telefono, genero, fecha_nacimiento) VALUES
('password1', '12345678-9', 1, 'admin01', 'Carlos', 'Fernández', 'carlos@mail.com', '912345678', 'Masculino', '1985-01-20'),
('password2', '87654321-0', 2, 'cliente01', 'María', 'González', 'maria@mail.com', '932156789', 'Femenino', '1990-05-15'),
('password3', '11223344-5', 3, 'proveedor01', 'Jorge', 'Pérez', 'jorge@mail.com', '942567123', 'Masculino', '1982-03-11'),
('password4', '55443322-1', 4, 'vendedor01', 'Ana', 'Soto', 'ana@mail.com', '951234567', 'Femenino', '1995-06-24'),
('password5', '66778899-0', 5, 'distribuidor01', 'Luis', 'Martínez', 'luis@mail.com', '961345678', 'Masculino', '1988-08-10'),
('password6', '99887766-5', 6, 'soporte01', 'Patricia', 'Ramírez', 'patricia@mail.com', '972134567', 'Femenino', '1992-07-25'),
('password7', '22334455-0', 7, 'gerente01', 'Pedro', 'Salinas', 'pedro@mail.com', '982567134', 'Masculino', '1978-12-01'),
('password8', '33445566-7', 8, 'supervisor01', 'Elena', 'Vega', 'elena@mail.com', '993456712', 'Femenino', '1983-11-10'),
('password9', '77889900-1', 9, 'contador01', 'Gustavo', 'Orozco', 'gustavo@mail.com', '912345678', 'Masculino', '1991-09-15'),
('password10', '44556677-3', 10, 'asistente01', 'Lorena', 'Paredes', 'lorena@mail.com', '912365478', 'Femenino', '1996-10-30');

-- Inserción de datos en direcciones
INSERT INTO direcciones (id_usuario, comuna, calle, numero, departamento, referencia) VALUES
(1, 'Santiago', 'Av. Libertador', '1234', 'D101', 'Cerca del parque'),
(2, 'Providencia', 'Calle Falsa', '4567', NULL, 'Entre dos edificios'),
(3, 'Las Condes', 'Los Almendros', '7890', 'B202', NULL),
(4, 'Ñuñoa', 'San Pablo', '3456', 'C303', 'Cerca de la estación de metro'),
(5, 'La Florida', 'Vicuña Mackenna', '123', 'A404', 'Frente al supermercado'),
(6, 'Maipú', 'Pajaritos', '456', NULL, 'Al lado del parque'),
(7, 'Puente Alto', 'Concha y Toro', '789', 'D505', NULL),
(8, 'La Reina', 'Tobalaba', '1234', 'E606', 'Cerca del estadio'),
(9, 'Peñalolén', 'Los Presidentes', '5678', NULL, 'Al lado del centro comercial'),
(10, 'Macul', 'Las Torres', '9012', 'F707', NULL);

-- Inserción de datos en usuarios_medios_pagos
INSERT INTO usuarios_medios_pagos (id_usuario, id_medio_pago, es_preferido) VALUES
(1, 1, true), (2, 2, false), (3, 3, true), (4, 4, true), 
(5, 5, false), (6, 6, true), (7, 1, false), (8, 2, true), 
(9, 3, false), (10, 4, true);

-- Inserción de datos en etiquetas
INSERT INTO etiquetas (etiqueta) VALUES
('Interior'), ('Exterior'), ('Bajo mantenimiento'), 
('Pet Friendly'), ('Flores'), ('Frutales'), 
('Arbustos'), ('Trepadoras'), ('Suculentas'), ('Cactus');

-- Inserción de datos en categorias
INSERT INTO categorias (categoria) VALUES
('Plantas'), ('Maceteros'), ('Insumos'), 
('Accesorios'), ('Herramientas'), ('Semillas'), 
('Decoración'), ('Iluminación'), ('Riego'), ('Abonos');

-- Inserción de datos en productos
INSERT INTO productos (SKU, nombre, id_categoria, precio, descripcion, imagen, cantidad, unidades_vendidas, puntuacion, ancho, alto, largo, peso) VALUES
('P00001', 'Aloe Vera', 1, 5000, 'Planta medicinal', NULL, 100, 50, 4.5, 10, 20, 10, 500),
('P00002', 'Macetero de Cerámica', 2, 10000, 'Macetero blanco de cerámica', NULL, 200, 150, 4.8, 15, 25, 25, 800),
('P00003', 'Tierra para macetas', 3, 3000, 'Sustrato especial para macetas', NULL, 300, 200, 4.2, 0, 0, 0, 1000),
('P00004', 'Regadera', 4, 8000, 'Regadera de plástico', NULL, 50, 20, 4.7, 0, 0, 0, 600),
('P00005', 'Kit de Herramientas', 5, 15000, 'Kit de herramientas para jardinería', NULL, 30, 25, 4.9, 0, 0, 0, 1200),
('P00006', 'Semillas de Tomate', 6, 2000, 'Semillas orgánicas de tomate', NULL, 500, 300, 4.3, 0, 0, 0, 20),
('P00007', 'Lámpara LED para plantas', 7, 25000, 'Lámpara LED especial para plantas', NULL, 40, 10, 4.6, 0, 0, 0, 1500),
('P00008', 'Sistema de Riego', 8, 35000, 'Sistema automático de riego', NULL, 20, 15, 4.8, 0, 0, 0, 3000),
('P00009', 'Abono Orgánico', 9, 4000, 'Abono natural para plantas', NULL, 400, 350, 4.5, 0, 0, 0, 500),
('P00010', 'Maceta de plástico', 2, 5000, 'Maceta resistente de plástico', NULL, 150, 100, 4.4, 10, 15, 15, 400);

-- Inserción de datos en carros
INSERT INTO carros (id_usuario, fecha_creacion, fecha_cierre) VALUES
(1, '2024-01-10', '2024-01-15'), (2, '2024-01-20', '2024-01-25'),
(3, '2024-02-05', NULL), (4, '2024-02-10', '2024-02-15'), 
(5, '2024-03-01', NULL), (6, '2024-03-15', '2024-03-20'), 
(7, '2024-03-30', NULL), (8, '2024-04-10', '2024-04-15'),
(9, '2024-04-25', NULL), (10, '2024-05-05', NULL);

-- Inserción de datos en carros_productos
INSERT INTO carros_productos (id_carro, id_producto, cantidad_producto) VALUES
(1, 1, 2), (1, 2, 1), (2, 3, 5), (2, 4, 1),
(3, 5, 1), (4, 6, 10), (5, 7, 2), (6, 8, 1),
(7, 9, 5), (8, 10, 3);

-- Inserción de datos en tipo_despacho
INSERT INTO tipo_despacho (tipo) VALUES
('Retiro en tienda'), ('Envío estándar'), ('Envío express'),
('Envío internacional'), ('Dron Delivery');

-- Inserción de datos en estados_pedido
INSERT INTO estados_pedido (estado) VALUES
('Pendiente'), ('En preparación'), ('Enviado'), 
('Entregado'), ('Cancelado');

-- Inserción de datos en pedidos
INSERT INTO pedidos (id_usuario, fecha_creacion, id_medio_pago, id_estado, id_tipo_despacho, id_carro, fecha_entrega) VALUES
(1, '2024-01-10', 1, 4, 1, 1, '2024-01-15'), (2, '2024-01-20', 2, 3, 2, 2, '2024-01-25'),
(3, '2024-02-05', 3, 2, 3, 3, NULL), (4, '2024-02-10', 4, 1, 4, 4, '2024-02-15'),
(5, '2024-03-01', 5, 4, 5, 5, NULL), (6, '2024-03-15', 6, 3, 1, 6, '2024-03-20'),
(7, '2024-03-30', 1, 2, 2, 7, NULL), (8, '2024-04-10', 2, 1, 3, 8, '2024-04-15'),
(9, '2024-04-25', 3, 4, 4, 9, NULL), (10, '2024-05-05', 4, 3, 5, 10, NULL);

-- Inserción de datos en pagos
INSERT INTO pagos (id_medio_pago, id_pedido, fecha, monto) VALUES
(1, 1, '2024-01-10 10:00:00', 15000), (2, 2, '2024-01-20 11:00:00', 20000),
(3, 3, '2024-02-05 12:00:00', 5000), (4, 4, '2024-02-10 13:00:00', 8000),
(5, 5, '2024-03-01 14:00:00', 30000), (6, 6, '2024-03-15 15:00:00', 10000),
(1, 7, '2024-03-30 16:00:00', 25000), (2, 8, '2024-04-10 17:00:00', 35000),
(3, 9, '2024-04-25 18:00:00', 4000), (4, 10, '2024-05-05 19:00:00', 5000);

-- Inserción de datos en las tablas de productos categorizados
-- Ejemplo: plantas, maceteros, insumos, accesorios
INSERT INTO plantas_especies (especie) VALUES
('Suculenta'), ('Cactus'), ('Bonsai'), ('Orquídea'), ('Helecho'), 
('Palmera'), ('Lavanda'), ('Aloe'), ('Ficus'), ('Geranio');

INSERT INTO plantas_fotoperiodo (tipo_fotoperiodo) VALUES
('Corto'), ('Largo'), ('Neutro'), ('Variable'), ('Indeterminado');

INSERT INTO plantas_tipo_riego (tipo_riego) VALUES
('Moderado'), ('Abundante'), ('Poco'), ('Goteo'), ('Manual');

INSERT INTO plantas_habito_crecimiento (crecimiento) VALUES
('Erguido'), ('Trepador'), ('Rastrero'), ('Arbustivo'), ('Colgante');

INSERT INTO colores_productos (color) VALUES
('Rojo'), ('Azul'), ('Verde'), ('Amarillo'), ('Blanco'), 
('Negro'), ('Marrón'), ('Gris'), ('Naranja'), ('Morado');

-- Continua agregando datos para las demás tablas.

-- Inserción de datos en tipo_producto
INSERT INTO tipo_producto (tipo) VALUES
('Plantas'), ('Maceteros'), ('Sustratos'), ('Fertilizantes'), 
('Herramientas'), ('Semillas'), ('Decoración'), 
('Iluminación'), ('Riego'), ('Abonos');

-- Inserción de datos en tipo_usuario_plantas
INSERT INTO tipo_usuario_plantas (tipo) VALUES
('Interior'), ('Exterior'), ('Pet Friendly'), 
('Medicinal'), ('Ornamental'), ('Comestible'),
('Aromática'), ('Floración'), ('Perennes'), ('Anuales');

-- Inserción de datos en tipo_mantenimiento
INSERT INTO tipo_mantenimiento (tipo) VALUES
('Bajo'), ('Moderado'), ('Alto'), 
('Exigente'), ('Sencillo'), ('Automático'),
('Manual'), ('Asistido'), ('Natural'), ('Artificial');

-- Inserción de datos en usuarios_direcciones
INSERT INTO usuarios_direcciones (id_usuario, id_direccion, predeterminado) VALUES
(1, 1, true), (2, 2, true), (3, 3, false), (4, 4, true),
(5, 5, false), (6, 6, true), (7, 7, false), (8, 8, true),
(9, 9, true), (10, 10, false);

-- Inserción de datos en reseñas
INSERT INTO reseñas (id_usuario, id_producto, comentario, puntuacion, fecha) VALUES
(1, 1, 'Excelente planta, llegó en perfecto estado.', 5, '2024-01-10'),
(2, 2, 'Buen macetero, pero un poco pequeño para plantas grandes.', 4, '2024-01-15'),
(3, 3, 'El sustrato es de excelente calidad.', 5, '2024-01-20'),
(4, 4, 'Regadera muy práctica y fácil de usar.', 4, '2024-01-25'),
(5, 5, 'El kit de herramientas es muy completo.', 5, '2024-02-01'),
(6, 6, 'Las semillas germinaron rápido.', 5, '2024-02-10'),
(7, 7, 'La lámpara LED es perfecta para mis suculentas.', 5, '2024-02-15'),
(8, 8, 'El sistema de riego funciona perfectamente.', 5, '2024-02-20'),
(9, 9, 'El abono es muy efectivo.', 4, '2024-03-01'),
(10, 10, 'El macetero es bonito pero algo frágil.', 3, '2024-03-05');

-- Inserción de datos en usuarios_roles
INSERT INTO usuarios_roles (id_usuario, id_rol) VALUES
(1, 1), (2, 2), (3, 3), (4, 4),
(5, 5), (6, 6), (7, 7), (8, 8),
(9, 9), (10, 10);

-- Inserción de datos en roles
INSERT INTO roles (nombre_rol) VALUES
('Admin'), ('Cliente'), ('Proveedor'), ('Vendedor'), 
('Distribuidor'), ('Soporte'), ('Gerente'), 
('Supervisor'), ('Contador'), ('Asistente');

-- Inserción de datos en direcciones_tipo_envio
INSERT INTO direcciones_tipo_envio (tipo_envio) VALUES
('Nacional'), ('Internacional'), ('Región Metropolitana'), 
('Norte'), ('Sur'), ('Centro'), 
('Islas'), ('Región Austral'), ('Express'), ('Economy');

-- Inserción de datos en etiquetas_productos
INSERT INTO etiquetas_productos (id_producto, id_etiqueta) VALUES
(1, 1), (2, 2), (3, 3), (4, 4), 
(5, 5), (6, 6), (7, 7), (8, 8), 
(9, 9), (10, 10);

-- Inserción de datos en categorías_productos
INSERT INTO categorias_productos (id_producto, id_categoria) VALUES
(1, 1), (2, 2), (3, 3), (4, 4), 
(5, 5), (6, 6), (7, 7), (8, 8), 
(9, 9), (10, 2);

-- Inserción de datos en inventario
INSERT INTO inventario (id_producto, cantidad, precio_unitario) VALUES
(1, 100, 5000), (2, 200, 10000), (3, 300, 3000), 
(4, 50, 8000), (5, 30, 15000), (6, 500, 2000), 
(7, 40, 25000), (8, 20, 35000), (9, 400, 4000), 
(10, 150, 5000);

-- Inserción de datos en ordenes_proveedores
INSERT INTO ordenes_proveedores (id_proveedor, id_producto, cantidad, fecha_orden) VALUES
(1, 1, 100, '2024-01-01'), (2, 2, 200, '2024-01-05'), 
(3, 3, 300, '2024-01-10'), (4, 4, 50, '2024-01-15'), 
(5, 5, 30, '2024-01-20'), (6, 6, 500, '2024-01-25'), 
(7, 7, 40, '2024-02-01'), (8, 8, 20, '2024-02-05'), 
(9, 9, 400, '2024-02-10'), (10, 10, 150, '2024-02-15');

-- Inserción de datos en proveedores
INSERT INTO proveedores (nombre_proveedor, contacto, email, telefono) VALUES
('Vivero Andes', 'Carlos Pérez', 'contacto@viveroandes.com', '912345678'),
('Distribuidora Verde', 'María Ramírez', 'ventas@distribuidoraverde.cl', '922345678'),
('Fertilizantes Chile', 'Jorge López', 'info@fertilizanteschile.cl', '932345678'),
('Herramientas del Sur', 'Ana Fernández', 'ventas@herramientasdelsur.cl', '942345678'),
('Plantas y más', 'Pedro Sánchez', 'contacto@plantasymas.cl', '952345678'),
('Sustratos y Tierra', 'Patricia Gómez', 'ventas@sustratosytierra.cl', '962345678'),
('Semillas Orgánicas', 'Luis Martínez', 'info@semillasorganicas.cl', '972345678'),
('Iluminación LED', 'Elena Vega', 'ventas@iluminacionled.cl', '982345678'),
('Riegos Automáticos', 'Gustavo Orozco', 'contacto@riegosautomaticos.cl', '992345678'),
('Abonos Naturales', 'Lorena Paredes', 'info@abonosnaturales.cl', '912365478');

-- Inserción de datos en despachos
INSERT INTO despachos (id_pedido, id_direccion, fecha_despacho, id_tipo_despacho, id_estado) VALUES
(1, 1, '2024-01-15', 1, 4), (2, 2, '2024-01-25', 2, 3), 
(3, 3, '2024-02-05', 3, 2), (4, 4, '2024-02-15', 4, 4), 
(5, 5, '2024-03-01', 5, 4), (6, 6, '2024-03-20', 1, 3), 
(7, 7, '2024-03-30', 2, 2), (8, 8, '2024-04-15', 3, 1), 
(9, 9, '2024-04-25', 4, 4), (10, 10, '2024-05-05', 5, 3);

-- Inserción de datos en seguimientos_despachos
INSERT INTO seguimientos_despachos (id_despacho, fecha, estado, ubicacion) VALUES
(1, '2024-01-15', 'En camino', 'Centro de distribución Santiago'),
(2, '2024-01-25', 'En tránsito', 'Bodega Región Metropolitana'),
(3, '2024-02-05', 'Preparando entrega', 'Bodega Local Providencia'),
(4, '2024-02-15', 'Entregado', 'Domicilio del cliente'),
(5, '2024-03-01', 'En preparación', 'Bodega Central'),
(6, '2024-03-20', 'Enviado', 'Centro de distribución Sur'),
(7, '2024-03-30', 'En camino', 'Centro de distribución Norte'),
(8, '2024-04-15', 'Entregado', 'Oficina de cliente'),
(9, '2024-04-25', 'Enviado', 'Sucursal de despacho Viña del Mar'),
(10, '2024-05-05', 'En camino', 'Centro de distribución Santiago');
