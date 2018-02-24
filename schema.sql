/*

To run this file, we do the following in our Terminal:

1. Go to the directory of this sql file.

2. Get into our mysql console.

3. Run "source schema.sql"

*/

-- Create the database goals_db and specified it for use.
CREATE DATABASE goals_db;
USE goals_db;

-- Create the table plans.
CREATE TABLE goals
(
id int NOT NULL AUTO_INCREMENT,
goal varchar(255) NOT NULL,
PRIMARY KEY (id)
);

-- Insert a set of records.
INSERT INTO goals (goal) VALUES ('Plan to fight a ninja.');
