SET NAMES utf8mb4;

CREATE TABLE projectCategories (
    id_projectCategory INT AUTO_INCREMENT,
    `name` varchar(255) not null,
    `description` varchar(255) not null,
    PRIMARY KEY (id_projectCategory)
);

CREATE TABLE enterpriseTypes (
    id_enterpriseType INT AUTO_INCREMENT,
    `name` varchar(255) not null,
    `description` varchar(255),
    PRIMARY KEY (id_enterpriseType)
);

CREATE TABLE legalRepresentative (
    id_legalRepresentative INT AUTO_INCREMENT,
    firstName varchar(100) not null,
    lastName varchar(100) not null,
    birthDate date,
    dni varchar(11),
    phoneNumber int, 
    email varchar(255),
    endorsment varchar(255),
    PRIMARY KEY (id_legalRepresentative)
);

create table innovationAreas (
    id_innovationArea INT AUTO_INCREMENT,
    `name` varchar(255) not null,
    `description` text,
    PRIMARY KEY (id_innovationArea)
);

CREATE TABLE Gender (
    id_gender INT AUTO_INCREMENT,
    `description` varchar(255) not null,
    PRIMARY KEY (id_gender)
);

CREATE TABLE documentType (
    id_DocumentType INT AUTO_INCREMENT,
    `description` varchar(255) not null,
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
    FOREIGN KEY (documentType) REFERENCES documentType (id_DocumentType),
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
    `public` boolean default true,

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

create table institutionType (
    id_institutionType INT AUTO_INCREMENT,
    `name` varchar(255) not null,
    PRIMARY KEY (id_institutionType)
);

create table institutionalSupportType (
    id_institutionalSupportType INT AUTO_INCREMENT,
    `name` varchar(255) not null,
    `description` text,
    PRIMARY KEY (id_institutionalSupportType)
);

create table serviceCost(
    id_serviceCost INT AUTO_INCREMENT,
    `name` varchar(255) not null,
    `description` text,
    PRIMARY KEY (id_serviceCost)
);

create table stepOfAssistance(
    id_stepOfAssistance INT AUTO_INCREMENT,
    `name` varchar(255) not null,
    `description` text,
    PRIMARY KEY (id_stepOfAssistance)
);

create table frequencyOfParticipation(
    id_frequencyOfParticipation INT AUTO_INCREMENT,
    `name` varchar(255) not null,
    PRIMARY KEY (id_frequencyOfParticipation)
);

CREATE TABLE institution (
    id_institution INT AUTO_INCREMENT,
    `name` varchar(255) not null,
    country int,
    province varchar(2),
    county varchar(5),
    city varchar(11),
    address varchar(255),
    email varchar(255),
    phoneNumber varchar(20),
    website varchar(255),
    imageFileName varchar(255),
    instagram varchar(255),
    linkedin varchar(255),
    facebook varchar(255),
    id_serviceCost int,
    numberOfProjectsSupported int,
    id_frequencyOfParticipation int,
    hasInterestInParticipating boolean,
    acceptDataUsage boolean,
    PRIMARY KEY (id_institution),
    FOREIGN KEY (country) REFERENCES Country(id_country),
    FOREIGN KEY (province) REFERENCES Province(id_province),
    FOREIGN KEY (county) REFERENCES County(id_county),
    FOREIGN KEY (city) REFERENCES City(id_city),
    FOREIGN KEY (id_serviceCost) REFERENCES serviceCost(id_serviceCost),
    FOREIGN KEY (id_frequencyOfParticipation) REFERENCES frequencyOfParticipation(id_frequencyOfParticipation)
);

create table institutionXStepOfAssistance (
    id_institutionXstepOfAssistance INT AUTO_INCREMENT,
    id_institution int,
    id_stepOfAssistance int,
    PRIMARY KEY (id_institutionXstepOfAssistance),
    FOREIGN KEY (id_institution) REFERENCES institution(id_institution),
    FOREIGN KEY (id_stepOfAssistance) REFERENCES stepOfAssistance(id_stepOfAssistance)
);

create table institutionXInstitutionalSupportType (
    id_institutionXinstitutionalSupportType INT AUTO_INCREMENT,
    id_institution int,
    id_institutionalSupportType int,
    PRIMARY KEY (id_institutionXinstitutionalSupportType),
    FOREIGN KEY (id_institution) REFERENCES institution(id_institution),
    FOREIGN KEY (id_institutionalSupportType) REFERENCES institutionalSupportType(id_institutionalSupportType)
);

create table institutionXInstitutionType (
    id_institutionXinstitutionType INT AUTO_INCREMENT,
    id_institution int,
    id_institutionType int,
    PRIMARY KEY (id_institutionXinstitutionType),
    FOREIGN KEY (id_institution) REFERENCES institution(id_institution),
    FOREIGN KEY (id_institutionType) REFERENCES institutionType(id_institutionType)
);

create table productiveSectorCategory (
    id_productiveSectorCategory INT AUTO_INCREMENT,
    `name` varchar(255) not null,
    `description` text,
    PRIMARY KEY (id_productiveSectorCategory)
);

create table productiveSector (
    id_productiveSector INT AUTO_INCREMENT,
    id_productiveSectorCategory int,
    `name` varchar(255) not null,
    `description` text,
    PRIMARY KEY (id_productiveSector),
    FOREIGN KEY (id_productiveSectorCategory) REFERENCES productiveSectorCategory(id_productiveSectorCategory)
);

create table technologicalMaturity (
    id_technologicalMaturity INT AUTO_INCREMENT,
    code varchar(255) not null,
    `description` text,
    PRIMARY KEY (id_technologicalMaturity)
);

create table degreeOfProgress (
    id_degreeOfProgress INT AUTO_INCREMENT,
    code varchar(255) not null,
    `description` text,
    PRIMARY KEY (id_degreeOfProgress)
);

create table innovationDegree (
    id_innovationDegree INT AUTO_INCREMENT,
    `name` varchar(255) not null,
    `description` text,
    PRIMARY KEY (id_innovationDegree)
);

create table certification (
    id_certification INT AUTO_INCREMENT,
    `name` varchar(255) not null,
    `description` text,
    PRIMARY KEY (id_certification)
);

create table intelectualPropertyType (
    id_intelectualPropertyType INT AUTO_INCREMENT,
    `name` varchar(255) not null,
    `description` text,
    PRIMARY KEY (id_intelectualPropertyType)
);

CREATE TABLE project (
    id_project INT AUTO_INCREMENT,
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
    id_projectCategory int,
    id_enterpriseType int,
    motivation text,
    address varchar(255),
    country int,
    province varchar(2),
    county varchar(5),
    city varchar(11),
    partnerCount int,
    id_productiveSector int,
    necessityIsValidated boolean,
    marketIsSegmented boolean,
    solutionIsValidated boolean,
    valorIsValidated boolean,
    modelIsValidated boolean,
    hasMVP boolean,
    isLabValidated boolean,
    isTestedWithUsers boolean,
    hasPlant boolean,
    needResources boolean,
    id_technologicalMaturity int,
    id_degreeOfProgress int,
    obtainedResults text,
    id_innovationDegree int,
    isTripleImpact boolean,
    economicImpact text,
    socialImpact text,
    environmentalImpact text,
    hasFirstSale boolean,
    recurringClients int,
    hasInstitucionalSupport boolean,
    PRIMARY KEY (id_project),
    FOREIGN KEY (id_projectCategory) REFERENCES projectCategories(id_projectCategory),
    FOREIGN KEY (id_enterpriseType) REFERENCES enterpriseTypes(id_enterpriseType),
    FOREIGN KEY (country) REFERENCES Country(id_country),
    FOREIGN KEY (province) REFERENCES Province(id_province),
    FOREIGN KEY (county) REFERENCES County(id_county),
    FOREIGN KEY (city) REFERENCES City(id_city),
    FOREIGN KEY (id_productiveSector) REFERENCES productiveSector(id_productiveSector),
    FOREIGN KEY (id_technologicalMaturity) REFERENCES technologicalMaturity(id_technologicalMaturity),
    FOREIGN KEY (id_degreeOfProgress) REFERENCES degreeOfProgress(id_degreeOfProgress),
    FOREIGN KEY (id_innovationDegree) REFERENCES innovationDegree(id_innovationDegree)
);

create table projectMember(
    id_projectMember INT AUTO_INCREMENT,
    id_project INT,
    id_user INT,
    PRIMARY KEY (id_projectMember),
    FOREIGN KEY (id_project) REFERENCES project(id_project),
    FOREIGN KEY (id_user) REFERENCES `User`(id_user)
);

create table projectXInnovationArea (
    id_projectXinnovationArea INT AUTO_INCREMENT,
    id_project INT,
    id_innovationArea INT,
    PRIMARY KEY (id_projectXinnovationArea),
    FOREIGN KEY (id_project) REFERENCES project(id_project),
    FOREIGN KEY (id_innovationArea) REFERENCES innovationAreas(id_innovationArea)
);

create table projectXCertification (
    id_projectXcertification INT AUTO_INCREMENT,
    id_project INT,
    id_certification INT,
    PRIMARY KEY (id_projectXcertification),
    FOREIGN KEY (id_project) REFERENCES project(id_project),
    FOREIGN KEY (id_certification) REFERENCES certification(id_certification)
);

create table projectXIntelectualPropertyType (
    id_projectXintelectualPropertyType INT AUTO_INCREMENT,
    id_project INT,
    id_intelectualPropertyType INT,
    PRIMARY KEY (id_projectXintelectualPropertyType),
    FOREIGN KEY (id_project) REFERENCES project(id_project),
    FOREIGN KEY (id_intelectualPropertyType) REFERENCES intelectualPropertyType(id_intelectualPropertyType)
);


create table states(
    id_state INT AUTO_INCREMENT,
    `name` varchar(255) not null,
    PRIMARY KEY (id_state)
);

create table modality(
    id_modality INT AUTO_INCREMENT,
    `name` varchar(255) not null,
    `description` text,
    PRIMARY KEY (id_modality)
);

create table frequency(
    id_frequency INT AUTO_INCREMENT,
    `name` varchar(255) not null,
    `description` text,
    PRIMARY KEY (id_frequency)
);

create table daysOfWeek(
    id_dayOfWeek INT AUTO_INCREMENT,
    `name` varchar(255) not null,
    PRIMARY KEY (id_dayOfWeek)
);

create table program(
    id_program INT AUTO_INCREMENT,
    `name` varchar(255) not null,
    `description` text,
    generalObjectives text,
    id_state int,
    leadInstitution int,
    contactEmail varchar(255),
    id_modality int,
    id_frequency int,
    encountersPerFrequency int,
    duration real,
    timeOfBegining time,
    timeOfEnding time,
    PRIMARY KEY (id_program),
    FOREIGN KEY (id_state) REFERENCES states(id_state),
    FOREIGN KEY (leadInstitution) REFERENCES institution(id_institution),
    FOREIGN KEY (id_modality) REFERENCES modality(id_modality),
    FOREIGN KEY (id_frequency) REFERENCES frequency(id_frequency)
);

create table objective(
    id_objective INT AUTO_INCREMENT,
    id_program INT,
    `description` text,
    PRIMARY KEY (id_objective),
    FOREIGN KEY (id_program) REFERENCES program(id_program)
);

create table usualDictationDay(
    id_usualDictationDay INT AUTO_INCREMENT,
    id_program int,
    id_dayOfWeek int,
    PRIMARY KEY (id_usualDictationDay),
    FOREIGN KEY (id_program) REFERENCES program(id_program),
    FOREIGN KEY (id_dayOfWeek) REFERENCES daysOfWeek(id_dayOfWeek)
);

create table programXRecipients(
    id_programXrecipient INT AUTO_INCREMENT,
    id_program int,
    id_role int,
    description text,
    PRIMARY KEY (id_programXrecipient),
    FOREIGN KEY (id_program) REFERENCES program(id_program),
    FOREIGN KEY (id_role) REFERENCES `Role`(id_role)
);

create table responsibleXProgram (
    id_responsibleXprogram INT AUTO_INCREMENT,
    id_user int,
    id_program int,
    PRIMARY KEY (id_responsibleXprogram),
    FOREIGN KEY (id_user) REFERENCES `User`(id_user),
    FOREIGN KEY (id_program) REFERENCES program(id_program)
);

create table programXInstitution (
    id_programXinstitution INT AUTO_INCREMENT,
    id_program int,
    id_institution int,
    PRIMARY KEY (id_programXinstitution),
    FOREIGN KEY (id_program) REFERENCES program(id_program),
    FOREIGN KEY (id_institution) REFERENCES institution(id_institution)
);



/************************************************************************************************************************************************************/
/************************************************************************************************************************************************************/

insert into daysOfWeek(`name`)
values
('Lunes'),
('Martes'),
('Miércoles'),
('Jueves'),
('Viernes'),
('Sábado'),
('Domingo');

insert into frequency(`name`)
values
('Semanal'),
('Quincenal'),
('Mensual'),
('Semestral'),
('Anual'),
('Irregular / A demanda');

insert into modality(`name`)
values
('Virtual'),
('Presencial'),
('Híbrido');

insert into frequencyOfParticipation(`name`)
values
('Permanente'),
('Frecuente (mensual o bimestral)'),
('Esporádica'),
('Aún no participó, pero está interesada/o');

insert into stepOfAssistance(`name`)
values
('Idea'),
('Validación de oportunidad'),
('Validación del desarrollo tecnológico'),
('Validación del modelo de negocios'),
('Plan de negocios'),
('Lanzamiento'),
('Crecimiento o escalabilidad');

insert into serviceCost(`name`)
values
('Gratuito'),
('Pago'),
('Mixto');

insert into institutionalSupportType(`name`)
values
('Preincubación'),
('Incubación'),
('Aceleración'),
('Mentorías'),
('Capacitación'),
('Espacio de coworking'),
('Acceso a financiamiento'),
('Vinculación con ecosistema emprendedor'),
('Formulación de projectos'),
('Asistencia para validación de projectos tecnológicos'),
('Otros');

insert into institutionType(`name`)
values
('Universidad Pública'),
('Universidad Privada'),
('Centro de Investigación'),
('Agencia de Desarrollo'),
('Gobierno Municipal/Provincial/Nacional'),
('Cámara Empresarial'),
('Cooperativa / Mutual'),
('Asociación Civil / ONG'),
('Empresa Privada'),
('Otra');

insert into intelectualPropertyType(`name`)
values
('Secreto Industrial'),
('Patente de invención'),
('Modelo de utilidad'),
('Divulgación Defensiva'),
('Registro de Marca'),
('No tiene'),
('Otro');

insert into certification(`name`)
values
('ISO 14001'),
('ISO 45001'),
('Buenas prácticas de RSE — UNMDP'),
('Distintivo Verde'),
('SMETA'),
('Sistema B'),
('GRI'),
('Otra');

insert into innovationDegree(`name`, `description`)
values
('Incremental', 'Mejoras pequeñas sobre lo existente.'),
('Modular', 'Cambios importantes en una parte específica.'),
('Radical', 'Solución totalmente nueva en un mercado actual.'),
('Disruptiva', 'Creación de un mercado nuevo o acceso masivo.'),
('Sistémica', 'Transformación de todo un ecosistema (tecnología, modelo de negocio y regulación).');

insert into degreeOfProgress(code, `description`)
values
(0, 'Solo la idea inicial.'),
(1, 'Investigación y análisis de mercado.'),
(2, 'Oportunidad identificada y validada.'),
(3, 'Modelo de negocio definido.'),
(4, 'Primera prueba de la propuesta.'),
(5, 'Plan de negocio validado.'),
(6, 'Plan de negocio desarrollado en detalle.'),
(7, 'Producto o servicio lanzado al mercado.'),
(8, 'Negocio en crecimiento sostenido.'),
(9, 'Negocio escalando y expandiéndose.');

insert into technologicalMaturity(code, `description`)
values
('TRL 0', 'Exploración e investigación temprana sin aplicación definida.'),
('TRL 1', 'Principios básicos identificados y documentados.'),
('TRL 2', 'Idea de aplicación o concepto planteado.'),
('TRL 3', 'Pruebas de laboratorio iniciales para validar el concepto.'),
('TRL 4', 'Tecnología validada en condiciones controladas de laboratorio.'),
('TRL 5', 'Tecnología probada en un entorno relevante (no real).'),
('TRL 6', 'Prototipo funcional probado en entorno relevante.'),
('TRL 7', 'Sistema probado en condiciones operativas reales limitadas.'),
('TRL 8', 'Sistema completo, certificado y listo para operar.'),
('TRL 9', 'Sistema funcionando plenamente en operación real.');

insert into productiveSectorCategory(`name`)
values
('Agricultura/Agroindustria'),
('Tecnología'),
('Industria'),
('Energía y Medio ambiente'),
('Salud y ciencias de la vida'),
('Educación'),
('Servicios financieros'),
('Construcción e Infraestructura'),
('Textil y moda'),
('Economía del Conocimiento');

insert into productiveSector(`name`, id_productiveSectorCategory)
values
('Producción agrícola', 1),
('Procesamiento de alimentos', 1),
('Tecnología agrícola (AgTech)', 1),
('Producción ganadera', 1),
('Desarrollo de software', 2),
('Inteligencia Artificial y Machine Learning', 2),
('Internet de las Cosas (IoT)', 2),
('Realidad Virtual y Aumentada', 2),
('Blockchain y Criptomonedas', 2),
('Redes y Telecomunicaciones', 2),
('Tecnología de seguridad', 2),
('Impresión 3D', 3),
('Industria automotriz', 3),
('Producción de bienes de consumo', 3),
('Energías renovables (solar, eólica, biomasa)', 4),
('Eficiencia energética', 4),
('Gestión de residuos', 4),
('Tratamiento de aguas', 4),
('Biotecnología', 5),
('Nanobiotecnología', 5),
('Dispositivos médicos', 5),
('Servicios de salud digital (eHealth)', 5),
('Investigación farmacéutica', 5),
('EdTech (tecnología educativa)', 6),
('Programas de formación y capacitación', 6),
('Desarrollo de contenidos educativos', 6),
('Plataformas de aprendizaje en línea', 6),
('FinTech', 7),
('Gestión de inversiones', 7),
('Pagos electrónicos y soluciones de banca digital', 7),
('Construcción sostenible', 8),
('Materiales de construcción innovadores', 8),
('Desarrollo inmobiliario', 8),
('Diseño de moda', 9),
('Producción textil', 9),
('Moda sostenible', 9),
('Transferencia de tecnología y conocimiento', 10),
('Consultoría y servicios profesionales', 10),
('Logística y cadena de suministros', 10),
('Otra', null);

insert into innovationAreas(`name`)
values 
('Producto'),
('Servicio'),
('Proceso'),
('Modelo de Negocios'),
('Nuevos productos o servicios (combinado)'),
('Administración - gestión'),
('Desarrollo de proveedores'),
('Producción'),
('I+D'),
('Comercialización'),
('Otra');

insert into projectCategories(`name`, `description`)
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
('wenceslaomateos@gmail.com','$2b$10$jgJ7Gkx/RaENMCptjjbr4.CwGAJhmzJEJqYhVA6WxmQoMgh4RIwfm'),/*1234*/
('rrii.atlantis@mdp.edu.ar','$2b$10$jgJ7Gkx/RaENMCptjjbr4.CwGAJhmzJEJqYhVA6WxmQoMgh4RIwfm'),/*1234*/
('paulabonifazi@gmail.com','$2b$10$jgJ7Gkx/RaENMCptjjbr4.CwGAJhmzJEJqYhVA6WxmQoMgh4RIwfm');

insert into UsersXRol(id_user, id_role)
values
(1, 1),
(2, 1),
(3, 1);

INSERT INTO `Role`(`name`, `public`, `description`)
VALUES 
('Administrador', false, 'Usuario con permisos de administración'),
('Emprendedor/a Incipiente', true, 'Tengo una idea o projecto emprendedor y estoy organizando las actividades para ponerlo en marcha y crear la empresa'),
('Emprendedor/a con empresa en marcha', true, 'Tengo una nueva empresa (menos de 3 años) y quiero crecer (corresponde a la etapa Desarrollo inicial del perfil Empresas)'),
('Empresario/a joven', true, 'Tengo una empresa joven (de 3 a 15 años de antigüedad) rentable y quiero hacerla crecer'),
('Empresario/a maduro', true, 'Tengo una empresa madura (más de 15 años de antigüedad)'),
('Docente o Facilitador/a', true, 'Forma y guía procesos de aprendizaje vinculados al emprendimiento.'),
('Investigador/a', true, 'Genera conocimiento y desarrolla soluciones aplicadas a la innovación.'),
('Consultor/a', true, 'Brinda asesoramiento especializado para mejorar projectos o empresas.'),
('Mentor/a', true, 'Acompaña a emprendedores aportando experiencia, visión y red de contactos.'),
('Tutor/a', true, 'Realiza seguimiento cercano del proceso de desarrollo de projectos.'),
('Estudiante', true, 'Se encuentra en formación y explora el emprendimiento como oportunidad.'),
('Inversor/a', true, 'Aporta capital a projectos con potencial de crecimiento.'),
('Jurado', true, 'Evalúa projectos según criterios definidos en convocatorias o programas.'),
('Referente Institucional', true, 'Representa y articula desde una organización dentro del ecosistema.'),
('Evaluador/a', true, 'Participa en la evaluación de projectos, programas o convocatorias.'),
('Otro', true, 'Rol diverso dentro del ecosistema emprendedor que no encaja en las categorías anteriores.');

insert into Gender(description)
values
('Femenino'),
('Masculino'),
('Otro');

insert into documentType(description)
values
('DNI'),
('Pasaporte'),
('Otro');

insert into institution(name)
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
    INSERT INTO `User` (email, `password`, firstName, lastName, birthDate, cuilCuit, documentType, numberDocument, gender, cvFileName, `address`, country, province, county, city)
    VALUES (p_email, p_password, p_firstName, p_lastName, p_birthDate, p_cuilCuit, p_DocumentType, p_numberDocument, p_gender, p_cvFileName, p_address, p_country, p_province, p_county, p_city);

    SELECT LAST_INSERT_ID() AS id_user;
END $$

CREATE PROCEDURE listRoles()
BEGIN
    SELECT id_role, `name`, `description` 
    FROM `Role`
    WHERE `public` = true;
END $$

CREATE PROCEDURE getDocumentTypes ()
BEGIN
	SELECT 
        id_DocumentType,
		description
	FROM documentType;
END $$

CREATE PROCEDURE getGenders ()

BEGIN
	SELECT id_gender,
		description
	FROM Gender;
END $$

CREATE procedure getinstitutions()
BEGIN
    SELECT id_institution,
        name
    FROM institution;
END $$

CREATE procedure getCountries()
BEGIN
    SELECT id_country,
        `name`,
        phone_code
    FROM Country;
END $$

CREATE procedure getProvinces()
BEGIN
    SELECT id_province,
        `name`
    FROM Province;
END $$

CREATE procedure getCountiesByProvince(
    IN p_id_province VARCHAR(2)
)
BEGIN
    SELECT id_county,
        `name`
    FROM County
    WHERE id_province = p_id_province;
END $$

CREATE procedure getCitiesByCounty(
    IN p_id_county VARCHAR(5)
)
BEGIN
    SELECT id_city,
        `name`
    FROM City
    WHERE id_county = p_id_county;
END $$

DELIMITER ;