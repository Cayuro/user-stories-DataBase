-- =====================================================
-- SISTEMA DE GESTIÓN ACADÉMICA UNIVERSITARIA
-- =====================================================

-- TASK 1: CREAR LA BASE DE DATOS Y LAS TABLAS

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS gestion_academica_universidad;
USE gestion_academica_universidad;

-- Tabla DOCENTES
CREATE TABLE docentes (
    id_docente INT PRIMARY KEY AUTO_INCREMENT,
    nombre_completo VARCHAR(100) NOT NULL,
    correo_institucional VARCHAR(100) NOT NULL UNIQUE,
    departamento_academico VARCHAR(100) NOT NULL,
    anios_experiencia INT NOT NULL CHECK (anios_experiencia >= 0)
);

-- Tabla ESTUDIANTES
CREATE TABLE estudiantes (
    id_estudiante INT PRIMARY KEY AUTO_INCREMENT,
    nombre_completo VARCHAR(100) NOT NULL,
    correo_electronico VARCHAR(100) NOT NULL UNIQUE,
    genero VARCHAR(10) NOT NULL CHECK (genero IN ('Masculino', 'Femenino', 'Otro')),
    identificacion VARCHAR(20) NOT NULL UNIQUE,
    carrera VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL CHECK (fecha_nacimiento < CURDATE()),
    fecha_ingreso DATE NOT NULL,
    estado_academico VARCHAR(50) DEFAULT 'Activo'
);

-- Tabla CURSOS
CREATE TABLE cursos (
    id_curso INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    creditos INT NOT NULL CHECK (creditos > 0 AND creditos <= 10),
    semestre INT NOT NULL CHECK (semestre >= 1 AND semestre <= 12),
    id_docente INT NOT NULL,
    FOREIGN KEY (id_docente) REFERENCES docentes(id_docente) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Tabla INSCRIPCIONES
CREATE TABLE inscripciones (
    id_inscripcion INT PRIMARY KEY AUTO_INCREMENT,
    id_estudiante INT NOT NULL,
    id_curso INT NOT NULL,
    fecha_inscripcion DATE NOT NULL DEFAULT CURDATE(),
    calificacion_final DECIMAL(3,2) CHECK (calificacion_final >= 0 AND calificacion_final <= 5),
    FOREIGN KEY (id_estudiante) REFERENCES estudiantes(id_estudiante) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_curso) REFERENCES cursos(id_curso) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE KEY unique_inscripcion (id_estudiante, id_curso)
);

-- =====================================================
-- TASK 2: INSERTAR DATOS DE EJEMPLO
-- =====================================================

-- Insertar docentes
INSERT INTO docentes (nombre_completo, correo_institucional, departamento_academico, anios_experiencia) VALUES
('Carlos Rodríguez', 'carlos.rodriguez@universidad.edu.co', 'Informática', 8),
('Ana González', 'ana.gonzalez@universidad.edu.co', 'Matemáticas', 12),
('Juan Martínez', 'juan.martinez@universidad.edu.co', 'Física', 6),
('María López', 'maria.lopez@universidad.edu.co', 'Ingeniería', 15),
('Roberto Fernández', 'roberto.fernandez@universidad.edu.co', 'Química', 20),
('Gabriela Soto', 'gabriela.soto@universidad.edu.co', 'Biología', 11),
('Fernando Ruiz', 'fernando.ruiz@universidad.edu.co', 'Literatura', 9),
('Patricia Valdés', 'patricia.valdes@universidad.edu.co', 'Historia', 14),
('Andrés Moreno', 'andres.moreno@universidad.edu.co', 'Estadística', 7),
('Elena Vega', 'elena.vega@universidad.edu.co', 'Economía', 16),
('Luis Castillo', 'luis.castillo@universidad.edu.co', 'Derecho', 13),
('Daniela Herrera', 'daniela.herrera@universidad.edu.co', 'Psicología', 10),
('Sergio Navarro', 'sergio.navarro@universidad.edu.co', 'Informática', 5),
('Verónica Silva', 'veronica.silva@universidad.edu.co', 'Administración', 18),
('Cristian López', 'cristian.lopez@universidad.edu.co', 'Sostenibilidad', 4);

