# DSW-FULLSTACK-APP

Aplicación fullstack para plataforma de cursos online tipo Udemy, desarrollada con React (frontend) y Node.js/Express (backend).

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

El archivo `.env` ya está incluido en el repositorio con valores por defecto.

**Solo necesitas editar** `backend/.env` y configurar tu contraseña de MySQL:

```env
DB_PASSWORD=tu_contraseña_mysql
```

**Variables opcionales:**

El proyecto funciona sin configurar las siguientes variables, pero con funcionalidad limitada:

- **CLOUDINARY\_**: Para almacenamiento de imágenes en la nube (sin configurar, se guardan localmente)
- **STRIPE\_**: Para pasarela de pagos real (sin configurar, se simula el pago)
- **RECAPTCHA\_**: Para validación anti-bots (sin configurar, se omite la validación)

Si deseas configurar alguna de estas opciones, consulta los comentarios dentro del archivo `.env`

## 🗄️ Scripts de Base de Datos

### Ejecutar en orden:

#### 1. Crear tipos de curso

```bash
node src/scripts/seedTipoCurso.js
```

#### 2. Crear cursos de ejemplo

```bash
node src/scripts/createCurso.js
```

#### 3. Crear administrador

```bash
node src/scripts/createAdmin.js
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

## 🔧 Comandos Útiles

### Backend

```bash
# Ejecutar tests
npm test
```

## 👥 Credenciales de Prueba

### Profesores (5 disponibles)

#### 1. Carlos Mendez - JavaScript Expert

- **Email:** carlos@utndemy.com
- **Contraseña:** profesor123
- **Especialidad:** JavaScript y desarrollo frontend
- **Cursos creados:**
  - JavaScript desde Cero ($15,999)
  - JavaScript Avanzado ($19,999)

#### 2. María García - Diseñadora UX/UI

- **Email:** maria@utndemy.com
- **Contraseña:** profesor123
- **Especialidad:** Diseño de interfaces y experiencia de usuario
- **Cursos creados:**
  - Diseño UI/UX Completo ($20,999)
  - Figma Masterclass ($12,999)

#### 3. Juan Perez - Backend Developer

- **Email:** juan@utndemy.com
- **Contraseña:** profesor123
- **Especialidad:** React y Node.js
- **Cursos creados:**
  - React JS desde Cero ($22,999)
  - Node.js y Express ($24,999)
  - React Avanzado + Redux ($25,999) - _Pendiente aprobación_

#### 4. Sofia Rodriguez - Coach Profesional

- **Email:** sofia@utndemy.com
- **Contraseña:** profesor123
- **Especialidad:** Coaching y desarrollo personal
- **Cursos creados:**
  - Coaching Personal y Profesional ($18,999)
  - Innovación y Emprendimiento ($21,999)

#### 5. Roberto Silva - Fotógrafo y Marketer

- **Email:** roberto@utndemy.com
- **Contraseña:** profesor123
- **Especialidad:** Fotografía, IA y Marketing Digital
- **Cursos creados:**
  - Fotografía Digital Avanzada ($16,999)
  - Inteligencia Artificial con Python ($29,999)
  - Marketing Digital 2024 ($17,999)
  - Gastronomía Internacional ($14,999)

### Alumno

- **Email:** alumno@utndemy.com
- **Contraseña:** alumno123
- **Funcionalidades:**
  - ✅ Comprar cursos
  - ✅ Ver cursos adquiridos
  - ✅ Acceder al contenido de cursos comprados
  - ✅ Participar en foros de comunidad
  - ✅ Ver progreso de lecciones
