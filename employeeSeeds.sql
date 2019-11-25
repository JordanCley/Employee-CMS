DROP DATABASE IF EXISTS employee_cms;
CREATE DATABASE employee_cms;

USE employee_cms;

CREATE TABLE departments(
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY(id)
);

INSERT INTO departments (name)
VALUES ("Human Resources"), ("Engineering"), ("Legal"), ("Accounting");

CREATE TABLE roles(
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NULL,
    salary DECIMAL(10,2) NULL,
    department_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(department_id) REFERENCES departments(id)
);

INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", 160000.00, 2), 
	   ("Engineer", 120000.00, 2), 
       ("Lawyer", 250000.00, 3), 
       ("Administrator", 75000.00, 1), 
       ("Accountant", 95000.00, 4);
		


CREATE TABLE employees(
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NULL,
last_name VARCHAR(30) NULL,
role_id INT NOT NULL,
manager_id INT NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY(role_id) REFERENCES roles(id),
FOREIGN KEY(manager_id) REFERENCES departments(id)
);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jordan", "McQuiston", 2, 2), 
	   ("Thomas","Collins", 4, 1), 
       ("Homar","Ibarra", 1, 2),
       ("Leslie", "Decault", 5, 4),
       ("Sarah", "Hackbarth", 3, 3), 
       ("Ryan", "Ledbetter", 4, 1); 
	   
