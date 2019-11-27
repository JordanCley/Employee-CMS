class Employee {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.role_id = null;
    this.department_id = null;
  }
  getRoleID(connection, answers) {
    // query DB and set role id to id of role
    const query = `SELECT id FROM roles WHERE ?;`;
    connection.query(query, { title: answers.role }, (err, data) => {
      if (err) throw err;
      console.log(data);
      return (this.role_id = data.id);
      // connection.end();
    });
  };

  getDepID(connection, answers) {
    // query DB and get Dep ID of Department
    const query = `SELECT id FROM departments WHERE ?;`;
    connection.query(query, { name: answers.department }, (err, data) => {
      if (err) throw err;
      console.log(data);
      return (this.department_id = data.id);
      // connection.end();
    });
  }
}

module.exports = Employee;