-- Insertar estudiantes
INSERT INTO estudiantes (nombre_completo, correo_electronico, genero, identificacion, carrera, fecha_nacimiento, fecha_ingreso) VALUES
('Pedro García', 'pedro.garcia@correo.com', 'Masculino', '1001234567', 'Ingeniería Sistemas', '2002-03-15', '2021-01-15'),
('Laura Sánchez', 'laura.sanchez@correo.com', 'Femenino', '1001234568', 'Ingeniería Sistemas', '2003-07-20', '2021-09-10'),
('Miguel Ángel', 'miguel.angel@correo.com', 'Masculino', '1001234569', 'Ingeniería Civil', '2001-11-05', '2020-01-15'),
('Sofia Hernández', 'sofia.hernandez@correo.com', 'Femenino', '1001234570', 'Matemáticas', '2002-05-12', '2021-01-15'),
('David Torres', 'david.torres@correo.com', 'Masculino', '1001234571', 'Física', '2003-02-28', '2022-01-15'),
('Alejandra Ruiz', 'alejandra.ruiz@correo.com', 'Femenino', '1001234572', 'Química', '2002-01-10', '2021-01-15'),
('Javier Morales', 'javier.morales@correo.com', 'Masculino', '1001234573', 'Biología', '2001-08-22', '2020-09-15'),
('Catalina Díaz', 'catalina.diaz@correo.com', 'Femenino', '1001234574', 'Literatura', '2003-04-03', '2022-01-15'),
('Nicolás Gómez', 'nicolas.gomez@correo.com', 'Masculino', '1001234575', 'Historia', '2002-11-14', '2021-01-15'),
('Mariana Espinoza', 'mariana.espinoza@correo.com', 'Femenino', '1001234576', 'Estadística', '2001-02-27', '2020-01-15'),
('Roberto Sáez', 'roberto.saez@correo.com', 'Masculino', '1001234577', 'Economía', '2003-09-18', '2022-01-15'),
('Fernanda Contreras', 'fernanda.contreras@correo.com', 'Femenino', '1001234578', 'Derecho', '2002-06-05', '2021-01-15'),
('Tomás Pacheco', 'tomas.pacheco@correo.com', 'Masculino', '1001234579', 'Psicología', '2001-12-30', '2020-01-15'),
('Valentina Aguirre', 'valentina.aguirre@correo.com', 'Femenino', '1001234580', 'Ingeniería Sistemas', '2003-03-11', '2022-01-15'),
('Lucas Miranda', 'lucas.miranda@correo.com', 'Masculino', '1001234581', 'Administración', '2002-07-25', '2021-01-15'),
('Sofía Valenzuela', 'sofia.valenzuela@correo.com', 'Femenino', '1001234582', 'Sostenibilidad', '2001-10-08', '2020-01-15'),
('Mateo Flores', 'mateo.flores@correo.com', 'Masculino', '1001234583', 'Ingeniería Civil', '2003-05-19', '2022-01-15'),
('Isadora Parra', 'isadora.parra@correo.com', 'Femenino', '1001234584', 'Física', '2002-02-14', '2021-01-15'),
('Facundo Vargas', 'facundo.vargas@correo.com', 'Masculino', '1001234585', 'Matemáticas', '2001-09-21', '2020-01-15'),
('Daniela Bustos', 'daniela.bustos@correo.com', 'Femenino', '1001234586', 'Química', '2003-08-07', '2022-01-15');

-- Insertar cursos
INSERT INTO cursos (nombre, codigo, creditos, semestre, id_docente) VALUES
('Programación I', 'ING101', 4, 1, 1),
('Cálculo Diferencial', 'MAT201', 3, 2, 2),
('Física Básica', 'FIS101', 4, 1, 3),
('Ingeniería de Software', 'ING202', 4, 3, 1),
('Química Orgánica', 'QUI301', 5, 3, 5),
('Biología Celular', 'BIO101', 3, 1, 6),
('Literatura Moderna', 'LIT202', 3, 2, 7),
('Historia Mundial', 'HIS101', 4, 1, 8),
('Estadística Aplicada', 'EST202', 3, 2, 9),
('Microeconomía', 'ECO101', 4, 1, 10),
('Derecho Civil', 'DER201', 4, 2, 11),
('Psicología General', 'PSI101', 3, 1, 12),
('Algoritmos Avanzados', 'ING303', 4, 4, 13),
('Administración Estratégica', 'ADM202', 3, 2, 14),
('Desarrollo Sostenible', 'SOS101', 3, 1, 15),
('Geometría Analítica', 'MAT101', 4, 1, 2);

