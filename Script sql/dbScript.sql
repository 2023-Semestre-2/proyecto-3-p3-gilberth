
/*
USE master ;  
GO  
DROP DATABASE BookExchangeDB ;  
GO
*/
CREATE DATABASE BookExchangeDB;
GO
USE BookExchangeDB;
go
-- Verificar y crear la tabla Users si no existe
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'Users')
CREATE TABLE Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    Email VARCHAR(255) UNIQUE,
    Password VARCHAR(255),
    RegistrationDate DATETIME
);
go

-- Verificar y crear la tabla BookStatus si no existe
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'BookStatus')
CREATE TABLE BookStatus (
    StatusID INT IDENTITY(1,1) PRIMARY KEY,
    Description VARCHAR(255)
);
go

-- Verificar y crear la tabla BookCondition si no existe
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'BookCondition')
CREATE TABLE BookCondition (
    ConditionID INT IDENTITY(1,1) PRIMARY KEY,
    Description VARCHAR(255)
);
go

-- Verificar y crear la tabla BookGenre si no existe
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'BookGenre')
CREATE TABLE BookGenre (
    GenreID INT IDENTITY(1,1) PRIMARY KEY,
    Description VARCHAR(255)
);
go

-- Verificar y crear la tabla OfferStatus si no existe
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'OfferStatus')
CREATE TABLE OfferStatus (
    StatusID INT IDENTITY(1,1) PRIMARY KEY,
    Description VARCHAR(255)
);
go

-- Verificar y crear la tabla Books si no existe
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'Books')
CREATE TABLE Books (
    BookID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    Title VARCHAR(255),
    Description TEXT,
    Author VARCHAR(255),
    PublicationYear INT,
    GenreID INT FOREIGN KEY REFERENCES BookGenre(GenreID),
    Publisher VARCHAR(255),
    StatusID INT FOREIGN KEY REFERENCES BookStatus(StatusID) DEFAULT 1,
    ConditionID INT FOREIGN KEY REFERENCES BookCondition(ConditionID)
);
go

-- Verificar y crear la tabla ExchangeOffers si no existe
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'ExchangeOffers')
CREATE TABLE ExchangeOffers (
    OfferID INT IDENTITY(1,1) PRIMARY KEY,
    OfferedBookID INT FOREIGN KEY REFERENCES Books(BookID),
    RequestedBookID INT FOREIGN KEY REFERENCES Books(BookID),
    OfferingUserID INT FOREIGN KEY REFERENCES Users(UserID),
    RequestingUserID INT FOREIGN KEY REFERENCES Users(UserID),
    OfferDate DATETIME,
    StatusID INT FOREIGN KEY REFERENCES OfferStatus(StatusID) DEFAULT 1
);
go



--Empieza Apartado BookStatus--
-- Insertar valores en la tabla BookStatus
INSERT INTO BookStatus (Description) VALUES ('Available');
INSERT INTO BookStatus (Description) VALUES ('Changed');
INSERT INTO BookStatus (Description) VALUES ('Reserved');
INSERT INTO BookStatus (Description) VALUES ('Deleted');
go
--Termina Apartado BookStatus--


--Empieza Apartado BookCondition--
-- Insertar valores en la tabla BookCondition
INSERT INTO BookCondition (Description) VALUES ('New');
INSERT INTO BookCondition (Description) VALUES ('Used - Good');
INSERT INTO BookCondition (Description) VALUES ('Used - Fair');
go
--Termina Apartado BookCondition--

--Empieza Apartado OfferStatus--
-- Insertar valores en la tabla OfferStatus
INSERT INTO OfferStatus (Description) VALUES ('Pending');
INSERT INTO OfferStatus (Description) VALUES ('Accepted');
INSERT INTO OfferStatus (Description) VALUES ('Rejected');
go
--Termina Apartado OfferStatus--

--Empieza Apartado BookGenre--

-- Insertar valores en la tabla BookGenre
INSERT INTO BookGenre (Description) VALUES ('Fiction');
INSERT INTO BookGenre (Description) VALUES ('Non-Fiction');
INSERT INTO BookGenre (Description) VALUES ('Educational');
INSERT INTO BookGenre (Description) VALUES ('Biography');
INSERT INTO BookGenre (Description) VALUES ('Science Fiction');
INSERT INTO BookGenre (Description) VALUES ('Fantasy');
go
--Termina Apartado BookGenre--


--Empieza Apartado Users --

-- Procedimiento almacenado para agregar un nuevo usuario a la tabla Users.
-- Parámetros:
-- @FirstName: Nombre del usuario.
-- @LastName: Apellido del usuario.
-- @Email: Correo electrónico del usuario.
-- @Password: Contraseña del usuario.
-- @RegistrationDate: Fecha de registro del usuario.
CREATE PROCEDURE AddUser 
    @FirstName VARCHAR(255), 
    @LastName VARCHAR(255), 
    @Email VARCHAR(255), 
    @Password VARCHAR(255),
    @RegistrationDate DATETIME
