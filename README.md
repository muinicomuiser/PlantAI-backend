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
- AMBIENTE: Indicar el nombre.
2. Completar el archivo .env en la raíz del proyecto,
configurando las siguientes variables de entorno (tomar el archivo .env.example como referencia):
- PORT: Número del puerto.
- AMBIENTE: Indicar el nombre.    
3. En caso que se ejecute en ambiente productivo:
- PORT: Número del puerto.
- AMBIENTE: Indicar el nombre.


## 4. Ejecución - Producción
Para ejecutar el proyecto en modo producción, usa el
siguiente comando:
```bash
npm run start:prod
```