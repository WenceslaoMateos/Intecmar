SET NAMES utf8mb4;

create table proyectCategories (
    id_proyectCategory INT AUTO_INCREMENT,
    `name` varchar(255) not null,
    `description` varchar(255) not null,
    PRIMARY KEY (id_proyectCategory)
);

create table enterpriseTypes (
    id_enterpriseType INT AUTO_INCREMENT,
    `name` varchar(255) not null,
    `description` varchar(255),
    PRIMARY KEY (id_enterpriseType)
);

create table legalRepresentative (
    id_legalRepresentative INT AUTO_INCREMENT,
    firstName varchar(100) not null,
    lastName varchar(100) not null,
    birthDate date,
    dni varchar(11),
    phoneNumber int, 
    numberDocument varchar(50),
    uidDNIFile varchar(50),
    PRIMARY KEY (id_legalRepresentative)
);

create table proyect (
    id_proyect INT AUTO_INCREMENT,
    `name` varchar(255) not null,
    fantasyName varchar(255),
    email varchar(255),
    webpage varchar(255),
    instagram varchar(255),
    linkedin varchar(255),
    twitter varchar(255),
    `description` text,
    solution text,
    `value` text,
    isProduct boolean,
    description_isProduct text,
    resources text,
    birthDate date,
    formalizationDate date,
    CUIT varchar(11),
    ARCAFileName varchar(255),
    id_proyectCategory int,
    id_enterpriseType int,
    PRIMARY KEY (id_proyect),
    FOREIGN KEY (id_proyectCategory) REFERENCES proyectCategories(id_proyectCategory),
    FOREIGN KEY (id_enterpriseType) REFERENCES enterpriseTypes(id_enterpriseType)
);

create table Gender (
    id_gender INT AUTO_INCREMENT,
    `description`varchar(255) not null,
    PRIMARY KEY (id_gender)
);

create table DocumentType (
    id_DocumentType INT AUTO_INCREMENT,
    `description`varchar(255) not null,
    PRIMARY KEY (id_DocumentType)
);

CREATE TABLE Province (
    id_province VARCHAR(2) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    PRIMARY KEY (id_province)
);

CREATE TABLE County (
    id_county VARCHAR(5) NOT NULL,
    id_province VARCHAR(2) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    PRIMARY KEY (id_county),
    FOREIGN KEY (id_province) REFERENCES Province(id_province)
);

CREATE TABLE City (
    id_city VARCHAR(11) NOT NULL,
    id_county VARCHAR(5) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    PRIMARY KEY (id_city),
    FOREIGN KEY (id_county) REFERENCES County(id_county)
);

CREATE TABLE Country (
    id_country INT AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    phone_code VARCHAR(10) NOT NULL,
    PRIMARY KEY (id_country)
);

CREATE TABLE `User`
(
    id_user INT AUTO_INCREMENT,
    email varchar(255) not null,
    `password` varchar(255) not null,
    firstName varchar(100),
    lastName varchar(100),
    birthDate date,
    cuilCuit varchar(11),
    documentType int, 
    numberDocument varchar(50),
    uidDNIFile varchar(50),
    gender int,
    cvFileName varchar(255),
    `address` varchar(255),
    country int,
    province varchar(2),
    county varchar(5),
    city varchar(11),

    PRIMARY KEY (id_user),
    FOREIGN KEY (documentType) REFERENCES DocumentType (id_DocumentType),
    FOREIGN KEY (gender) REFERENCES Gender(id_gender),
    FOREIGN KEY (country) REFERENCES Country(id_country),
    FOREIGN KEY (province) REFERENCES Province(id_province),
    FOREIGN KEY (county) REFERENCES County(id_county),
    FOREIGN KEY (city) REFERENCES City(id_city)
);

