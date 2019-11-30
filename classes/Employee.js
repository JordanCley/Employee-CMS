class Employee {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.role_id = null;
    this.manager_id = null;
  }
  async getRoleID(connection, answers) {
    // query DB and set role id to id of role
    const query = "SELECT id FROM roles WHERE ?;";
    const result = await connection.query(query, { title: answers.role });
    this.role_id += result[0].id;
    return this;
  }

  async getManagerID(connection, answers) {
    // query DB and get Dep ID of Department
    const fullName = answers.manager;
    // console.log(fullName);
    const nameArray = fullName.split(" ");
    // console.log(nameArray);
    const firstName = nameArray[0];
    // console.log(firstName);
    const lastName = nameArray[1];
    // console.log(lastName);
    const query = "SELECT id FROM employees WHERE ?";
    const result = await connection.query(query, {
      last_name: lastName
    });
    // console.log(result);
    this.manager_id = result[0].id;
    return this;
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
}

module.exports = Employee;
