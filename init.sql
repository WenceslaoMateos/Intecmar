CREATE TABLE User (
    id_user INT AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    birthDate DATE NOT NULL,
    PRIMARY KEY (id_user)
);

CREATE TABLE Role (
    id_role INT AUTO_INCREMENT,
    name VARCHAR(100),
    public BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (id_role)
);

CREATE TABLE UsersXRol (
    id_usersxrole INT AUTO_INCREMENT,
    id_user INT NOT NULL,
    id_role INT NOT NULL,
    PRIMARY KEY (id_usersxrole),
    FOREIGN KEY (id_user) REFERENCES User(id_user),
    FOREIGN KEY (id_role) REFERENCES Role(id_role)
);

INSERT INTO Role (name, public)
VALUES 
('Administrador', FALSE),
('Emprendedor/a Incipiente', TRUE),
('Emprendedor/a con empresa en marcha', TRUE),
('Empresario/a joven', TRUE),
('Empresario/a maduro', TRUE),
('Docente o Facilitador/a', TRUE),
('Investigador/a', TRUE),
('Consultor/a', TRUE),
('Mentor/a', TRUE),
('Tutor/a', TRUE),
('Estudiante', TRUE),
('Inversor/a', TRUE),
('Jurado', TRUE),
('Referente Institucional', TRUE),
('Evaluador/a', TRUE);