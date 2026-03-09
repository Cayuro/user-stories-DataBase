// =====================================================
// SISTEMA DE PLATAFORMA DE STREAMING - STREAMHUB
// MongoDB - NoSQL CRUD, Índices y Agregaciones
// =====================================================

// =====================================================
// TASK 1: ANÁLISIS Y DISEÑO DE COLECCIONES
// =====================================================

/*
COLECCIONES DEL DOMINIO:

1. usuarios
   - _id: ObjectId
   - nombre: String
   - email: String (UNIQUE)
   - fecha_registro: Date
   - pais: String
   - tipo_suscripcion: String (Básico, Premium, VIP)
   - estado: String (Activo, Inactivo)
   - contenidos_vistos: [ObjectId] (referencias a películas/series)

2. contenidos
   - _id: ObjectId
   - titulo: String
   - tipo: String (Película, Serie)
   - genero: [String] (Drama, Acción, Comedia, etc.)
   - duracion: Number (en minutos)
   - anio_lanzamiento: Number
   - director: String
   - descripcion: String
   - clasificacion: String (PG, PG-13, R, NC-17)
   - puntuacion_promedio: Number

3. valoraciones
   - _id: ObjectId
   - usuario_id: ObjectId
   - contenido_id: ObjectId
   - calificacion: Number (1-5)
   - comentario: String
   - fecha_valoracion: Date

4. historial_visualizacion
   - _id: ObjectId
   - usuario_id: ObjectId
   - contenido_id: ObjectId
   - fecha_visualizacion: Date
   - minutos_visualizados: Number
   - completado: Boolean
*/

// =====================================================
// TASK 2: INSERCIÓN DE DATOS
// =====================================================

// Usar la base de datos
use streamhub;

// INSERTAR USUARIOS
db.usuarios.insertMany([
  {
    nombre: "Carlos Mendoza",
    email: "carlos.mendoza@streamhub.com",
    fecha_registro: new Date("2022-01-15"),
    pais: "Colombia",
    tipo_suscripcion: "Premium",
    estado: "Activo",
    contenidos_vistos: []
  },
  {
    nombre: "Laura Sánchez",
    email: "laura.sanchez@streamhub.com",
    fecha_registro: new Date("2023-05-20"),
    pais: "España",
    tipo_suscripcion: "VIP",
    estado: "Activo",
    contenidos_vistos: []
  },
  {
    nombre: "Miguel González",
    email: "miguel.gonzalez@streamhub.com",
    fecha_registro: new Date("2022-08-10"),
    pais: "México",
    tipo_suscripcion: "Básico",
    estado: "Activo",
    contenidos_vistos: []
  },
  {
    nombre: "Ana Torres",
    email: "ana.torres@streamhub.com",
    fecha_registro: new Date("2023-02-15"),
    pais: "Argentina",
    tipo_suscripcion: "Premium",
    estado: "Activo",
    contenidos_vistos: []
  },
  {
    nombre: "Roberto Ruiz",
    email: "roberto.ruiz@streamhub.com",
    fecha_registro: new Date("2021-11-05"),
    pais: "Chile",
    tipo_suscripcion: "VIP",
    estado: "Inactivo",
    contenidos_vistos: []
  },
  {
    nombre: "Sofía Martínez",
    email: "sofia.martinez@streamhub.com",
    fecha_registro: new Date("2023-03-22"),
    pais: "Perú",
    tipo_suscripcion: "Premium",
    estado: "Activo",
    contenidos_vistos: []
  },
  {
    nombre: "Diego Herrera",
    email: "diego.herrera@streamhub.com",
    fecha_registro: new Date("2022-06-30"),
    pais: "Colombia",
    tipo_suscripcion: "Básico",
    estado: "Activo",
    contenidos_vistos: []
  },
  {
    nombre: "Valentina López",
    email: "valentina.lopez@streamhub.com",
    fecha_registro: new Date("2023-01-10"),
    pais: "España",
    tipo_suscripcion: "Basic",
    estado: "Activo",
    contenidos_vistos: []
  }
]);

