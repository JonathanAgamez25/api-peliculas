# 🎬 API REST - Gestión de Películas
### Institución Universitaria Digital de Antioquia

API REST desarrollada con Node.js, Express y MySQL para la gestión de contenido multimedia (películas y series) de la plataforma de entretenimiento de la IU Digital de Antioquia.

---

## 🛠️ Tecnologías utilizadas

- **Node.js** - Entorno de ejecución
- **Express** - Framework para el servidor web
- **MySQL** - Base de datos relacional
- **mysql2** - Driver de conexión a MySQL
- **dotenv** - Manejo de variables de entorno
- **nodemon** - Reinicio automático en desarrollo

---

## 📁 Estructura del proyecto

```
api-peliculas/
├── src/
│   ├── config/
│   │   └── db.js               → Conexión a MySQL
│   ├── controllers/
│   │   ├── generoController.js
│   │   ├── directorController.js
│   │   ├── productoraController.js
│   │   ├── tipoController.js
│   │   └── mediaController.js
│   ├── routes/
│   │   ├── generoRoutes.js
│   │   ├── directorRoutes.js
│   │   ├── productoraRoutes.js
│   │   ├── tipoRoutes.js
│   │   └── mediaRoutes.js
│   └── index.js
├── .env
├── .gitignore
└── package.json
```

---

## ⚙️ Instalación y configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/JonathanAgamez225/api-peliculas.git
cd api-peliculas
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=db_peliculas
DB_PORT=3306

PORT=3000
```

### 4. Crear la base de datos
Ejecuta el siguiente script en MySQL:
```sql
CREATE DATABASE IF NOT EXISTS db_peliculas;
USE db_peliculas;

CREATE TABLE genero (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    estado ENUM('activo','inactivo') DEFAULT 'activo',
    descripcion TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE director (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombres VARCHAR(150) NOT NULL,
    estado ENUM('activo','inactivo') DEFAULT 'activo',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE productora (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(150) NOT NULL,
    estado ENUM('activo','inactivo') DEFAULT 'activo',
    slogan VARCHAR(255),
    descripcion TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE tipo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE media (
    id INT PRIMARY KEY AUTO_INCREMENT,
    serial VARCHAR(100) NOT NULL UNIQUE,
    titulo VARCHAR(255) NOT NULL,
    sinopsis TEXT,
    url VARCHAR(500) NOT NULL UNIQUE,
    imagen_portada VARCHAR(500),
    anio_estreno YEAR,
    genero_id INT NOT NULL,
    director_id INT NOT NULL,
    productora_id INT NOT NULL,
    tipo_id INT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (genero_id) REFERENCES genero(id),
    FOREIGN KEY (director_id) REFERENCES director(id),
    FOREIGN KEY (productora_id) REFERENCES productora(id),
    FOREIGN KEY (tipo_id) REFERENCES tipo(id)
);
```

### 5. Iniciar el servidor
```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

El servidor quedará corriendo en: `http://localhost:3000`

---

## 📡 Endpoints disponibles

### 🎭 Género `/api/generos`
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/generos | Obtener todos los géneros |
| GET | /api/generos/:id | Obtener un género por ID |
| POST | /api/generos | Crear un género |
| PUT | /api/generos/:id | Actualizar un género |
| DELETE | /api/generos/:id | Eliminar un género |

**Ejemplo POST:**
```json
{
    "nombre": "Acción",
    "estado": "activo",
    "descripcion": "Películas con secuencias de acción intensa"
}
```

---

### 🎬 Director `/api/directores`
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/directores | Obtener todos los directores |
| GET | /api/directores/:id | Obtener un director por ID |
| POST | /api/directores | Crear un director |
| PUT | /api/directores/:id | Actualizar un director |
| DELETE | /api/directores/:id | Eliminar un director |

**Ejemplo POST:**
```json
{
    "nombres": "Christopher Nolan",
    "estado": "activo"
}
```

---

### 🏢 Productora `/api/productoras`
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/productoras | Obtener todas las productoras |
| GET | /api/productoras/:id | Obtener una productora por ID |
| POST | /api/productoras | Crear una productora |
| PUT | /api/productoras/:id | Actualizar una productora |
| DELETE | /api/productoras/:id | Eliminar una productora |

**Ejemplo POST:**
```json
{
    "nombre": "Warner Bros",
    "estado": "activo",
    "slogan": "The stuff that dreams are made of",
    "descripcion": "Productora de entretenimiento estadounidense"
}
```

---

### 📺 Tipo `/api/tipos`
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/tipos | Obtener todos los tipos |
| GET | /api/tipos/:id | Obtener un tipo por ID |
| POST | /api/tipos | Crear un tipo |
| PUT | /api/tipos/:id | Actualizar un tipo |
| DELETE | /api/tipos/:id | Eliminar un tipo |

**Ejemplo POST:**
```json
{
    "nombre": "Película",
    "descripcion": "Producción cinematográfica de formato largo"
}
```

---

### 🎥 Media `/api/medias`
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/medias | Obtener todas las producciones |
| GET | /api/medias/:id | Obtener una producción por ID |
| POST | /api/medias | Crear una producción |
| PUT | /api/medias/:id | Actualizar una producción |
| DELETE | /api/medias/:id | Eliminar una producción |

**Ejemplo POST:**
```json
{
    "serial": "MOV001",
    "titulo": "Inception",
    "sinopsis": "Un ladrón que roba secretos corporativos a través del sueño",
    "url": "https://www.inception.com",
    "imagen_portada": "https://www.inception.com/poster.jpg",
    "anio_estreno": "2010",
    "genero_id": 1,
    "director_id": 1,
    "productora_id": 1,
    "tipo_id": 1
}
```

> ⚠️ **Nota:** Al crear o actualizar una producción, el sistema valida automáticamente que el género, director y productora tengan estado **activo**. Si alguno está inactivo, la operación será rechazada.

---

## 👤 Autor

**Jonatan D. Ávila Agamez**  
Proyecto Integrado 2 - 2026-1  
Institución Universitaria Digital de Antioquia  
Docente: Federico Henao
