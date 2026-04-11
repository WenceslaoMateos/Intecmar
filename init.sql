CREATE TABLE `User`
(
    id_user INT AUTO_INCREMENT,
    email varchar(255) not null,
    `password` varchar(255) not null,
    firstName varchar(100),
    lastName varchar(100),
    birthDate date,
    cuilCuit varchar(11),
    dni int,
    uidDNIFile varchar(50),

    PRIMARY KEY (id_user)
);

CREATE TABLE `Role`(
    id_role INT AUTO_INCREMENT,
    `name` varchar(100),
    public boolean default TRUE,

    PRIMARY KEY (id_role)
);

-- aca vamos a tener todas las configuraciones de cada rol, cosa que caundo se registre alguien, la informacion por rol se adminiostre en esta tabla
CREATE TABLE UsersXRol(
    id_usersxrole INT AUTO_INCREMENT,
    id_user INT NOT NULL,
    id_role INT NOT NULL,
    PRIMARY KEY (id_usersxrole),
    FOREIGN KEY(id_user) REFERENCES `User`(id_user),
    FOREIGN KEY(id_role) REFERENCES `Role`(id_role)
);

-- hay que guardar las institcuiones en una tabla aparte

/************************************************************************************************************************************************************/
/************************************************************************************************************************************************************/

insert into User(email, `password`)
values 
('wenceslaomateos@gmail.com','$2b$10$hL.uf3jagIPG8plLjruAXOZ6k0lDxKrdOUaJKgL3aDTTWC0/pF65O'),
('paulabonifazi@gmail.com','$2b$10$hL.uf3jagIPG8plLjruAXOZ6k0lDxKrdOUaJKgL3aDTTWC0/pF65O'),
('nahuel@gmail.com','$2b$10$hL.uf3jagIPG8plLjruAXOZ6k0lDxKrdOUaJKgL3aDTTWC0/pF65O');

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


DELIMITER $$

CREATE PROCEDURE userExists(
    IN p_email VARCHAR(255)
)
BEGIN
    SELECT u.email, u.password
    FROM `User` u 
    WHERE u.email = p_email;
END $$

CREATE PROCEDURE userCreate(
    IN p_email VARCHAR(255),
    IN p_password VARCHAR(255),
    IN p_firstName VARCHAR(100),
    IN p_lastName VARCHAR(100),
    IN p_birthDate DATE,
    IN p_cuilCuit VARCHAR(11),
    IN p_dni INT,
    IN p_uidDNIFile VARCHAR(50)
)
BEGIN
    INSERT INTO `User` (email, `password`, firstName, lastName, birthDate, cuilCuit, dni, uidDNIFile)
    VALUES (p_email, p_password, p_firstName, p_lastName, p_birthDate, p_cuilCuit, p_dni, p_uidDNIFile);

    SELECT LAST_INSERT_ID() AS id_user;
END $$

CREATE PROCEDURE listRoles()
BEGIN
    SELECT * 
    FROM `Role`;
END $$

DELIMITER ;