// INSERTAR CONTENIDOS
db.contenidos.insertMany([
  {
    titulo: "El Código del Silencio",
    tipo: "Película",
    genero: ["Drama", "Thriller"],
    duracion: 125,
    anio_lanzamiento: 2023,
    director: "Christopher Nolan",
    descripcion: "Una película de suspenso que explora los secretos de una familia.",
    clasificacion: "PG-13",
    puntuacion_promedio: 4.5
  },
  {
    titulo: "Aventuras Galácticas",
    tipo: "Serie",
    genero: ["Ciencia Ficción", "Acción"],
    duracion: 45,
    anio_lanzamiento: 2022,
    director: "Rian Johnson",
    descripcion: "Una épica serie de viajes espaciales y descubrimientos.",
    clasificacion: "PG",
    puntuacion_promedio: 4.2
  },
  {
    titulo: "La Casa del Pasado",
    tipo: "Película",
    genero: ["Drama", "Romance"],
    duracion: 110,
    anio_lanzamiento: 2023,
    director: "Greta Gerwig",
    descripcion: "Un viaje emocional a través de recuerdos y abandono.",
    clasificacion: "R",
    puntuacion_promedio: 4.7
  },
  {
    titulo: "Risa Infinita",
    tipo: "Película",
    genero: ["Comedia"],
    duracion: 95,
    anio_lanzamiento: 2024,
    director: "Judd Apatow",
    descripcion: "Una comedia hilante sobre la amistad y la vida adulta.",
    clasificacion: "PG-13",
    puntuacion_promedio: 3.9
  },
  {
    titulo: "El Investigador",
    tipo: "Serie",
    genero: ["Crimen", "Thriller"],
    duracion: 50,
    anio_lanzamiento: 2023,
    director: "David Fincher",
    descripcion: "Un detective astucia investiga casos perturbadores.",
    clasificacion: "R",
    puntuacion_promedio: 4.6
  },
  {
    titulo: "Mundo Fantasía",
    tipo: "Película",
    genero: ["Fantasía", "Aventura"],
    duracion: 150,
    anio_lanzamiento: 2023,
    director: "Peter Jackson",
    descripcion: "Un épico viaje a un mundo de magia y criaturas extraordinarias.",
    clasificacion: "PG-13",
    puntuacion_promedio: 4.4
  },
  {
    titulo: "La Última Frontera",
    tipo: "Serie",
    genero: ["Drama", "Historia"],
    duracion: 55,
    anio_lanzamiento: 2022,
    director: "Steven Spielberg",
    descripcion: "Una serie sobre la exploración y colonización del oeste.",
    clasificacion: "PG",
    puntuacion_promedio: 4.3
  },
  {
    titulo: "Secretos Urbanos",
    tipo: "Película",
    genero: ["Thriller", "Misterio"],
    duracion: 118,
    anio_lanzamiento: 2024,
    director: "Denis Villeneuve",
    descripcion: "En las calles de la ciudad, se teje una red de misterios.",
    clasificacion: "NC-17",
    puntuacion_promedio: 4.1
  }
]);

// INSERTAR VALORACIONES
db.valoraciones.insertMany([
  {
    usuario_id: ObjectId("000000000000000000000001"),
    contenido_id: ObjectId("000000000000000000000011"),
    calificacion: 5,
    comentario: "¡Excelente película! Realmente me enganchó.",
    fecha_valoracion: new Date("2024-01-10")
  },
  {
    usuario_id: ObjectId("000000000000000000000002"),
    contenido_id: ObjectId("000000000000000000000011"),
    calificacion: 4,
    comentario: "Muy buena, pero un poco lenta en el segundo acto.",
    fecha_valoracion: new Date("2024-01-12")
  },
  {
    usuario_id: ObjectId("000000000000000000000001"),
    contenido_id: ObjectId("000000000000000000000012"),
    calificacion: 4,
    comentario: "Serie muy entretenida.",
    fecha_valoracion: new Date("2024-01-15")
  },
  {
    usuario_id: ObjectId("000000000000000000000003"),
    contenido_id: ObjectId("000000000000000000000013"),
    calificacion: 5,
    comentario: "La mejor película del año sin dudarlo.",
    fecha_valoracion: new Date("2024-01-18")
  },
  {
    usuario_id: ObjectId("000000000000000000000004"),
    contenido_id: ObjectId("000000000000000000000014"),
    calificacion: 3,
    comentario: "Divertida pero no muy original.",
    fecha_valoracion: new Date("2024-01-20")
  },
  {
    usuario_id: ObjectId("000000000000000000000005"),
    contenido_id: ObjectId("000000000000000000000015"),
    calificacion: 5,
    comentario: "Emocionante y bien actuada.",
    fecha_valoracion: new Date("2024-01-22")
  },
  {
    usuario_id: ObjectId("000000000000000000000002"),
    contenido_id: ObjectId("000000000000000000000016"),
    calificacion: 4,
    comentario: "Épica en todo sentido.",
    fecha_valoracion: new Date("2024-01-25")
  },
  {
    usuario_id: ObjectId("000000000000000000000006"),
    contenido_id: ObjectId("000000000000000000000017"),
    calificacion: 4,
    comentario: "Historia fascinante.",
    fecha_valoracion: new Date("2024-01-28")
  }
]);