AS
BEGIN
    INSERT INTO Users (FirstName, LastName, Email, Password, RegistrationDate)
    VALUES (@FirstName, @LastName, @Email, @Password, @RegistrationDate);
END;
go

-- Procedimiento almacenado para actualizar la información de un usuario existente.
-- Parámetros:
-- @UserID: Identificador único del usuario a actualizar.
-- @FirstName: Nuevo nombre del usuario.
-- @LastName: Nuevo apellido del usuario.
-- @Email: Nuevo correo electrónico del usuario.
-- @Password: Nueva contraseña del usuario.
CREATE PROCEDURE UpdateUser 
    @UserID INT,
    @FirstName VARCHAR(255), 
    @LastName VARCHAR(255), 
    @Email VARCHAR(255), 
    @Password VARCHAR(255)
AS
BEGIN
    UPDATE Users
    SET FirstName = @FirstName,
        LastName = @LastName,
        Email = @Email,
        Password = @Password
    WHERE UserID = @UserID;
END;
go

-- Procedimiento almacenado para obtener la información de un usuario específico.
-- Parámetros:
-- @UserID: Identificador único del usuario cuya información se desea obtener.
CREATE PROCEDURE GetUser 
    @UserID INT
AS
BEGIN
    SELECT *
    FROM Users
    WHERE UserID = @UserID;
END;
go

CREATE PROCEDURE GetALLUser 
AS
BEGIN
    SELECT *
    FROM Users
END;
go

CREATE PROCEDURE UserLogin 
    @Email VARCHAR(255),
    @Password VARCHAR(255)
AS
BEGIN
    SELECT *
    FROM Users
    WHERE Email = @Email AND Password = @Password;
END;
go

-- Insertar usuarios en la tabla Users
INSERT INTO Users (FirstName, LastName, Email, Password, RegistrationDate) 
VALUES ('Juan', 'Pérez', 'juan.perez@example.com', 'password123', '2022-01-15');

INSERT INTO Users (FirstName, LastName, Email, Password, RegistrationDate) 
VALUES ('Ana', 'Gómez', 'ana.gomez@example.com', 'ana2022pass', '2022-02-20');

INSERT INTO Users (FirstName, LastName, Email, Password, RegistrationDate) 
VALUES ('Carlos', 'Martínez', 'carlos.martinez@example.com', 'carlosMtz!', '2022-03-05');

INSERT INTO Users (FirstName, LastName, Email, Password, RegistrationDate) 
VALUES ('Laura', 'Jiménez', 'laura.jimenez@example.com', 'lauraPass!', '2022-04-10');

INSERT INTO Users (FirstName, LastName, Email, Password, RegistrationDate) 
VALUES ('Eduardo', 'López', 'eduardo.lopez@example.com', 'eduardo2022', '2022-05-15');
go
--Termina Apartado Users --

--Empieza Apartado Books --
-- Procedimiento almacenado para agregar un nuevo libro a la tabla Books.
-- Parámetros:
-- @UserID: ID del usuario que posee el libro.
-- @Title: Título del libro.
-- @Description: Descripción detallada del libro.
-- @Author: Autor del libro.
-- @PublicationYear: Año de publicación del libro.
-- @GenreID: ID del género del libro.
-- @Publisher: Editorial del libro.
-- @StatusID: ID del estado actual del libro.
-- @ConditionID: ID de la condición del libro (nuevo, usado, etc.).
CREATE PROCEDURE AddBook 
    @UserID INT,
    @Title VARCHAR(255),
    @Description TEXT,
    @Author VARCHAR(255),
    @PublicationYear INT,
    @GenreID INT,
    @Publisher VARCHAR(255),
    @StatusID INT,
    @ConditionID INT
AS
BEGIN
    INSERT INTO Books (UserID, Title, Description, Author, PublicationYear, GenreID, Publisher, StatusID, ConditionID)
    VALUES (@UserID, @Title, @Description, @Author, @PublicationYear, @GenreID, @Publisher, @StatusID, @ConditionID);
END;
go

-- Procedimiento almacenado para actualizar la información de un libro existente.
-- Parámetros:
-- @BookID: ID del libro que se va a actualizar.
-- Los demás parámetros son iguales al procedimiento AddBook.
CREATE PROCEDURE UpdateBook 
    @BookID INT,
    @Title VARCHAR(255),
    @Description TEXT,
    @Author VARCHAR(255),
    @PublicationYear INT,
    @GenreID INT,
    @Publisher VARCHAR(255),
    @StatusID INT,
    @ConditionID INT
AS
BEGIN
    UPDATE Books
    SET Title = @Title,
        Description = @Description,
        Author = @Author,
        PublicationYear = @PublicationYear,
        GenreID = @GenreID,
        Publisher = @Publisher,
        StatusID = @StatusID,
        ConditionID = @ConditionID
    WHERE BookID = @BookID;
