const generateTitle = require('./StartTitle.js');
const title1 = 'Employee';
const title2 = '       CMS';
const Employee = require('./Employee');
const Role = require('./Role');
const Department = require('./Department');
const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    port: 3306,
    database: "employee_cms"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


getAllEmployees = () => {
    const query = "SELECT * FROM employees";
    connection.query(query, (err, data) => {
        if (err) throw err;
        console.log(data);
    })
}

getAllEmployees();
generateTitle(title1);
generateTitle(title2);

const employee = new Employee('Jordan', 'McQuiston');
const role = new Role('Manager', 160000.00);
const department = new Department('Engineering');

console.log(employee);
console.log(role);
console.log(department);