// INSERTAR HISTORIAL DE VISUALIZACIÓN
db.historial_visualizacion.insertMany([
  {
    usuario_id: ObjectId("000000000000000000000001"),
    contenido_id: ObjectId("000000000000000000000011"),
    fecha_visualizacion: new Date("2024-01-10"),
    minutos_visualizados: 125,
    completado: true
  },
  {
    usuario_id: ObjectId("000000000000000000000002"),
    contenido_id: ObjectId("000000000000000000000012"),
    fecha_visualizacion: new Date("2024-01-11"),
    minutos_visualizados: 45,
    completado: true
  },
  {
    usuario_id: ObjectId("000000000000000000000001"),
    contenido_id: ObjectId("000000000000000000000012"),
    fecha_visualizacion: new Date("2024-01-15"),
    minutos_visualizados: 45,
    completado: true
  },
  {
    usuario_id: ObjectId("000000000000000000000003"),
    contenido_id: ObjectId("000000000000000000000013"),
    fecha_visualizacion: new Date("2024-01-18"),
    minutos_visualizados: 110,
    completado: true
  },
  {
    usuario_id: ObjectId("000000000000000000000004"),
    contenido_id: ObjectId("000000000000000000000014"),
    fecha_visualizacion: new Date("2024-01-20"),
    minutos_visualizados: 95,
    completado: true
  },
  {
    usuario_id: ObjectId("000000000000000000000005"),
    contenido_id: ObjectId("000000000000000000000015"),
    fecha_visualizacion: new Date("2024-01-22"),
    minutos_visualizados: 50,
    completado: true
  },
  {
    usuario_id: ObjectId("000000000000000000000002"),
    contenido_id: ObjectId("000000000000000000000016"),
    fecha_visualizacion: new Date("2024-01-25"),
    minutos_visualizados: 150,
    completado: true
  },
  {
    usuario_id: ObjectId("000000000000000000000006"),
    contenido_id: ObjectId("000000000000000000000017"),
    fecha_visualizacion: new Date("2024-01-28"),
    minutos_visualizados: 55,
    completado: true
  },
  {
    usuario_id: ObjectId("000000000000000000000007"),
    contenido_id: ObjectId("000000000000000000000011"),
    fecha_visualizacion: new Date("2024-02-01"),
    minutos_visualizados: 70,
    completado: false
  },
  {
    usuario_id: ObjectId("000000000000000000000004"),
    contenido_id: ObjectId("000000000000000000000018"),
    fecha_visualizacion: new Date("2024-02-02"),
    minutos_visualizados: 118,
    completado: true
  }
]);

// =====================================================
// TASK 3: CONSULTAS CON OPERADORES
// =====================================================

// Consulta 1: Películas con duración > 120 minutos
print("=== Películas con duración > 120 minutos ===");
db.contenidos.find({
  tipo: "Película",
  duracion: { $gt: 120 }
});

// Consulta 2: Contenidos del género Drama
print("\n=== Contenidos con género Drama ===");
db.contenidos.find({
  genero: { $in: ["Drama"] }
});

// Consulta 3: Usuarios registrados después de 2022
print("\n=== Usuarios registrados después de 2022 ===");
db.usuarios.find({
  fecha_registro: { $gt: new Date("2022-12-31") },
  estado: "Activo"
});

// Consulta 4: Películas lanzadas entre 2022 y 2023
print("\n=== Películas lanzadas entre 2022 y 2023 ===");
db.contenidos.find({
  tipo: "Película",
  anio_lanzamiento: { $gte: 2022, $lte: 2023 }
});

// Consulta 5: Contenidos con puntuación >= 4.5
print("\n=== Contenidos con puntuación >= 4.5 ===");
db.contenidos.find({
  puntuacion_promedio: { $gte: 4.5 }
});