END;
GO


-- Procedimiento almacenado para obtener la información de un libro específico.
-- Parámetros:
-- @BookID: ID del libro cuya información se quiere obtener.
CREATE PROCEDURE GetBook 
    @BookID INT
AS
BEGIN
    SELECT *
    FROM Books
    WHERE BookID = @BookID;
END;
go

CREATE PROCEDURE GetAllBooks
AS
BEGIN
    SELECT *
    FROM Books
END;
go





INSERT INTO Books (UserID, Title, Description, Author, PublicationYear, GenreID, Publisher, StatusID, ConditionID) 
VALUES 
(1, 'El Misterio de la Casa Verde', 'Una emocionante novela de misterio y aventura.', 'Elena Moreno', 2018, 2, 'Editorial Luna', 1, 1),
(1, 'Aventuras en el Mar', 'Una historia apasionante sobre piratas y tesoros.', 'Carlos Ruiz', 2019, 3, 'Mar Editores', 1, 2),
(2, 'El Jardín Secreto', 'Un relato sobre el descubrimiento y la amistad.', 'María Ortega', 2015, 1, 'Flor Editorial', 1, 3),
(2, 'Historias de Otro Mundo', 'Cuentos fantásticos de seres y lugares mágicos.', 'Julio Verne', 2020, 5, 'Aventura Cósmica', 2, 1),
(3, 'Ciencia y Tecnología', 'Una exploración de los avances científicos más recientes.', 'Ana Martínez', 2021, 4, 'Tech Mundo', 1, 2);
go

--Termina Apartado Books --

--Empieza Apartado ExchangeOffers--

-- Procedimiento almacenado para agregar una nueva oferta de intercambio de libros.
-- Parámetros:
-- @OfferedBookID: ID del libro que se ofrece en el intercambio.
-- @RequestedBookID: ID del libro que se solicita a cambio.
-- @OfferingUserID: ID del usuario que ofrece el libro.
-- @RequestingUserID: ID del usuario que solicita el libro.
-- @OfferDate: Fecha y hora en que se realiza la oferta.
-- @StatusID: ID del estado de la oferta, referenciando a la tabla OfferStatus.
CREATE PROCEDURE AddExchangeOffer 
    @OfferedBookID INT,
    @RequestedBookID INT,
    @OfferingUserID INT,
    @RequestingUserID INT,
    @OfferDate DATETIME
AS
BEGIN
    INSERT INTO ExchangeOffers (OfferedBookID, RequestedBookID, OfferingUserID, RequestingUserID, OfferDate)
    VALUES (@OfferedBookID, @RequestedBookID, @OfferingUserID, @RequestingUserID, @OfferDate);
END;
go
-- Procedimiento almacenado para actualizar el estado de una oferta de intercambio.
-- Parámetros:
-- @OfferID: ID de la oferta de intercambio que se actualizará.
-- @StatusID: Nuevo ID del estado de la oferta, referenciando a la tabla OfferStatus.
CREATE PROCEDURE UpdateExchangeOfferStatus 
    @OfferID INT,
    @StatusID INT
AS
BEGIN
    UPDATE ExchangeOffers
    SET StatusID = @StatusID
    WHERE OfferID = @OfferID;
END;
go

-- Procedimiento almacenado para obtener información sobre una oferta de intercambio específica.
-- Parámetros:
-- @OfferID: ID de la oferta de intercambio de la que se quiere obtener información.
CREATE PROCEDURE GetExchangeOffer 
    @OfferID INT
AS
BEGIN
    SELECT *
    FROM ExchangeOffers
    WHERE OfferID = @OfferID;
END;
go

CREATE PROCEDURE GetAllExchangeOffer 
AS
BEGIN
    SELECT *
    FROM ExchangeOffers
END;
go

execute GetAllExchangeOffer


INSERT INTO ExchangeOffers (OfferedBookID, RequestedBookID, OfferingUserID, RequestingUserID, OfferDate) 
VALUES 
(1, 2, 1, 2, '2023-03-15'),
(3, 1, 2, 3, '2023-03-16'),
(2, 1, 3, 4, '2023-03-17'),
(2, 1, 4, 1, '2023-03-18');
go

--Empieza Apartado ExchangeOffers--


CREATE PROCEDURE GetAllBookStatus
AS
BEGIN
    SELECT * FROM BookStatus;
END;
go

CREATE PROCEDURE GetAllBookConditions 
AS
BEGIN
    SELECT * FROM BookCondition;
END;
go

CREATE PROCEDURE GetAllBookGenres 
AS
BEGIN
    SELECT * FROM BookGenre;
END;
GO

CREATE PROCEDURE GetAllOfferStatus
AS
BEGIN
    SELECT * FROM OfferStatus;
END;
GO



EXECUTE GetAllBookStatuses
GO
EXECUTE GetAllBookConditions
GO
EXECUTE GetAllBookGenres
GO

EXECUTE GetALLUser
GO