-- Insertar inscripciones
INSERT INTO inscripciones (id_estudiante, id_curso, fecha_inscripcion, calificacion_final) VALUES
(1, 1, '2024-01-15', 4.50),
(1, 3, '2024-01-15', 4.20),
(2, 1, '2024-01-15', 4.80),
(2, 2, '2024-01-15', 3.90),
(3, 3, '2024-01-16', 3.50),
(4, 2, '2024-01-16', 4.60),
(4, 4, '2024-01-16', 4.10),
(5, 1, '2024-01-17', 3.75),
(6, 5, '2024-01-18', 4.30),
(6, 6, '2024-01-18', 4.00),
(7, 7, '2024-01-19', 3.85),
(7, 3, '2024-01-19', 4.45),
(8, 8, '2024-01-20', 4.15),
(9, 9, '2024-01-21', 3.95),
(10, 10, '2024-01-22', 4.70),
(10, 2, '2024-01-22', 4.25),
(11, 11, '2024-01-23', 3.55),
(12, 12, '2024-01-24', 4.65),
(13, 13, '2024-01-25', 4.35),
(13, 1, '2024-01-25', 4.55),
(14, 14, '2024-01-26', 3.75),
(15, 15, '2024-01-27', 4.05),
(15, 5, '2024-01-27', 4.40),
(16, 16, '2024-01-28', 3.90),
(17, 1, '2024-01-29', 4.20),
(18, 2, '2024-01-30', 4.50),
(19, 3, '2024-01-31', 3.65),
(19, 4, '2024-01-31', 4.15),
(20, 5, '2024-02-01', 4.45),
(20, 6, '2024-02-01', 3.85),
(1, 9, '2024-02-02', 4.75),
(2, 10, '2024-02-03', 4.30);

-- =====================================================
-- TASK 3: CONSULTAS BÁSICAS Y MANIPULACIÓN
-- =====================================================

--  1: Listar todos los estudiantes con sus inscripciones y cursos (JOIN)
SELECT 
    e.nombre_completo AS estudiante,
    c.nombre AS curso,
    i.calificacion_final,
    i.fecha_inscripcion
FROM estudiantes e
JOIN inscripciones i ON e.id_estudiante = i.id_estudiante
JOIN cursos c ON i.id_curso = c.id_curso
ORDER BY e.nombre_completo;

--  2: Listar cursos dictados por docentes con > 5 años de experiencia
SELECT 
    d.nombre_completo AS docente,
    c.nombre AS curso,
    c.codigo,
    d.anios_experiencia
FROM docentes d
JOIN cursos c ON d.id_docente = c.id_docente
WHERE d.anios_experiencia > 5
ORDER BY d.nombre_completo;

--  3: Obtener promedio de calificaciones por curso
SELECT 
    c.nombre AS curso,
    c.codigo,
    COUNT(i.id_inscripcion) AS total_estudiantes,
    ROUND(AVG(i.calificacion_final), 2) AS promedio_calificaciones
FROM cursos c
LEFT JOIN inscripciones i ON c.id_curso = i.id_curso
GROUP BY c.id_curso, c.nombre, c.codigo
ORDER BY promedio_calificaciones DESC;

--  4: Mostrar estudiantes inscritos en más de un curso (HAVING)
SELECT 
    e.nombre_completo AS estudiante,
    COUNT(i.id_inscripcion) AS cantidad_cursos,
    ROUND(AVG(i.calificacion_final), 2) AS promedio
FROM estudiantes e
JOIN inscripciones i ON e.id_estudiante = i.id_estudiante
GROUP BY e.id_estudiante, e.nombre_completo
HAVING COUNT(i.id_inscripcion) > 1
ORDER BY cantidad_cursos DESC;

--  5: ALTER TABLE - agregar columna estado_academico (ya está en la creación)
-- SELECT * FROM estudiantes; -- Para ver la columna agregada

--  6: Consultar cursos con más de 2 estudiantes inscritos
SELECT 
    c.nombre AS curso,
    c.codigo,
    c.semestre,
    COUNT(i.id_inscripcion) AS total_inscritos
FROM cursos c
LEFT JOIN inscripciones i ON c.id_curso = i.id_curso
GROUP BY c.id_curso, c.nombre, c.codigo, c.semestre
HAVING COUNT(i.id_inscripcion) > 2
ORDER BY total_inscritos DESC;

