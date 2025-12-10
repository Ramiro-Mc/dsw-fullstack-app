# Documentación API - Utndemy Backend

## 📋 Índice

1. [Introducción](#introducción)
2. [Autenticación](#autenticación)
3. [Endpoints Usuarios](#endpoints-usuarios)
4. [Endpoints Cursos](#endpoints-cursos)
5. [Endpoints Módulos](#endpoints-módulos)
6. [Endpoints Lecciones](#endpoints-lecciones)
7. [Endpoints Alumnos-Cursos](#endpoints-alumnos-cursos)
8. [Endpoints Comunidades y Foros](#endpoints-comunidades-y-foros)
9. [Endpoints Admin](#endpoints-admin)
10. [Endpoints Tipos de Curso](#endpoints-tipos-de-curso)
11. [Códigos de Error](#códigos-de-error)

---

## Introducción

**Base URL:** `http://localhost:3000`

**Content-Type:** `application/json`

**Base de Datos:** MySQL con Sequelize ORM

---

## Autenticación

### Login

```http
POST /usuarios/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "contrasena": "password123"
}
```

**Response (200):**

```json
{
  "success": true,
  "msg": "Inicio de sesión exitoso",
  "usuario": {
    "id": 1,
    "nombreUsuario": "Juan Pérez",
    "email": "juan@example.com",
    "idTipo": 1
  }
}
```

---

### Registro

```http
POST /usuarios/register
Content-Type: application/json

{
  "nombreUsuario": "Carlos López",
  "email": "carlos@example.com",
  "contrasena": "Password123",
  "idTipo": 1
}
```

**Response (201):**

```json
{
  "success": true,
  "msg": "Usuario creado exitosamente",
  "usuario": {
    "idUsuario": 5,
    "nombreUsuario": "Carlos López",
    "email": "carlos@example.com"
  }
}
```

---

## Endpoints Usuarios

### Obtener Usuario

```http
GET /usuarios/:id
```

**Response (200):**

```json
{
  "success": true,
  "informacion": {
    "idUsuario": 1,
    "nombreUsuario": "Juan Pérez",
    "email": "juan@example.com",
    "fotoDePerfil": "url_foto",
    "fraseDescriptiva": "Apasionado por la tecnología",
    "descripcion": "Desarrollador Full Stack",
    "educacion": "Ingeniero en Sistemas",
    "banco": "Banco Nación",
    "alias": "juan.perez",
    "cvu": "1234567890123456789012",
    "nombreReferido": "Juan Pérez",
    "createdAt": "2025-01-15T10:30:00Z"
  }
}
```

---

### Actualizar Usuario

```http
PUT /usuarios/:id
Content-Type: application/json

{
  "nombreUsuario": "Juan Carlos Pérez",
  "fraseDescriptiva": "Desarrollador Full Stack",
  "descripcion": "Especializado en React y Node.js",
  "educacion": "Ingeniero en Informática",
  "banco": "Banco Nación",
  "alias": "juan.perez",
  "cvu": "1234567890123456789012",
  "nombreReferido": "Juan Pérez"
}
```

**Response (200):**

```json
{
  "success": true,
  "msg": "Usuario actualizado correctamente"
}
```

---

### Cambiar Contraseña

```http
PUT /usuarios/:id/cambiar-contraseña
Content-Type: application/json

{
  "contraseñaVieja": "OldPassword123",
  "contraseñaNueva": "NewPassword123"
}
```

**Response (200):**

```json
{
  "success": true,
  "msg": "Contraseña actualizada correctamente"
}
```

---

### Actualizar Foto de Perfil

```http
PUT /usuarios/:id/foto
Content-Type: application/json

{
  "fotoDePerfil": "url_nueva_foto"
}
```

**Response (200):**

```json
{
  "success": true,
  "msg": "Foto actualizada correctamente"
}
```

---

### Obtener Todos los Usuarios

```http
GET /usuarios
```

**Response (200):**

```json
{
  "success": true,
  "contenido": [
    {
      "idUsuario": 1,
      "nombreUsuario": "Juan Pérez",
      "email": "juan@example.com",
      "idTipo": 1,
      "createdAt": "2025-01-15T10:30:00Z"
    }
  ]
}
```

---

## Endpoints Cursos

### Listar Cursos Aprobados

```http
GET /api/cursos/aprobados
```

**Query params opcionales:**

- `tipo`: ID del tipo/categoría

**Response (200):**

```json
{
  "success": true,
  "contenido": [
    {
      "idCurso": 1,
      "titulo": "JavaScript desde Cero",
      "descripcion": "Aprende JavaScript desde lo básico",
      "precio": 15999,
      "descuento": 10,
      "imagen": "url_imagen",
      "idProfesor": 2,
      "NombreProfesor": "María García",
      "idTipo": 1,
      "NombreTipo": "Programación",
      "estado": "Aprobado"
    }
  ]
}
```

---

### Obtener Detalle de Curso

```http
GET /api/cursos/:id
```

**Response (200):**

```json
{
  "success": true,
  "contenido": {
    "idCurso": 1,
    "titulo": "JavaScript desde Cero",
    "descripcion": "Aprende JavaScript",
    "precio": 15999,
    "descuento": 10,
    "imagen": "url_imagen",
    "idProfesor": 2,
    "idTipo": 1,
    "estado": "Aprobado",
    "createdAt": "2025-01-10T08:00:00Z"
  }
}
```

---

### Crear Curso

```http
POST /cursos
Content-Type: application/json

{
  "titulo": "React Avanzado",
  "descripcion": "Domina React con hooks y context",
  "precio": 19999,
  "descuento": 15,
  "idTipo": 2,
  "imagen": "url_imagen",
  "idProfesor": 2
}
```

**Response (201):**

```json
{
  "success": true,
  "msg": "Curso creado exitosamente",
  "curso": {
    "idCurso": 25,
    "titulo": "React Avanzado",
    "estado": "Pendiente"
  }
}
```

---

### Actualizar Curso

```http
PUT /cursos/:id
Content-Type: application/json

{
  "titulo": "React Avanzado 2025",
  "descripcion": "Descripción actualizada",
  "precio": 20999,
  "descuento": 20,
  "imagen": "url_nueva"
}
```

**Response (200):**

```json
{
  "success": true,
  "msg": "Curso actualizado correctamente"
}
```

---

### Eliminar Curso

```http
DELETE /cursos/:id
```

**Response (200):**

```json
{
  "success": true,
  "msg": "Curso eliminado correctamente"
}
```

---

### Obtener Cursos por Profesor

```http
GET /cursos/profesor/:idProfesor
```

**Response (200):**

```json
{
  "success": true,
  "contenido": [
    {
      "idCurso": 1,
      "titulo": "JavaScript desde Cero",
      "estado": "Aprobado",
      "precio": 15999,
      "descuento": 10
    }
  ]
}
```

---

### Obtener Curso Completo (con módulos y lecciones)

```http
GET /cursos/:id/modulos/lecciones
```

**Response (200):**

```json
{
  "success": true,
  "contenido": {
    "idCurso": 1,
    "titulo": "JavaScript desde Cero",
    "modulos": [
      {
        "idModulo": 1,
        "titulo": "Fundamentos",
        "lecciones": [
          {
            "idLeccion": 1,
            "titulo": "¿Qué es JavaScript?",
            "contenido": "...",
            "duracion": 45
          }
        ]
      }
    ]
  }
}
```

---

## Endpoints Módulos

### Crear Módulo

```http
POST /modulos
Content-Type: application/json

{
  "titulo": "Módulo 1: Fundamentos",
  "descripcion": "Aprende los conceptos básicos",
  "idCurso": 1
}
```

**Response (201):**

```json
{
  "success": true,
  "msg": "Módulo creado exitosamente",
  "modulo": {
    "idModulo": 5,
    "titulo": "Módulo 1: Fundamentos"
  }
}
```

---

### Obtener Módulos de un Curso

```http
GET /modulos/curso/:idCurso
```

**Response (200):**

```json
{
  "success": true,
  "contenido": [
    {
      "idModulo": 1,
      "titulo": "Módulo 1: Fundamentos",
      "descripcion": "Conceptos básicos",
      "idCurso": 1
    }
  ]
}
```

---

### Obtener Módulo por ID

```http
GET /modulos/:id
```

**Response (200):**

```json
{
  "success": true,
  "contenido": {
    "idModulo": 1,
    "titulo": "Módulo 1: Fundamentos",
    "descripcion": "Conceptos básicos",
    "idCurso": 1
  }
}
```

---

### Actualizar Módulo

```http
PUT /modulos/:id
Content-Type: application/json

{
  "titulo": "Módulo 1: Fundamentos Actualizados",
  "descripcion": "Nueva descripción"
}
```

**Response (200):**

```json
{
  "success": true,
  "msg": "Módulo actualizado correctamente"
}
```

---

### Eliminar Módulo

```http
DELETE /modulos/:id
```

**Response (200):**

```json
{
  "success": true,
  "msg": "Módulo eliminado correctamente"
}
```

---

## Endpoints Lecciones

### Crear Lección

```http
POST /lecciones
Content-Type: application/json

{
  "titulo": "Lección 1: Variables",
  "contenido": "Las variables son contenedores...",
  "duracion": 45,
  "idModulo": 1
}
```

**Response (201):**

```json
{
  "success": true,
  "msg": "Lección creada exitosamente",
  "leccion": {
    "idLeccion": 10,
    "titulo": "Lección 1: Variables"
  }
}
```

---

### Obtener Lecciones de un Módulo

```http
GET /lecciones/modulo/:idModulo
```

**Response (200):**

```json
{
  "success": true,
  "contenido": [
    {
      "idLeccion": 1,
      "titulo": "Lección 1: Variables",
      "contenido": "Las variables son...",
      "duracion": 45,
      "idModulo": 1
    }
  ]
}
```

---

### Obtener Lección por ID

```http
GET /lecciones/:id
```

**Response (200):**

```json
{
  "success": true,
  "contenido": {
    "idLeccion": 1,
    "titulo": "Lección 1: Variables",
    "contenido": "Las variables son contenedores...",
    "duracion": 45,
    "idModulo": 1
  }
}
```

---

### Actualizar Lección

```http
PUT /lecciones/:id
Content-Type: application/json

{
  "titulo": "Lección 1: Variables y Tipos",
  "contenido": "Contenido actualizado",
  "duracion": 50
}
```

**Response (200):**

```json
{
  "success": true,
  "msg": "Lección actualizada correctamente"
}
```

---

### Eliminar Lección

```http
DELETE /lecciones/:id
```

**Response (200):**

```json
{
  "success": true,
  "msg": "Lección eliminada correctamente"
}
```

---

## Endpoints Alumnos-Cursos

### Obtener Cursos del Alumno

```http
GET /alumnos_cursos/usuario/:idUsuario
```

**Response (200):**

```json
{
  "success": true,
  "contenido": [
    {
      "idAlumnoCurso": 1,
      "idUsuario": 1,
      "idCurso": 1,
      "Curso": {
        "idCurso": 1,
        "titulo": "JavaScript desde Cero",
        "imagen": "url_imagen"
      },
      "fechaCompra": "2025-01-15T10:30:00Z"
    }
  ]
}
```

---

### Crear Relación Alumno-Curso (Compra)

```http
POST /alumnos_cursos
Content-Type: application/json

{
  "idCurso": 1,
  "idUsuario": 3
}
```

**Response (201):**

```json
{
  "success": true,
  "msg": "Te has enrolado exitosamente",
  "alumnoCurso": {
    "idAlumnoCurso": 50,
    "idCurso": 1,
    "idUsuario": 3
  }
}
```

---

### Eliminar Relación Alumno-Curso

```http
DELETE /alumnos_cursos/:id
```

**Response (200):**

```json
{
  "success": true,
  "msg": "Te has desuscrito del curso"
}
```

---

### Verificar si Alumno tiene Curso

```http
GET /alumnos_cursos/verificar/:idUsuario/:idCurso
```

**Response (200):**

```json
{
  "success": true,
  "tieneCurso": true,
  "alumnoCurso": {
    "idAlumnoCurso": 1
  }
}
```

---

## Endpoints Comunidades y Foros

### Obtener Comunidad de Curso

```http
GET /comunidades/curso/:idCurso
```

**Response (200):**

```json
{
  "success": true,
  "contenido": {
    "idComunidad": 1,
    "nombre": "Comunidad JavaScript desde Cero",
    "descripcion": "Foro de discusión",
    "idCurso": 1
  }
}
```

---

### Crear Comunidad

```http
POST /comunidades
Content-Type: application/json

{
  "nombre": "Comunidad React Avanzado",
  "descripcion": "Espacio para compartir y aprender",
  "idCurso": 2
}
```

**Response (201):**

```json
{
  "success": true,
  "msg": "Comunidad creada exitosamente",
  "comunidad": {
    "idComunidad": 2,
    "nombre": "Comunidad React Avanzado"
  }
}
```

---

### Obtener Publicaciones de Comunidad

```http
GET /publicaciones/comunidad/:idComunidad
```

**Response (200):**

```json
{
  "success": true,
  "contenido": [
    {
      "idPublicacion": 1,
      "contenido": "¿Alguien puede explicar closures?",
      "fechaPublicacion": "2025-01-20T15:30:00Z",
      "idUsuario": 3,
      "idComunidad": 1,
      "UsuarioDePublicacion": {
        "nombreUsuario": "Pedro Gómez",
        "fotoDePerfil": "url_foto"
      }
    }
  ]
}
```

---

### Crear Publicación

```http
POST /publicaciones
Content-Type: application/json

{
  "contenido": "Excelente curso, muy recomendado",
  "idUsuario": 3,
  "idComunidad": 1
}
```

**Response (201):**

```json
{
  "success": true,
  "msg": "Publicación creada exitosamente",
  "publicacion": {
    "idPublicacion": 10,
    "contenido": "Excelente curso, muy recomendado"
  }
}
```

---

### Actualizar Publicación

```http
PUT /publicaciones/:id
Content-Type: application/json

{
  "contenido": "Contenido editado de la publicación"
}
```

**Response (200):**

```json
{
  "success": true,
  "msg": "Publicación actualizada correctamente"
}
```

---

### Eliminar Publicación

```http
DELETE /publicaciones/:id
```

**Response (200):**

```json
{
  "success": true,
  "msg": "Publicación eliminada correctamente"
}
```

---

## Endpoints Admin

### Obtener Estadísticas del Sistema

```http
GET /admin/estadisticas
```

**Response (200):**

```json
{
  "success": true,
  "contenido": {
    "totalUsuarios": 150,
    "totalCursos": 45,
    "cursosAprobados": 38,
    "cursosPendientes": 7,
    "totalIngresos": 2500000
  }
}
```

---

### Obtener Cursos Pendientes

```http
GET /admin/cursos/pendientes
```

**Response (200):**

```json
{
  "success": true,
  "contenido": [
    {
      "idCurso": 5,
      "titulo": "Curso Nuevo",
      "estado": "Pendiente",
      "idProfesor": 2,
      "NombreProfesor": "María García"
    }
  ]
}
```

---

### Aprobar Curso

```http
PUT /admin/cursos/:id/aprobar
```

**Response (200):**

```json
{
  "success": true,
  "msg": "Curso aprobado correctamente"
}
```

---

### Rechazar Curso

```http
PUT /admin/cursos/:id/rechazar
```

**Response (200):**

```json
{
  "success": true,
  "msg": "Curso rechazado correctamente"
}
```

---

### Eliminar Usuario (Admin)

```http
DELETE /admin/usuarios/:id
```

**Response (200):**

```json
{
  "success": true,
  "msg": "Usuario eliminado correctamente"
}
```

---

## Endpoints Tipos de Curso

### Obtener Todos los Tipos

```http
GET /tipos
```

**Response (200):**

```json
{
  "success": true,
  "contenido": [
    {
      "idTipo": 1,
      "nombre": "Programación",
      "descripcion": "Cursos de desarrollo de software"
    },
    {
      "idTipo": 2,
      "nombre": "Diseño UI/UX",
      "descripcion": "Cursos de diseño de interfaces"
    }
  ]
}
```

---

### Crear Tipo de Curso

```http
POST /tipos
Content-Type: application/json

{
  "nombre": "Marketing Digital",
  "descripcion": "Cursos de marketing en redes"
}
```

**Response (201):**

```json
{
  "success": true,
  "msg": "Tipo de curso creado exitosamente",
  "tipo": {
    "idTipo": 8,
    "nombre": "Marketing Digital"
  }
}
```

---

## Códigos de Error

| Código | Mensaje               | Descripción                   |
| ------ | --------------------- | ----------------------------- |
| 200    | OK                    | Solicitud exitosa             |
| 201    | Created               | Recurso creado exitosamente   |
| 400    | Bad Request           | Datos inválidos o incompletos |
| 404    | Not Found             | Recurso no encontrado         |
| 409    | Conflict              | Recurso duplicado             |
| 500    | Internal Server Error | Error del servidor            |

---

## Estructura de Respuestas

**Éxito:**

```json
{
  "success": true,
  "msg": "Mensaje descriptivo",
  "contenido": {
    /* datos */
  }
}
```

**Error:**

```json
{
  "success": false,
  "msg": "Descripción del error"
}
```

---

**Última actualización:** Diciembre 2025  
**Versión:** 1.0.0
