DROP DATABASE IF EXISTS employee_cms;
CREATE DATABASE employee_cms;

USE employee_cms;

CREATE TABLE departments(
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY(id)
);

INSERT INTO departments (name)
VALUES ("human resources"), ("engineering"), ("legal"), ("accounting");

CREATE TABLE roles(
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NULL,
    salary DECIMAL(10,2) NULL,
    department_id INT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_role_dep_id
    FOREIGN KEY(department_id) REFERENCES departments(id)
    ON DELETE CASCADE
);

INSERT INTO roles (title, salary, department_id)
VALUES ("manager", 160000.00, 1),
       ("manager", 150000.00, 2),
	   ("engineer", 120000.00, 2), 
       ("lawyer", 250000.00, 3), 
       ("administrator", 75000.00, 1), 
       ("accountant", 95000.00, 4);
		


CREATE TABLE employees(
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NULL,
last_name VARCHAR(30) NULL,
role_id INT NOT NULL,
manager_id INT NULL,
PRIMARY KEY(id),
CONSTRAINT fk_role_roles_id
FOREIGN KEY(role_id) REFERENCES roles(id)
ON DELETE CASCADE,
CONSTRAINT fk_emp_manager_id
FOREIGN KEY(manager_id) REFERENCES employees(id)
ON DELETE CASCADE
);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("jordan", "mcQuiston", 1, NULL), 
	   ("thomas","collins", 4, 1), 
       ("homar","ibarra", 2, 2),
       ("leslie", "decault", 1, NULL),
       ("sarah", "hackbarth", 3, NULL), 
       ("ryan", "ledbetter", 4, 1); 