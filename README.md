# ☕ Silvy Coffee Shop ✨

API REST desarrollada con **NestJS**, **TypeORM** y **PostgreSQL** para la gestión de una cafetería: productos, usuarios y compras.

---

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) v18 o superior
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/) v14 o superior

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Silvyud/SilvyCoffee
cd silvy-coffee
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto. Puedes basarte en el archivo `.env.template` incluido:

```env
DB_HOST=localhost
DB_PORT=5433
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
DB_DATABASE=silvy_coffee
PORT=3000
```

### 4. Crear la base de datos

Conéctate a PostgreSQL y ejecuta:

```sql
CREATE DATABASE silvy_coffee;
```

> La sincronización de tablas es automática gracias a TypeORM (`synchronize: true`). No es necesario ejecutar migraciones manualmente.

---

## Ejecución

### Modo desarrollo

```bash
npm run start:dev
```

### Modo producción (por si se desea)

```bash
npm run build
npm run start:prod
```

La API quedará disponible en: `http://localhost:3000`

---

## Endpoints disponibles

### Bebidas (`/drinks`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/drinks` | Listar todas las bebidas (soporta paginación) |
| `GET` | `/drinks/:name` | Obtener una bebida por nombre |
| `POST` | `/drinks` | Crear una nueva bebida |
| `PATCH` | `/drinks/:name` | Actualizar una bebida |
| `DELETE` | `/drinks/:name` | Eliminar una bebida |

**Parámetros de paginación** (query params):

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `limit` | number | Cantidad de resultados (default: 10) |
| `offset` | number | Desde qué posición empezar (default: 0) |

**Ejemplo de cuerpo para crear una bebida:**

```json
{
  "name": "Capuccino",
  "ounces": 9,
  "aditions": ["Cinammon", "Sugar"]
}
```

### Usuarios (`/users`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/users` | Registrar un nuevo usuario |

**Ejemplo de cuerpo para registrar un usuario:**

```json
{
  "email": "usuario@ejemplo.com",
  "password": "Contrasena1!"
}
```

> La contraseña debe ser fuerte: mínimo 8 caracteres, incluir mayúsculas, minúsculas, números y símbolos.

### Compras (`/purchases`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/purchases` | Listar todas las compras |
| `GET` | `/purchases/:id` | Obtener una compra por ID |
| `POST` | `/purchases` | Registrar una nueva compra |
| `PATCH` | `/purchases/:id` | Actualizar una compra |
| `DELETE` | `/purchases/:id` | Eliminar una compra |

---

## Tecnologías utilizadas

- **NestJS** — Framework principal
- **TypeORM** — ORM para la base de datos
- **PostgreSQL** — Base de datos relacional
- **bcrypt** — Cifrado de contraseñas
- **class-validator** — Validación de datos entrantes