CREATE TABLE `Role`(
    id_role INT AUTO_INCREMENT,
    `name` varchar(100),
    `description` text default null,
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

create table Institution (
    id_institution INT AUTO_INCREMENT,
    `name` varchar(255) not null,
    PRIMARY KEY (id_institution)
);



/************************************************************************************************************************************************************/
/************************************************************************************************************************************************************/

insert into proyectCategories(`name`, `description`)
values
('Idea', 'Proyecto en etapa conceptual, sin validación con usuarios ni desarrollo funcional. Se está definiendo la propuesta de valor y el problema a resolver.'),
('Validación de prototipo', 'Cuenta con un prototipo o MVP desarrollado y en prueba con usuarios reales para validar hipótesis clave (problema, solución, mercado).'),
('Crecimiento temprano', 'Producto validado con clientes y primeras ventas. Enfocado en mejorar el modelo de negocio y/o escalar la adquisición de usuarios.'),
('Escala/Madurez', 'Modelo de negocio con operaciones estables y foco en expansión sostenida (mercados, equipo, ingresos).');

insert into enterpriseTypes(`name`)
values
('SA'),
('SRL'),
('SAS'),
('Cooperativa'),
('UP'),
('Otra');

insert into `User`(email, `password`)
values 
('wenceslaomateos@gmail.com','$2b$10$jgJ7Gkx/RaENMCptjjbr4.CwGAJhmzJEJqYhVA6WxmQoMgh4RIwfm'),--1234
('paulabonifazi@gmail.com','$2b$10$jgJ7Gkx/RaENMCptjjbr4.CwGAJhmzJEJqYhVA6WxmQoMgh4RIwfm');

INSERT INTO `Role`(`name`, public, `description`)
VALUES 
('Administrador', FALSE, 'Usuario con permisos de administración'),
('Emprendedor/a Incipiente', TRUE, 'Tengo una idea o proyecto emprendedor y estoy organizando las actividades para ponerlo en marcha y crear la empresa'),
('Emprendedor/a con empresa en marcha', TRUE, 'Tengo una nueva empresa (menos de 3 años) y quiero crecer (corresponde a la etapa Desarrollo inicial del perfil Empresas)'),
('Empresario/a joven', TRUE, 'Tengo una empresa joven (de 3 a 15 años de antigüedad) rentable y quiero hacerla crecer'),
('Empresario/a maduro', TRUE, 'Tengo una empresa madura (más de 15 años de antigüedad)'),
('Docente o Facilitador/a', TRUE, 'Forma y guía procesos de aprendizaje vinculados al emprendimiento.'),
('Investigador/a', TRUE, 'Genera conocimiento y desarrolla soluciones aplicadas a la innovación.'),
('Consultor/a', TRUE, 'Brinda asesoramiento especializado para mejorar proyectos o empresas.'),
('Mentor/a', TRUE, 'Acompaña a emprendedores aportando experiencia, visión y red de contactos.'),
('Tutor/a', TRUE, 'Realiza seguimiento cercano del proceso de desarrollo de proyectos.'),
('Estudiante', TRUE, 'Se encuentra en formación y explora el emprendimiento como oportunidad.'),
('Inversor/a', TRUE, 'Aporta capital a proyectos con potencial de crecimiento.'),
('Jurado', TRUE, 'Evalúa proyectos según criterios definidos en convocatorias o programas.'),
('Referente Institucional', TRUE, 'Representa y articula desde una organización dentro del ecosistema.'),
('Evaluador/a', TRUE, 'Participa en la evaluación de proyectos, programas o convocatorias.'),
('Otro', TRUE, 'Rol diverso dentro del ecosistema emprendedor que no encaja en las categorías anteriores.');

insert into Gender(description)
values
('Femenino'),
('Masculino'),
('Otro');

insert into DocumentType(description)
values
('DNI'),
('Pasaporte'),
('Otro');

insert into Institution(name)
values
('Desarrollo Local e Inversiones MGP'),
('UNMDP'),
('ATICMA'),
('Universidad Atlántida'),
('Universidad CAECE'),
('Universidad FASTA'),
('UTN'),
('UNICEN'),
('ADIMRA Buenos Aires'),
('Las Brusquitas'),
('Parque Industrial MDQ'),
('UCIP'),
('CONICET'),
('Fundación UNMDP'),
('INTI'),
('Neutrón'),
('Municipio de Balcarce'),
('Municipio de General Alvarado'),
('Fundación Bolsa de Comercio MDP'),
('Consejo Profesional de Ciencias Económicas - Buenos Aires'),
('Otro');


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
    IN p_DocumentType INT,
    IN p_numberDocument VARCHAR(50),
    IN p_gender INT,
    IN p_cvFileName VARCHAR(255),
    IN p_address VARCHAR(255),
    IN p_country INT,
    IN p_province VARCHAR(2),
    IN p_county VARCHAR(5),
    IN p_city VARCHAR(11)
)
BEGIN
    INSERT INTO `User` (email, `password`, firstName, lastName, birthDate, cuilCuit, DocumentType, numberDocument, gender, cvFileName, `address`, country, province, county, city)
    VALUES (p_email, p_password, p_firstName, p_lastName, p_birthDate, p_cuilCuit, p_DocumentType, p_numberDocument, p_gender, p_cvFileName, p_address, p_country, p_province, p_county, p_city);

    SELECT LAST_INSERT_ID() AS id_user;
END $$

CREATE PROCEDURE listRoles()
BEGIN
    SELECT id_role, `name`, `description` 
    FROM `Role`
    WHERE public = TRUE;
END $$

CREATE PROCEDURE getDocumentTypes ()
BEGIN
	SELECT 
        id_DocumentType,
		description
	FROM DocumentType;
END $$

CREATE PROCEDURE getGenders ()

BEGIN
	SELECT id_gender,
		description
	FROM Gender;
END $$

create procedure getInstitutions()
BEGIN
    SELECT id_institution,
        name
    FROM Institution;
END $$

create procedure getCountries()
BEGIN
    SELECT id_country,
        `name`,
        phone_code
    FROM Country;
END $$

create procedure getProvinces()
BEGIN
    SELECT id_province,
        `name`
    FROM Province;
END $$

create procedure getCountiesByProvince(
    IN p_id_province VARCHAR(2)
)
BEGIN
    SELECT id_county,
        `name`
    FROM County
    WHERE id_province = p_id_province;
END $$

create procedure getCitiesByCounty(
    IN p_id_county VARCHAR(5)
)
BEGIN
    SELECT id_city,
        `name`
    FROM City
    WHERE id_county = p_id_county;
END $$

DELIMITER ;