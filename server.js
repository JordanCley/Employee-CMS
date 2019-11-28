const generateTitle = require("./StartTitle.js");
const title1 = "Employee";
const title2 = "       CMS";
const Employee = require("./Employee");
const Role = require("./Role");
const Department = require("./Department");
const mysql = require("mysql");
const util = require("util");

const inquirer = require("inquirer");
const rolesArray = [];
const depArray = [];

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

connection.query = util.promisify(connection.query);

promptUser = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "Add An Employee",
          "Add A Department",
          "Add A Role",
          new inquirer.Separator(),
          "View All Employees",
          "View All Employees by Department",
          "View All Employees By Manager",
          "View All Roles",
          "View All Departments",
          new inquirer.Separator(),
          "Remove An Employee",
          "Remove A Role",
          "Remove A Department",
          new inquirer.Separator(),
          "Update Employee Role",
          "Update Employee Manager",
          new inquirer.Separator(),
          "Quit"
        ]
      }
    ])
    .then(answers => {
      switch (answers.action) {
        case "Add An Employee":
          addEmployee();
          break;
        case "Add A Department":
          console.log(`${answers.action}`);
          break;
        case "Add A Role":
          console.log(`${answers.action}`);
          break;
        case "View All Employees":
          getTableEmployees();
          break;
        case "View All Employees by Department":
          // do something;
          break;
        case "View All Employees By Manager":
          // do something;
          break;
        case "View All Roles":
          getTableRoles();
          break;
        case "View All Departments":
          getTableDepartments();
          break;
        case "Remove An Employee":
          // do something;
          break;
        case "Remove A Role":
          // do something;
          break;
        case "Remove A Department":
          // do something;
          break;
        case "Update Employee Role":
          // do something;
          break;
        case "Update Employee Manager":
          // do something;
          break;
        case "Quit":
          Quit();
          break;
      }
    });
};

Quit = () => {
  console.log("Have a nice day! ^C to exit");
};

addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "What is the employee's role?",
        choices: rolesArray
      },
      {
        type: "list",
        name: "department",
        message: "What is the employees's department?",
        choices: depArray
      },
      {
        type: "input",
        name: "firstName",
        message: "What is the employees's first name?"
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employees's last name?"
      }
    ])
    .then(answers => {
      createEmployee(answers);
      // employee.getDepId(connection, answers);
      // console.log(answers.department);
    });
};

async function createEmployee(answers) {
  const employee = new Employee(answers.firstName, answers.lastName);
  await employee.getRoleID(connection, answers);
  await employee.getDepID(connection, answers);
  await employee.postToDB(connection);
  promptUser();
}

async function getTableEmployees() {
  const query = "SELECT * FROM employees";
  const result = await connection.query(query);
  console.table(result);
  promptUser();
}

async function getAllRoles() {
  const query = "SELECT * FROM roles";
  const result = await connection.query(query);
  result.forEach(role => {
    rolesArray.push(role.title);
  });
}

async function getTableRoles() {
  const query = "SELECT * FROM roles";
  const result = await connection.query(query);
  console.table(result);
  promptUser();
}

async function getAllDepartments() {
  const query = "SELECT * FROM departments";
  const result = await connection.query(query);
  result.forEach(department => {
    depArray.push(department.name);
  });
}

async function getTableDepartments() {
  const query = "SELECT * FROM departments";
  const result = await connection.query(query);
  console.table(result);
  promptUser();
}

function init() {
  getAllRoles();
  getAllDepartments();
  promptUser();
  generateTitle("Employee \n       CMS");
}

init();

const employee = new Employee("Jordan", "McQuiston");
const role = new Role("Manager", 160000.0);
const department = new Department("Engineering");

// employee.getDepID().getRoleID();

// console.log(employee);
// console.log(role);
// console.log(department);
