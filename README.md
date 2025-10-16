# DSW-FULLSTACK-APP

Aplicación fullstack para plataforma de cursos online tipo Udemy, desarrollada con React (frontend) y Node.js/Express (backend).

## 📋 Tabla de Contenidos

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Scripts de Base de Datos](#scripts-de-base-de-datos)
- [Ejecución](#ejecución)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Funcionalidades](#funcionalidades)

## 🛠️ Requisitos

- **Node.js** v16 o superior
- **npm** v8 o superior
- **MySQL** v8 o superior
- **Git**

## 📦 Instalación

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd dsw-fullstack-app
```

### 2. Instalar dependencias del backend
```bash
cd backend
npm install
```

### 3. Instalar dependencias del frontend
```bash
cd ../frontend
npm install
```

### 4. Configurar variables de entorno
Crear archivo `.env` en la carpeta `backend/` con:
```env
DB_HOST=localhost
DB_USER=tu_usuario_mysql
DB_PASSWORD=tu_contraseña_mysql
DB_NAME=dsw_app
DB_PORT=3306
PORT=3000
NODE_ENV=development
```

## 🗄️ Scripts de Base de Datos

### Ejecutar en orden:

#### 1. Crear tipos de curso
```bash
cd backend
node src/scripts/seedTipoCurso.js
```
**Qué hace:** Crea 10 tipos de curso (JavaScript, React, Node.js, Coaching, Fotografía, etc.)

#### 2. Crear cursos de ejemplo
```bash
node src/scripts/createCurso.js
```
**Qué hace:** 
- Crea un usuario profesor con credenciales:
  - Email: `profesor@utndemy.com`
  - Contraseña: `profesor123`
- Crea 13 cursos de ejemplo distribuidos en las categorías

#### 3. (Opcional) Ejecutar todos los seeds
```bash
npm run seed:all
```

## 🚀 Ejecución

### Backend (Puerto 3000)
```bash
cd backend
npm run dev
```

### Frontend (Puerto 3001)
```bash
cd frontend
npm start
```

## 📁 Estructura del Proyecto

```
dsw-fullstack-app/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Controladores de la API
│   │   ├── models/          # Modelos de Sequelize
│   │   ├── routes/          # Rutas de la API
│   │   ├── scripts/         # Scripts de inicialización
│   │   └── database/        # Configuración de BD
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes reutilizables
│   │   ├── pages/           # Páginas principales
│   │   ├── component-styles/ # Estilos CSS
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## ✨ Funcionalidades

### 🎓 Cursos
- ✅ Listado de cursos por categorías
- ✅ Filtrado por tipo de curso
- ✅ Vista detallada de curso
- ✅ Sistema de compra

### 👤 Usuarios
- ✅ Registro e inicio de sesión
- ✅ Perfiles de usuario (alumno/profesor)
- ✅ Información de pago
- ✅ Gestión de cursos

### 📚 Categorías
- JavaScript
- React
- Node.js
- Coaching
- Fotografía
- Gastronomía
- Inteligencia Artificial
- Innovación
- Diseño
- Marketing

## 🔧 Comandos Útiles

### Backend
```bash
# Modo desarrollo
npm run dev

# Crear nueva migración
npx sequelize-cli migration:generate --name nombre-migracion

# Ejecutar migraciones
npx sequelize-cli db:migrate

# Revertir migración
npx sequelize-cli db:migrate:undo
```

### Frontend
```bash
# Iniciar desarrollo
npm start

# Crear build de producción
npm run build

# Ejecutar tests
npm test
```

## 🌐 URLs

- **Frontend:** http://localhost:3001
- **Backend API:** http://localhost:3000
- **API Docs:** http://localhost:3000/api

## 👥 Credenciales de Prueba

### Profesor
- **Email:** profesor@utndemy.com
- **Contraseña:** profesor123

## 🐛 Solución de Problemas

### Error de conexión a la base de datos
```bash
# Verificar que MySQL esté ejecutándose
sudo service mysql start

# Verificar variables de entorno
cat backend/.env
```

### Puerto ocupado
```bash
# Cambiar puerto en backend/src/app.js
# Cambiar puerto en frontend/package.json (proxy)
```

### Dependencias faltantes
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

## 📞 Soporte

Para reportar bugs o solicitar funcionalidades, crear un issue en el repositorio.

---

**Desarrollado por:** Estudiantes de DSW - UTN  
**Versión:** 1.0.0  
**Fecha:** Octubre 2024