// Consulta 6: Usuarios Premium o VIP
print("\n=== Usuarios con suscripción Premium o VIP ===");
db.usuarios.find({
  tipo_suscripcion: { $in: ["Premium", "VIP"] }
});

// Consulta 7: Contenidos con título que contenga 'La' (usando $regex)
print("\n=== Contenidos con título que comienza con 'La' ===");
db.contenidos.find({
  titulo: { $regex: "^La" }
});

// Consulta 8: Usuarios inactivos de países específicos
print("\n=== Usuarios inactivos de Colombia o España ===");
db.usuarios.find({
  estado: "Inactivo",
  pais: { $in: ["Colombia", "España"] }
});

// Consulta 9: Valoraciones con calificación >= 4 y fecha reciente
print("\n=== Valoraciones recientes con calificación >= 4 ===");
db.valoraciones.find({
  calificacion: { $gte: 4 },
  fecha_valoracion: { $gte: new Date("2024-01-15") }
});

// Consulta 10: Series de Crimen o Thriller con duración > 45 minutos
print("\n=== Series de Crimen o Thriller ===");
db.contenidos.find({
  tipo: "Serie",
  genero: { $in: ["Crimen", "Thriller"] },
  duracion: { $gte: 45 }
});

// =====================================================
// TASK 4: ACTUALIZACIONES Y ELIMINACIONES
// =====================================================

// Actualizar 1: Cambiar tipo de suscripción de un usuario
print("\n=== UPDATE: Cambiar suscripción de Carlos a VIP ===");
db.usuarios.updateOne(
  { nombre: "Carlos Mendoza" },
  { $set: { tipo_suscripcion: "VIP" } }
);

// Actualizar 2: Aumentar puntuación de una película
print("\n=== UPDATE: Actualizar puntuación de 'La Casa del Pasado' ===");
db.contenidos.updateOne(
  { titulo: "La Casa del Pasado" },
  { $set: { puntuacion_promedio: 4.8 } }
);

// Actualizar 3: Cambiar estado de usuario a activo
print("\n=== UPDATE: Activar usuario Roberto ===");
db.usuarios.updateOne(
  { nombre: "Roberto Ruiz" },
  { $set: { estado: "Activo" } }
);

// Actualizar 4: Modificar descripción y clasificación
print("\n=== UPDATE: Actualizar datos de 'Risa Infinita' ===");
db.contenidos.updateOne(
  { titulo: "Risa Infinita" },
  {
    $set: {
      descripcion: "Una comedia hilante sobre amistad, amor y los desafíos de la vida adulta.",
      clasificacion: "PG"
    }
  }
);

// Eliminar 1: Eliminar una valoración específica
print("\n=== DELETE: Eliminar valoración del usuario Roberto ===");
db.valoraciones.deleteOne({
  usuario_id: ObjectId("000000000000000000000005"),
  contenido_id: ObjectId("000000000000000000000015")
});

// Eliminar 2: Eliminar historial de visualización antiguo
print("\n=== DELETE: Eliminar visualizaciones anteriores a enero ===");
db.historial_visualizacion.deleteMany({
  fecha_visualizacion: { $lt: new Date("2024-01-01") }
});

// =====================================================
// TASK 5: ÍNDICES PARA PERFORMANCE
// =====================================================

// Crear índices
print("\n=== CREANDO ÍNDICES ===");

// Índice 1: Búsquedas por título (frecuente)
db.contenidos.createIndex({ titulo: 1 });
print("Índice creado en contenidos.titulo");

// Índice 2: Búsquedas por email de usuario (UNIQUE)
db.usuarios.createIndex({ email: 1 }, { unique: true });
print("Índice UNIQUE creado en usuarios.email");

// Índice 3: Búsquedas por género
db.contenidos.createIndex({ genero: 1 });
print("Índice creado en contenidos.genero");

// Índice 4: Búsquedas por tipo de suscripción
db.usuarios.createIndex({ tipo_suscripcion: 1 });
print("Índice creado en usuarios.tipo_suscripcion");

// Índice 5: Búsquedas por calificación y fecha
db.valoraciones.createIndex({ calificacion: 1, fecha_valoracion: -1 });
print("Índice compuesto creado en valoraciones");

