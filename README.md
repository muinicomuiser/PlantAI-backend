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

3. En caso que se ejecute en ambiente productivo:

- PORT: 8080
- AMBIENTE: production

## 4. Ejecución - Desarrollo

Para ejecutar el proyecto en modo desarrollo, usa el
siguiente comando, desde la ruta grupo-3-backend:

```bash
docker compose up -d
```

## 5. Ejecución - Producción

Para ejecutar el proyecto en modo producción, usa el
siguiente comando, desde la ruta grupo-3-backend:

```bash
cd prod
docker compose up -d
```

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
│ │ ├── create-carro-compra.dto.ts #dto creación carro de compras
│ │ ├── output-carro-compra.dto.ts #dto de salida carro de compra
│ │ └── update-carro-compra.dto.ts #actualización de carro de compras
│ ├── entities # entidades de funcionalidad carro-compras
│ │ └── carro-compra.entity.ts # entidad carro compras
│ ├── service # servicios de la funcionalidad carro de compra
│ │ └── carro-compras.service.ts # servicio carro de compras
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
│ │ └── pedidos.controller.ts #controlador de funcionalidad pedidos
│ ├── dto # DTO de la funcionalidad pedidos
│ │ ├── create-pedidos.dto.ts #dto creación pedidos
│ │ ├── output-pedidos.dto.ts #dto de salida pedidos
│ │ └── update-pedidos.dto.ts #actualización pedidos
│ ├── entities # entidades de funcionalidad pedidos
│ │ ├── despacho.enum.ts #enum de entidad
│ │ ├── estado.enum.ts #enum de entidad
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
│ │ └── usuarios.entity.ts # entidad usuarios
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

## 9.Contacto

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
