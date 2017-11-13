CREATE TABLE Users (
	fName VARCHAR(30) NOT NULL,
    lName VARCHAR(30) NOT NULL,
    username VARCHAR(50) NOT NULL PRIMARY KEY,
    passwrd VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL
);

CREATE TABLE Reviews (
	idReview timestamp(4) NOT NULL PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
    review VARCHAR(200) NOT NULL
);


CREATE TABLE Ordenes (
	idOrden timestamp(4) NOT NULL PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
  paquete VARCHAR(200) NOT NULL,
  comentarios VARCHAR(200) NOT NULL,
  precio INT(200) NOT NULL,
	personas INT(50) NOT NULL
);

INSERT INTO Users(fName, lName, username, passwrd, email)
VALUES  ('Gala', 'Ramos', 'galita12', 'galita21', 'gala.ramos@gmail.com'),
		('Yarely', 'Mercado', 'ymercado', 'yarely96', 'ymercado@gmail.com');
