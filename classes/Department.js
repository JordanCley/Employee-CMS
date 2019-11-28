class Department {
  constructor(name) {
    this.name = name;
  }
  async postToDB(connection) {
    await connection.query("INSERT INTO departments SET ?", {
      name: this.name
    });
    console.log(`Department: ${this.name} added to the database`.red);
    return this;
  }
}

module.exports = Department;
