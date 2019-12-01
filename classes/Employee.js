class Employee {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.role_id = null;
    this.manager_id = null;
  }

  async getRoleID(connection, answers) {
    const query = "SELECT id FROM roles WHERE ?;";
    const result = await connection.query(query, { title: answers.role });
    this.role_id += result[0].id;
    return this;
  }

  async getManagerID(connection, answers) {
    if (answers.manager) {
      const fullName = answers.manager;
      const nameArray = fullName.split(" ");
      const firstName = nameArray[0];
      const lastName = nameArray[1];
      const result = await connection.query("SELECT id FROM employees WHERE first_name=? AND last_name=?", [firstName, lastName]);
      this.manager_id = result[0].id;
      return this;
    } else {
      this.manager_id = null;
      return this;
    }
  }

  async postToDB(connection) {
    await connection.query("INSERT INTO employees SET ?", {
      first_name: this.firstName,
      last_name: this.lastName,
      role_id: this.role_id,
      manager_id: this.manager_id
    });
    console.log(
      `Employee: ${this.firstName} ${this.lastName} added to the database`.red
    );
    return this;
  }

  async updateEmployeeRoleDB(connection, answers) {
    const IdEmpArray = answers.employee.split(" ");
    const roleID = await connection.query("SELECT id FROM roles WHERE title=?",[answers.role]);
    await connection.query(`UPDATE employees SET role_id=${roleID[0].id} WHERE id=${IdEmpArray[0]}`)
    console.log(
      `Employee: ${this.firstName} ${this.lastName}'s role updated in database to ${answers.role}`.red
    );
    return this;
  }

  async updateEmployeeManagerDB(connection, answers) {
    const IdEmpArray = answers.employee.split(" ");
    const ManagerArray = answers.newManager.split(" ");
    const managerID = await connection.query("SELECT id FROM employees WHERE first_name=? AND last_name=?", [ManagerArray[0], ManagerArray[1]]);
    console.log(managerID[0].id);
    await connection.query(`UPDATE employees SET manager_id=${managerID[0].id} WHERE id=${IdEmpArray[0]}`);
    console.log(
      `Employee: ${this.firstName} ${this.lastName}'s Manager was updated in database to ${answers.newManager}`.red
    );
    return this;
  }
}



module.exports = Employee;
