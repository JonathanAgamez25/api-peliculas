# ☀️ API REST - Gestión para Empresas de Energía Solar

API REST construida con Node.js, Express y MySQL para apoyar a pequeñas empresas del sector solar en procesos de:

- Gestión de clientes.
- Gestión de servicios (instalación, mantenimiento, diagnóstico, limpieza de paneles, etc.).
- Programación y seguimiento de órdenes de trabajo.

---

## 🛠️ Tecnologías

- Node.js
- Express
- MySQL
- mysql2
- dotenv
- nodemon

---

## ⚙️ Instalación

```bash
npm install
```

Crea un archivo `.env` en la raíz:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_clave
DB_NAME=db_solar
DB_PORT=3306
PORT=3000
```

---

## 🧱 Script de base de datos

```sql
CREATE DATABASE IF NOT EXISTS db_solar;
USE db_solar;

CREATE TABLE cliente (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(150) NOT NULL,
  telefono VARCHAR(30),
  correo VARCHAR(150),
  direccion VARCHAR(255),
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE servicio (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(120) NOT NULL,
  tipo ENUM('instalacion','mantenimiento','inspeccion','limpieza','otro') NOT NULL,
  costo_base DECIMAL(12,2) DEFAULT 0,
  descripcion TEXT,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE orden_trabajo (
  id INT PRIMARY KEY AUTO_INCREMENT,
  cliente_id INT NOT NULL,
  servicio_id INT NOT NULL,
  fecha_programada DATETIME NOT NULL,
  estado ENUM('pendiente','en_proceso','finalizada','cancelada') DEFAULT 'pendiente',
  observaciones TEXT,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (cliente_id) REFERENCES cliente(id),
  FOREIGN KEY (servicio_id) REFERENCES servicio(id)
);
```

---

## ▶️ Ejecutar

```bash
npm run dev
# o
npm start
```

---

## 📡 Endpoints

### Clientes `/api/clientes`
- `GET /api/clientes`
- `GET /api/clientes/:id`
- `POST /api/clientes`
- `PUT /api/clientes/:id`
- `DELETE /api/clientes/:id`

Ejemplo body:

```json
{
  "nombre": "Solar Tech S.A.S",
  "telefono": "+57 3001234567",
  "correo": "operaciones@solartech.com",
  "direccion": "Calle 10 # 20 - 30"
}
```

### Servicios `/api/servicios`
- `GET /api/servicios`
- `GET /api/servicios/:id`
- `POST /api/servicios`
- `PUT /api/servicios/:id`
- `DELETE /api/servicios/:id`

Ejemplo body:

```json
{
  "nombre": "Mantenimiento preventivo",
  "tipo": "mantenimiento",
  "costo_base": 450000,
  "descripcion": "Revisión de inversor, limpieza y chequeo de conexiones"
}
```

### Órdenes de trabajo `/api/ordenes-trabajo`
- `GET /api/ordenes-trabajo`
- `GET /api/ordenes-trabajo/:id`
- `POST /api/ordenes-trabajo`
- `PUT /api/ordenes-trabajo/:id`
- `DELETE /api/ordenes-trabajo/:id`

Ejemplo body:

```json
{
  "cliente_id": 1,
  "servicio_id": 1,
  "fecha_programada": "2026-02-21 09:30:00",
  "estado": "pendiente",
  "observaciones": "Verificar posible sombra parcial por antena"
}
```

---

## ✅ Próximos pasos sugeridos

- Agregar autenticación por roles (admin, técnico, comercial).
- Crear módulo de inventario (paneles, inversores, estructuras, baterías).
- Registrar evidencias fotográficas por orden de trabajo.
- Dashboard con KPIs: órdenes finalizadas, ingresos por mes, tiempos promedio.
