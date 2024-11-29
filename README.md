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
9. [Base de datos y MER](#base-datos)
10. [Contacto](#contacto)

<a name="requisitos-previos"></a>
## 1. Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener
instalados los siguientes componentes:

- **Node.js**: >= v16.0.0
- **NestJS CLI**: `npm install -g @nestjs/cli`
- **TypeORM**: yarn add @nest/typeorm

<a name="instalacion"></a>
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
yarn install
```

<a name="configuracion"></a>
## 3. Configuración

1. Completar el archivo .env en la raíz del proyecto,
   configurando las siguientes variables de entorno (tomar el archivo .env.example como referencia):
```
VERSION_NODE="Versión Node"
VERSION_MYSQL="Versión MYSQL"
VERSION_FLYWAY="Versión Flyway"
API_PORT=3000
AMBIENTE=dev
DB_HOST="host_db"
DB_PORT=3306
DB_USERNAME="usuario_dev"
DB_PASSWORD="contraseña"
DB_DATABASE="nombre_db"
RUTA_ESTATICOS=/ruta/estaticos
RUTA_FISICA=./ruta/archivos
```

2. En caso que se ejecute en ambiente productivo:
```
VERSION_MYSQL="Versión MYSQL"
VERSION_FLYWAY="Versión Flyway"
API_PORT=8080
AMBIENTE=production
DB_HOST="host_db"
DB_PORT=3306
DB_USERNAME="usuario_prod"
DB_PASSWORD="contraseña"
DB_DATABASE="nombre_db"
RUTA_ESTATICOS=/ruta/estaticos
RUTA_FISICA=./ruta/archivos
```

<a name="ejecucion-desarrollo"></a>
## 4. Ejecución - Desarrollo

Para ejecutar el proyecto en modo desarrollo, usa el
siguiente comando, desde la ruta grupo-3-backend:

```bash
docker compose up -d
```

La base de datos se cargará en el puerto 3306, según lo expuesto en el punto anterior.
La arquitectura de datos del proyecto está construida sobre mySQL, imagen mysql:9-oracle

<a name="ejecucion-produccion"></a>
## 5. Ejecución - Producción

Para ejecutar el proyecto en modo producción, usa el
siguiente comando, desde la ruta grupo-3-backend:

```bash
cd prod
docker compose up -d
```

La base de datos se cargará en el puerto 3306, según lo expuesto en el punto anterior.
La arquitectura de datos del proyecto está construida sobre mySQL, imagen mysql:9-oracle

<a name="estructura-del-proyecto"></a>
## 6. Estructura del Proyecto

```bash
src/
│
├── app.module.ts # Módulo raíz de la aplicación
├── app.service.ts # Módulo raíz de la aplicación
├── app.controller.ts # Módulo raíz de la aplicación
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
│ ├── shared
│ │ └── constants
│ │ │ └──  producto-relaciones.ts # relaciones de la entidad productos
│ ├── productos.module.ts #Modulo productos.
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

<a name="documentacion-api"></a>
## 7. Documentación de la API (Swagger)

Swagger está habilitado en este proyecto. Puedes acceder
a la documentación de la API después de iniciar el
servidor.

1. Inicia el proyecto con el comando:

```bash
yarn start:dev
```

2. Accede a Swagger en tu navegador:
   http://localhost:3000/api

<a name="flujo-trabajo"></a>
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

<a name="base-datos"></a>
## 9. Base de datos y MER

Para el proyecto la base de datos utilizada es MySQL Puede encontrar la documentación del MER en el directorio __Diagramas__ y los script SQL en el directorio __sql__.
Para iniciar la base de datos ejecuta los archivos del directorio __sql__, siguiendo el orden numérico:

- V0.0.1...
- V0.0.2...
- ...

<a name="contacto"></a>
## 10. Contacto

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
