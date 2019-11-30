require("dotenv").config();

const generateTitle = require("./StartTitle.js");
const title1 = "Employee";
const title2 = "       CMS";
const Employee = require("./classes/Employee");
const Role = require("./classes/Role");
const Department = require("./classes/Department");
const mysql = require("mysql");
const util = require("util");
const colors = require("colors");

const inquirer = require("inquirer");
let rolesArray = [];
let depArray = [];
let employeeArray = [];
let managerArray = [];

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: 3306,
  database: "employee_cms"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected! Would you like to enter?");
});

connection.query = util.promisify(connection.query);

enterprompt = () => {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "Enter",
        meassage: generateTitle(`${title1}\n${title2}`)
      }
    ])
    .then(answers => {
      promptUser();
    });
};

promptUser = () => {
  inquirer
    .prompt([
      // {
      //   type: "confirm",
      //   name: "Enter",
      //   meassage: generateTitle(`${title1}\n${title2}`)
      // },
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
          "View All Managers",
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
          "Quit",
          new inquirer.Separator()
        ]
      }
    ])
    .then(answers => {
      switch (answers.action) {
        case "Add An Employee":
          addEmployee();
          break;
        case "Add A Department":
          addDepartment();
          break;
        case "Add A Role":
          addRole();
          break;
        case "View All Employees":
          getTableEmployees();
          break;
        case "View All Managers":
          getTableManagers();
          break;
        case "View All Employees by Department":
          // do something;
          break;
        case "View All Employees By Manager":
          getTableEmployeesByManager();
          break;
        case "View All Roles":
          getTableRoles();
          break;
        case "View All Departments":
          getTableDepartments();
          break;
        case "Remove An Employee":
          removeEmployee();
          break;
        case "Remove A Role":
          removeRole();
          break;
        case "Remove A Department":
          removeDepartment();
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
  connection.end();
  console.log("Have a nice day! ^C to exit".yellow);
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
        name: "manager",
        message: "Who is the their manager?",
        choices: managerArray
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

addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What role would you like to add?"
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for this role?"
      },
      {
        type: "list",
        name: "department",
        message: "What department is this role?",
        choices: depArray
      }
    ])
    .then(answers => {
      createRole(answers);
    });
};

addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the department name?"
      }
    ])
    .then(answers => {
      createDepartment(answers);
    });
};

removeRole = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Which role would you like to remove?",
        choices: rolesArray
      }
    ])
    .then(answers => {
      deleteRole(answers);
    });
};


removeEmployee = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Which employee would you like to remove?",
        choices: employeeArray
      }
    ])
    .then(answers => {
      deleteEmployee(answers);
    });
};

removeDepartment = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "name",
        message: "Which department would you like to remove?",
        choices: depArray
      }
    ])
    .then(answers => {
      deleteDepartment(answers);
    });
};

async function createDepartment(answers) {
  name = answers.name;
  joinName = name.split(" ").join("");
  const role = new Department(answers.name);
  await role.postToDB(connection);
  depArray = [];
  getAllDepartments();
  promptUser();
}

async function createRole(answers) {
  const title = answers.title;
  joinTitle = title.split(" ").join("");
  const salary = answers.salary;
  joinSalary = salary.split(" ").join("");
  const role = new Role(answers.title, answers.salary);
  await role.getDepID(connection, answers);
  await role.postToDB(connection);
  rolesArray = [];
  getAllRoles();
  promptUser();
}

async function createEmployee(answers) {
  const first = answers.firstName;
  firstName = first.split(" ").join("");
  const last = answers.lastName;
  lastName = last.split(" ").join("");
  const employee = new Employee(firstName, lastName);
  await employee.getRoleID(connection, answers);
  await employee.getManagerID(connection, answers);
  await employee.postToDB(connection);
  employeeArray = [];
  getAllEmployees();
  promptUser();
}

async function deleteDepartment(answers) {
  const department = answers.name;
  connection.query("DELETE FROM departments Where name = ?", [department]);
  console.log(`Role: ${department} has been removed.`.red);
  promptUser();
}

async function deleteRole(answers) {
  const role = answers.role;
  connection.query("DELETE FROM roles Where title = ?", [role]);
  console.log(`Role: ${role} has been removed.`.red);
  promptUser();
}

async function deleteEmployee(answers) {
  const strName = answers.employee;
  const splitName = strName.split(" ");
  connection.query(
    "DELETE FROM employees Where first_name = ? AND last_name = ?",
    [splitName[0], splitName[1]]
  );
  console.log(`Employee: ${strName} has been removed.`.red);
  employeeArray = [];
  getAllEmployees();
  promptUser();
}

async function getAllEmployees() {
  const query = "SELECT * FROM employees";
  const result = await connection.query(query);
  result.forEach(employee => {
    const fullName = `${employee.first_name} ${employee.last_name}`;
    employeeArray.push(fullName);
  });
}

// MISSING THE MANAGERS COLUMN
async function getTableEmployees() {
  const query = "SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.name AS departments, CONCAT(b.first_name, ' ', b.last_name) AS manager FROM employees e JOIN roles r ON e.role_id=r.id JOIN departments d ON r.department_id=d.id JOIN employees b ON e.manager_id=b.id";
  const result = await connection.query(query);
  console.table(result);
  promptUser();
}


async function getTableEmployeesByManager() {
  const query = "SELECT A.first_name, A.last_name, A.id FROM employees A, employees B WHERE B.manager_id=A.id ORDER by A.id";
  console.log(query);
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

async function getAllManagers() {
  const query =
    "SELECT employees.first_name, employees.last_name FROM employees LEFT JOIN roles ON employees.role_id=roles.id WHERE roles.title = 'Manager'";
  const result = await connection.query(query);

  // console.log(result);
  for (let i = 0; i < result.length; i++) {
    let fullName = `${result[i].first_name} ${result[i].last_name}`;
    managerArray.push(fullName);
  }
}

async function getTableManagers() {
  const query =
    "SELECT employees.first_name, employees.last_name FROM employees LEFT JOIN roles ON employees.role_id=roles.id WHERE roles.title = 'Manager'";
  const result = await connection.query(query);
  console.table(result);
  promptUser();
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
  getAllEmployees();
  getAllRoles();
  getAllDepartments();
  getAllManagers();
  enterprompt();
}

init();
