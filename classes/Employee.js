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
    console.log(this.role_id);
    return this;
  }

  async getDepID(connection, answers) {
    // query DB and get Dep ID of Department
    const query = "SELECT id FROM departments WHERE ?;";
    const result = await connection.query(query, { name: answers.department });
    this.manager_id = result[0].id;
    console.log(this.manager_id);
    //   console.log(this);
    return this;
  }

  async postToDB(connection){
    //    const query = 
      await connection.query("INSERT INTO employees SET ?",  
      {
          first_name: this.firstName,
          last_name: this.lastName,
          role_id: this.role_id,
          manager_id: this.manager_id
      });
      console.log("Employeed added to the database")
      return this;
  }
}

module.exports = Employee;
