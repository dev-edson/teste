Na primeira semana que se iniciou no dia 28/03/2022,
foi iniciado um projeto nodejs.

/*Script dbcar - */
CREATE DATABASE DBCar
use dbcar

/*Category - */
CREATE TABLE Category (
	Category_id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(128) NOT NULL
)

/*Carros - */
CREATE TABLE Carros (
	Carro_id INT AUTO_INCREMENT PRIMARY KEY,
    Category_id INT,
    carro_Color VARCHAR(16) NOT NULL,
    carro_PartNumber INT NOT NULL,
    CONSTRAINT fk_category FOREIGN KEY (category_id)
    REFERENCES category(category_id)
)


 