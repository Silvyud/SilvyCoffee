# Silvy Coffee Shop

## Instrucciones para instalación y configuración

### 1. Instalar las dependencias del proyecto

```bash
npm install
```

### 2. Configurar variables de entorno

(Se está en proceso de solución la correcta creación y corrección de un servidor funcional). Se debería crear un archivo `.env`en la raíz del proyecto con lo siguiente:
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=usuario
DATABASE_PASSWORD=contrasenia
DATABASE_NAME=nombre_bd
PORT=3000
```

### 3. Crear la base de datos

(Se está en proceso de solución la correcta creación y corrección de un servidor funcional)
```sql
CREATE DATABASE nombre_bd
```

## Instrucciones para ejecución

### Ejecutar en modo desarrollador

```bash
npm run start:dev
```
A partir de esto se nos facilitará la realización de pruebas para el backend (Postman)

### Consumo de los endpoints principales

Los endpoints trabajados permiten el trataiento de los datos (bebidas registradas): Se trata de la exposición y gestión de un CRUD básico. Esto más adelante será util al momento de consumir estos a través del front-end, entre otros.
