CREATE TABLE `User`
(
    id_user INT AUTO_INCREMENT,
    email varchar(255) not null,
    `password` varchar(255) not null,
    firstName varchar(100),
    lastName varchar(100),
    birthDate date,

    PRIMARY KEY (id_user)
);

CREATE TABLE `Role`(
    id_role INT AUTO_INCREMENT,
    `name` varchar(100),
    public boolean default TRUE,

    PRIMARY KEY (id_role)
);

CREATE TABLE UsersXRol(
    id_usersxrole INT AUTO_INCREMENT,
    id_user int not null,
    id_role int not null,

    PRIMARY KEY (id_usersxrole),
    FOREIGN KEY(id_user) REFERENCES `User`(id_user),
    FOREIGN KEY(id_role) REFERENCES `Role`(id_role)
);

/************************************************************************************************************************************************************/
/************************************************************************************************************************************************************/

INSERT INTO `Role`(`name`, public)
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

/************************************************************************************************************************************************************/
/************************************************************************************************************************************************************/

DELIMITER //

CREATE PROCEDURE userExists(
    IN p_email VARCHAR(255)
)
BEGIN
    SELECT u.email, u.password
    FROM `User` u 
    WHERE u.email = p_email 
END //

DELIMITER ;
/************************************************************************************************************************************************************/

DELIMITER //

CREATE PROCEDURE userCreate(
    IN p_email VARCHAR(255),
    IN p_password VARCHAR(255)
)
BEGIN
    INSERT INTO `User` (email, `password`)
    VALUES (p_email, p_password);

    SELECT LAST_INSERT_ID() AS id_user;
END //

DELIMITER ;