-- =====================================================
-- TASK 4: SUBCONSULTAS Y FUNCIONES
-- =====================================================

-- Subconsulta 1: Estudiantes cuya calificación promedio sea > promedio general
SELECT 
    e.nombre_completo AS estudiante,
    ROUND(AVG(i.calificacion_final), 2) AS promedio_estudiante
FROM estudiantes e
JOIN inscripciones i ON e.id_estudiante = i.id_estudiante
GROUP BY e.id_estudiante, e.nombre_completo
HAVING AVG(i.calificacion_final) > (
    SELECT AVG(calificacion_final) FROM inscripciones
)
ORDER BY promedio_estudiante DESC;

-- Subconsulta 2: Nombres de carreras con estudiantes inscritos en cursos del semestre >= 2
SELECT DISTINCT carrera
FROM estudiantes
WHERE id_estudiante IN (
    SELECT DISTINCT i.id_estudiante
    FROM inscripciones i
    JOIN cursos c ON i.id_curso = c.id_curso
    WHERE c.semestre >= 2
)
ORDER BY carrera;

--  con funciones agregadas: indicadores generales
SELECT 
    COUNT(DISTINCT e.id_estudiante) AS total_estudiantes,
    COUNT(DISTINCT d.id_docente) AS total_docentes,
    COUNT(DISTINCT c.id_curso) AS total_cursos,
    COUNT(i.id_inscripcion) AS total_inscripciones,
    ROUND(AVG(i.calificacion_final), 2) AS promedio_general,
    MAX(i.calificacion_final) AS calificacion_maxima,
    MIN(i.calificacion_final) AS calificacion_minima,
    ROUND(SUM(c.creditos), 0) AS total_creditos_ofrecidos
FROM estudiantes e
CROSS JOIN docentes d
CROSS JOIN cursos c
LEFT JOIN inscripciones i ON c.id_curso = i.id_curso;

-- =====================================================
-- TASK 5: CREAR VISTA
-- =====================================================

CREATE VIEW vista_historial_academico AS
SELECT 
    e.nombre_completo AS nombre_estudiante,
    c.nombre AS nombre_curso,
    d.nombre_completo AS nombre_docente,
    c.semestre,
    i.calificacion_final,
    i.fecha_inscripcion
FROM inscripciones i
JOIN estudiantes e ON i.id_estudiante = e.id_estudiante
JOIN cursos c ON i.id_curso = c.id_curso
JOIN docentes d ON c.id_docente = d.id_docente
ORDER BY e.nombre_completo, c.semestre;

-- Consultar la vista
SELECT * FROM vista_historial_academico;

-- =====================================================
-- TASK 6: CONTROL DE ACCESO Y TRANSACCIONES
-- =====================================================

-- Crear rol revisor_academico (en MySQL se usan usuarios en lugar de roles)
-- CREATE ROLE revisor_academico;

-- Para usuarios en MySQL, crear usuario específico
-- CREATE USER 'revisor_academico'@'localhost' IDENTIFIED BY 'password123';

-- Otorgar permisos de solo lectura en la vista
-- GRANT SELECT ON gestion_academica_universidad.vista_historial_academico TO 'revisor_academico'@'localhost';

-- Revocar permisos de modificación en inscripciones
-- REVOKE INSERT, UPDATE, DELETE ON gestion_academica_universidad.inscripciones FROM 'revisor_academico'@'localhost';

-- Simular transacción: actualizar calificación con SAVEPOINT
START TRANSACTION;

SAVEPOINT antes_actualizar;

-- Actualizar calificación
UPDATE inscripciones 
SET calificacion_final = 4.75 
WHERE id_inscripcion = 1;

-- Verificar el cambio
SELECT * FROM inscripciones WHERE id_inscripcion = 1;

-- Si queremos deshacer: ROLLBACK TO SAVEPOINT antes_actualizar;
-- Si queremos confirmar:
COMMIT;

-- Verificar cambio confirmado
SELECT * FROM inscripciones WHERE id_inscripcion = 1;

-- =====================================================
-- CONSULTAS FINALES PARA VERIFICACIÓN
-- =====================================================

-- Ver todas las tablas creadas
SELECT * FROM estudiantes;
SELECT * FROM docentes;
SELECT * FROM cursos;
SELECT * FROM inscripciones;