// Índice 6: Búsquedas por usuario_id (Foreign key)
db.historial_visualizacion.createIndex({ usuario_id: 1 });
print("Índice creado en historial_visualizacion.usuario_id");

// Visualizar índices creados
print("\n=== ÍNDICES CREADOS ===");
db.contenidos.getIndexes();
db.usuarios.getIndexes();
db.valoraciones.getIndexes();

// =====================================================
// TASK 6: AGREGACIONES Y REPORTES
// =====================================================

// AGREGACIÓN 1: Promedio de calificaciones por tipo de contenido
print("\n=== AGREGACIÓN 1: Calificación promedio por tipo de contenido ===");
db.valoraciones.aggregate([
  {
    $lookup: {
      from: "contenidos",
      localField: "contenido_id",
      foreignField: "_id",
      as: "contenido"
    }
  },
  {
    $unwind: "$contenido"
  },
  {
    $group: {
      _id: "$contenido.tipo",
      promedio_calificacion: { $avg: "$calificacion" },
      total_valoraciones: { $sum: 1 }
    }
  },
  {
    $sort: { promedio_calificacion: -1 }
  }
]);

// AGREGACIÓN 2: Top 5 géneros más vistos por usuarios Premium
print("\n=== AGREGACIÓN 2: Géneros más vistos por usuarios Premium ===");
db.historial_visualizacion.aggregate([
  {
    $lookup: {
      from: "usuarios",
      localField: "usuario_id",
      foreignField: "_id",
      as: "usuario"
    }
  },
  {
    $unwind: "$usuario"
  },
  {
    $match: { "usuario.tipo_suscripcion": "Premium" }
  },
  {
    $lookup: {
      from: "contenidos",
      localField: "contenido_id",
      foreignField: "_id",
      as: "contenido"
    }
  },
  {
    $unwind: "$contenido"
  },
  {
    $unwind: "$contenido.genero"
  },
  {
    $group: {
      _id: "$contenido.genero",
      visualizaciones: { $sum: 1 }
    }
  },
  {
    $sort: { visualizaciones: -1 }
  },
  {
    $limit: 5
  }
]);

// AGREGACIÓN 3: Usuarios con más contenidos visualizados
print("\n=== AGREGACIÓN 3: Usuarios con más contenidos visualizados ===");
db.historial_visualizacion.aggregate([
  {
    $group: {
      _id: "$usuario_id",
      total_visualizaciones: { $sum: 1 },
      minutos_totales: { $sum: "$minutos_visualizados" }
    }
  },
  {
    $lookup: {
      from: "usuarios",
      localField: "_id",
      foreignField: "_id",
      as: "usuario"
    }
  },
  {
    $unwind: "$usuario"
  },
  {
    $project: {
      nombre: "$usuario.nombre",
      email: "$usuario.email",
      tipo_suscripcion: "$usuario.tipo_suscripcion",
      total_visualizaciones: 1,
      minutos_totales: 1
    }
  },
  {
    $sort: { total_visualizaciones: -1 }
  }
]);

// AGREGACIÓN 4: Películas mejor valoradas con número de reseñas
print("\n=== AGREGACIÓN 4: Películas mejor valoradas ===");
db.valoraciones.aggregate([
  {
    $lookup: {
      from: "contenidos",
      localField: "contenido_id",
      foreignField: "_id",
      as: "contenido"
    }
  },
  {
    $unwind: "$contenido"
  },
  {
    $match: { "contenido.tipo": "Película" }
  },
  {
    $group: {
      _id: "$contenido_id",
      titulo: { $first: "$contenido.titulo" },
      promedio_rating: { $avg: "$calificacion" },
      total_reseñas: { $sum: 1 }
    }
  },
  {
    $match: { total_reseñas: { $gte: 2 } }
  },
  {
    $sort: { promedio_rating: -1, total_reseñas: -1 }
  }
]);

// AGREGACIÓN 5: Distribución de usuarios por suscripción y país
print("\n=== AGREGACIÓN 5: Usuarios por tipo de suscripción y país ===");
db.usuarios.aggregate([
  {
    $match: { estado: "Activo" }
  },
  {
    $group: {
      _id: {
        pais: "$pais",
        suscripcion: "$tipo_suscripcion"
      },
      total_usuarios: { $sum: 1 }
    }
  },
  {
    $sort: { "_id.pais": 1, total_usuarios: -1 }
  }
]);

print("\n=== Script completado exitosamente ===");
