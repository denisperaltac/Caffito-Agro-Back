# Caffito Agro Backend

Backend API para el sistema de gestión ganadera Caffito Agro.

## Configuración de Base de Datos

### PostgreSQL Local

El sistema está configurado para usar PostgreSQL localmente. Asegúrate de tener PostgreSQL instalado y ejecutándose.

#### 1. Instalar PostgreSQL

Si no tienes PostgreSQL instalado:

**Windows:**

- Descarga desde [postgresql.org](https://www.postgresql.org/download/windows/)
- O usa Chocolatey: `choco install postgresql`

**macOS:**

- Usa Homebrew: `brew install postgresql`
- Inicia el servicio: `brew services start postgresql`

**Linux (Ubuntu/Debian):**

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### 2. Configurar PostgreSQL

1. Accede a PostgreSQL como superusuario:

```bash
sudo -u postgres psql
```

2. Crea un usuario y base de datos (opcional, ya que el script lo hace automáticamente):

```sql
CREATE USER postgres WITH PASSWORD 'Messiyyaco';
CREATE DATABASE "Caffito-Agro" OWNER postgres;
GRANT ALL PRIVILEGES ON DATABASE "Caffito-Agro" TO postgres;
\q
```

#### 3. Configurar Variables de Entorno

1. Copia el archivo de ejemplo:

```bash
cp env.example .env
```

2. Edita el archivo `.env` con tus configuraciones:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_LOGGING=false

# JWT Configuration
JWT_SECRET=tu_clave_secreta_muy_segura_aqui
JWT_EXPIRES_IN=1h
REFRESH_TOKEN_EXPIRES_IN=7d
```

#### 4. Instalar Dependencias

```bash
npm install
```

#### 5. Crear la Base de Datos

```bash
npm run create-db
```

#### 6. Probar la Conexión

```bash
npm run test-db
```

#### 7. Iniciar el Servidor

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## Scripts Disponibles

- `npm run dev` - Inicia el servidor en modo desarrollo con nodemon
- `npm start` - Inicia el servidor en modo producción
- `npm run create-db` - Crea la base de datos si no existe
- `npm run test-db` - Prueba la conexión a la base de datos
- `npm run create-admin` - Crea un usuario administrador

## Estructura de la API

### Endpoints Principales

- `GET /health` - Verificar estado del servidor
- `POST /api/v1/auth/login` - Iniciar sesión
- `POST /api/v1/auth/register` - Registrarse
- `GET /api/v1/auth/me` - Obtener información del usuario actual

### Endpoints de Caffito Agro

- `GET /api/v1/animals` - Listar animales
- `POST /api/v1/animals` - Crear animal
- `GET /api/v1/pesos` - Listar pesos
- `POST /api/v1/pesos` - Registrar peso
- `GET /api/v1/productos` - Listar productos
- `POST /api/v1/productos` - Crear producto
- `GET /api/v1/dietas` - Listar dietas
- `POST /api/v1/dietas` - Crear dieta
- `GET /api/v1/corrales` - Listar corrales
- `POST /api/v1/corrales` - Crear corral
- `GET /api/v1/sanidad` - Listar registros de sanidad
- `POST /api/v1/sanidad` - Registrar sanidad
- `GET /api/v1/reproduccion` - Listar registros de reproducción
- `POST /api/v1/reproduccion` - Registrar reproducción
- `GET /api/v1/historial-dietas` - Listar historial de dietas
- `POST /api/v1/historial-dietas` - Registrar historial de dieta

## Características

- ✅ Autenticación JWT con refresh tokens
- ✅ Paginación en todos los endpoints
- ✅ Filtros y búsqueda avanzada
- ✅ Validación de datos
- ✅ Manejo de errores centralizado
- ✅ Logging con Morgan
- ✅ CORS habilitado
- ✅ Base de datos PostgreSQL con Sequelize ORM

## Solución de Problemas

### Error de Conexión a la Base de Datos

1. Verifica que PostgreSQL esté ejecutándose:

```bash
# Windows
net start postgresql-x64-13

# macOS
brew services start postgresql

# Linux
sudo systemctl start postgresql
```

2. Verifica las credenciales en el archivo `.env`

3. Asegúrate de que la base de datos existe:

```bash
npm run create-db
```

### Error de Permisos

Si tienes problemas de permisos, asegúrate de que el usuario `postgres` tenga los permisos correctos:

```sql
GRANT ALL PRIVILEGES ON DATABASE "Caffito-Agro" TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;
```
