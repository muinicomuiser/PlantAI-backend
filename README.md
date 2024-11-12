<p align="left">
  <!-- <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a> -->
  <img src="arbol.png" width="450" alt="PlantAI BACKEND"/>
</p>
  <!-- <p align="center"><span style="font-size:1.8em; font-weight: 700;">PlantAI</span></p> -->

# PlantAI API

Este proyecto es un API RESTful desarrollada con NestJS que permite gestionar el back-end del e-commerce PlantAI, considerando el manejo de la base de datos y la estructura y lógica de sus recursos.

## Contenidos

1. [Requisitos Previos](#requisitos-previos)
2. [Instalación](#instalacion)
3. [Configuración](#configuracion)
4. [Ejecución - Desarrollo](#ejecucion-desarrollo)
5. [Ejecución - Producción](#ejecucion-produccion)
6. [Estructura del Proyecto](#estructura-del-proyecto)
7. [Documentación de la API](#documentacion-api)
8. [Flujo de Trabajo](#flujo-trabajo)
9. [Contacto](#contacto)

## 1. Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener
instalados los siguientes componentes:

- **Node.js**: >= v16.0.0
- **NestJS CLI**: `npm install -g @nestjs/cli`
- **TypeORM**: yarn add @nest/typeorm

## 2. Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/bootcamp-uchile-2024/grupo-3-backend.git
```

2. Entra en el directorio del proyecto:

```bash
cd grupo-3-backend
```

3. Instala las dependencias:

```bash
npm install
```

## 3. Configuración

1. Se deben completar las siguientes variables de
   entorno:

- PORT: Número del puerto.
- AMBIENTE: Indicar el nombre del ambiente de trabajo.

2. Completar el archivo .env en la raíz del proyecto,
   configurando las siguientes variables de entorno (tomar el archivo .env.example como referencia):

- PORT: 3000
- AMBIENTE: dev
- DB_HOST="localhost"
- DB_PORT=3308
- DB_USERNAME="usuarioDev"
- DB_PASSWORD="contraseña"
- DB_DATABASE="plantai_db"

3. En caso que se ejecute en ambiente productivo:

- PORT: 8080
- AMBIENTE: production
- DB_HOST="localhost"
- DB_PORT=3308
- DB_USERNAME="usuarioProd"
- DB_PASSWORD="contraseña"
- DB_DATABASE="plantai_db"

## 4. Ejecución - Desarrollo

Para ejecutar el proyecto en modo desarrollo, usa el
siguiente comando, desde la ruta grupo-3-backend:

```bash
docker compose up -d
```

La base de datos se cargará automáticamente al gestor utilizado.

## 5. Ejecución - Producción

Para ejecutar el proyecto en modo producción, usa el
siguiente comando, desde la ruta grupo-3-backend:

```bash
cd prod
docker compose up -d
```

La base de datos se cargará automáticamente al gestor utilizado.

## 6. Estructura del Proyecto

```bash
src/
│
├── app.module.ts # Módulo raíz de la aplicación
├── main.ts # Punto de entrada del servidor
├── auth/ # ruta de módulo de la funcionalidad autenticación
│ └── controller/ # Controladores de funcionalidad autenticación
│ │ └── auth.controller.ts # Controlador de funcionalidad autenticación
│ ├── dto # DTO de la funcionalidad autenticación
│ │ └── login.dto.ts # dto para login de usuario
│ ├── entities # entidades del módulo autenticación
│ │ └── auth.entity.ts # entidad autenticación
│ ├── service # servicios de la funcionalidad autenticación
│ │ └── auth.service.ts # servicio autenticación
│ └── auth.module.ts # módulo de la funcionalidad autenticación
├── carro-compras/ # ruta de módulo de la funcionalidad carro de compras
│ └── controller/ # Controladores de funcionalidad autenticación
│ │ └── carro-compras.controller.ts #controlador de funcionalidad carro compras
│ ├── dto # DTO de la funcionalidad carro compras
│ │ ├── add-product-carro.dto.ts #dto de actualización carro de compra
│ │ ├── create-carro-compra.dto.ts #dto creación carro de compras
│ │ ├── get-carro-compra.dto.ts #dto consulta carro de compras
│ │ ├── get-carro-producto.dto.ts #dto consulta prodctos en carro de compras
│ │ ├── update-carro-compra.dto.ts #dto actualización carro de compras
│ │ └── update-product-carro.dto.ts #actualización de productos en el carro de compra
│ ├── entities # entidades de funcionalidad carro-compras
│ │ ├── carro_producto.entity.ts #entidad qeu relaciona carro de compras con productos
│ │ └── carro.entity.ts # entidad carro compras
│ ├── mapper # mapper dto salida carro de compra
│ │ └── carro-compras.mapper.ts # mapper dto salida carro compras
│ ├── pipe # validaciones carro de compra
│ │ ├── validar-carro-activo-existente.ts #validacion carro activo
│ │ ├── validar-carro-existe.pipe.ts #validacion consulta carro
│ │ └── validar-producto-existente.pipe.ts # valida la exitencia de productos
│ ├── service # servicios de la funcionalidad carro de compra
│ │ └── carro-compras.service.ts # servicio carro de compras
│ ├── shared # elementos compartidos en carro compras
│ │ └── constants
│ │ │ └── carro-relaciones.ts #relaciones de carro compras con productos.
│ └── carro-compras.module.ts # módulo de la funcionalidad carro de compras
├── catalogo/ # ruta de módulo de la funcionalidad catalogo
│ └── controller/ # Controladores de funcionalidad catalogo
│ │ └── catalogo.controller.ts # Controlador de funcionalidad catalogo
│ ├── dto # DTO de la funcionalidad catalogo
│ │ ├── create-carro-compra.dto.ts #dto de creación catalogo
│ │ └── update-catalogo.dto.ts #dto para actualizar catalogo
│ ├── entities # entidades del módulo catalogo
│ │ └── catalogo.entity.ts # entidad catalogo
│ ├── service # servicios de la funcionalidad catalogo
│ │ └── catalogo.service.ts # servicio catalogo
│ └── catalogo.module.ts # módulo de la funcionalidad catalogo
├── commons/ # ruta de utilidades y elementos globales
│ ├── filter/ # filtro de excepciones http.
│ │ └── httpexceptionfilter.ts/ # filtro de excepciones http.
│ ├── interceptor/ # interceptores aplicados
│ │ └── interceptor_ok_log.interceptor.ts #interceptor de login.
│ ├── middleware/ # middlewares aplicados
│ │ └── globla.middleware.ts # middleware global
│ └── modelse3 # información general del equipo desarrollador.
├── pedidos/ # ruta de módulo de la funcionalidad carro de compras
│ └── controller/ # Controladores de funcionalidad autenticación
│ │ ├── catalogo.controller.ts #controlador de la fucionalidad catalogo
│ │ └── pedidos.controller.ts #controlador de funcionalidad pedidos
│ ├── dto # DTO de la funcionalidad pedidos
│ │ ├── accesorio #Carpeta DTO accesorios
│ │ │ └── get-accesorio.dto.ts # DTO salida accesorioss
│ │ ├── catalogo #Carpeta DTO catálogo
│ │ │ └── paginacion.dto.ts # DTO paginacion de catalogo
│ │ ├── categoria #Carpeta DTO categorias
│ │ │ └── get-categoria.dto.ts # DTO salida categoria
│ │ ├── insumo #Carpeta DTO insumos
│ │ │ └── get-insumo.dto.ts # DTO salida insumo
│ │ ├── macetero #Carpeta DTO macetero
│ │ │ └── get-macetero.dto.ts # DTO salida macetero
│ │ ├── planta #Carpeta DTO planta
│ │ │ └── get-planta.dto.ts # DTO salida planta
│ │ └── producto #Carpeta DTO macetero
│ │ │ ├── create-producto.dto.ts # DTO creacion producto
│ │ │ └── update-producto.dto.ts # DTO para actualizar producto
│ ├── entities # entidades de funcionalidad pedidos
│ │ ├── accesorios #carpeta contenedora de entidades accesorios
│ │ │ ├── accesorio.entity.ts # enntidad accesorio
│ │ │ └── tipo_accesorio.entity.ts # entidad tipo accesorio
│ │ ├── insumos #carpeta contenedora de entidades insumos
│ │ │ ├── insumo.entity.ts # entidad insumo
│ │ │ └── tipo_insumo.entity.ts # entidad tipo insumo
│ │ ├── maceteros #carpeta contenedora de entidades maceteros
│ │ │ ├── maceteros.entity.ts # enntidad macetero
│ │ │ └── tipo_macetero.entity.ts # entidad tipo macetero
│ │ ├── plantas #carpeta contenedora de entidades plantas
│ │ │ ├── especie.entity.ts # entidad insumo
│ │ │ ├── fotoperiodo.entity.ts # entidad fotoperiodo
│ │ │ ├── habito_crecimiento.entity.ts # entidad tipo de crecimiento
│ │ │ ├── planta.entity.ts # entidad planta
│ │ │ └── tipo_riego.entity.ts # entidad tipo riego
│ │ ├── categoria.entity.ts #entidad categoria
│ │ ├── etiqueta.entity.ts #emtodad etiquetas
│ │ └── productos.entity.ts #entidad de productos
│ ├── mapper # contenedor de mapper productos
│ │ └── entity-to-dto-producto.ts # mapper de dto salida productos
│ ├── service # contenedor de mapper productos
│ │ ├── catalogo.service.ts # servicio de catalogo.
│ │ └── productos.service.ts # servicio deproductos.


│ │ ├── pago.enum.ts #enum de entidad
│ │ └── pedidos.entity.ts # entidad carro compras
│ ├── service # servicios de la funcionalidad pedidos
│ │ └── pedidos.service.ts # servicio pedidos
│ └── pedidos.module.ts # módulo de la funcionalidad pedidos
└── usuarios/ # ruta de módulo de la funcionalidad usuarios
│ └── controller/ # Controladores de funcionalidad usuarios
│ │ └── usuarios.controller.ts # Controlador de funcionalidad usuarios
│ ├── dto # DTO de la funcionalidad usuarios
│ │ ├── create-usuarios.dto.ts #dto creación usuarios
│ │ ├── output-usuarios.dto.ts #dto de salida usuarios
│ │ └── update-usuarios.dto.ts #actualización usuarios
│ ├── entities # entidades del módulo usuarios
│ │ ├── direccion.entity.ts #entidad direccion.
│ │ ├── tipo_usuario.entity.ts #entidad tipo usuario.
│ │ ├── usuarios.entity.ts # entidad usuarios.
│ │ └── usuarios_medio_pago.entity.ts # entidad medio de pagos
│ ├── mapper # servicios de la funcionalidad usuarios
│ │ └── entity-to-dto-usuarios.ts # mapper de dto output usuario
│ ├── pipe # servicios de la funcionalidad usuarios
│ │ └── validar-usuario-existente.pipe.ts # mapper de dto output usuario
│ ├── service # servicios de la funcionalidad usuarios
│ │ └── usuarios.service.ts # servicio usuarios
│ └── usuarios.module.ts # módulo de la funcionalidad usuarios

```

## 7. Documentación de la API (Swagger)

Swagger está habilitado en este proyecto. Puedes acceder
a la documentación de la API después de iniciar el
servidor.

1. Inicia el proyecto con el comando:

```bash
npm run start:dev
```

2. Accede a Swagger en tu navegador:
   http://localhost:3000/api

## 8. Flujo de Trabajo

En este proyecto, seguimos un flujo de trabajo basado en
ramas para el desarrollo de nuevas características.
Aun por implementar la correción de errores.
A continuación, se detalla cómo crear
nuevas ramas, integrarlas y desplegar a producción.

### Branch Principal

La rama principal de este proyecto es main. Esta rama
contiene la última versión estable del proyecto y no debe
modificarse directamente.

### Creación de Branches para Desarrollo

Cuando se desarrolla una nueva funcionalidad o se corrige un
error, es necesario crear una rama específica para ello,
derivada de main.

#### Nomenclatura de las Ramas

- Ramas para nuevas funcionalidades:
  Deben comenzar con el prefijo dev/nombre-funcionalidad.
  Ejemplo: dev/autenticacion-usuarios

### Integración a Producción

Una vez completados los cambios en tu rama, crea un Pull
Request (PR) hacia la rama main para revisión. El PR debe
contener una descripción clara de los cambios y cualquier
instrucción necesaria para probarlos.
Una vez realizada la aprovación se realizará el merge.

## 9.Base de datos y MER

Para el proyecto la base de datos utilizada es MySQL Puede encontrar la documentación del MER puede encontrarla en la carpeta MER y los script SQL en la carpeta sql.
para configurar la base de datos seguir el siguiente flujo:

1. Ejecutar el script de SQL creacion.plantai_db.sql
2. Ejecutar el script de SQL creacion.data.sql

## 10.Contacto

Si tienes alguna pregunta, puedes contactarnos a través
de:

- Boris Suazo - Email: boris@cotiledon-backend.com - GitHub:
  [basuazo](https://github.com/basuazo)
- Luciano Villagrán - Email: luciano@cotiledon-backend.com -
  GitHub: [luccianovr](https://github.com/luccianovr)
- Nicolas Fernandez - Email: nicolas.f@cotiledon-backend.com - GitHub:
  [NicolasFernandezR](https://github.com/NicolasFernandezR)
- Nicolás Donoso - Email: nicolas.d@cotiledon-backend.com -
  GitHub: [muinicomuiser](https://github.com/muinicomuiser)

```

```
