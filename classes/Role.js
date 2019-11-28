class Role {
    constructor(title, salary){
        this.title = title;
        this.salary = salary;
        this.department_id = null;
    }
    async getDepID(connection, answers){
        // get dep id from DB
        const query = "SELECT id FROM departments WHERE ?;";
        const result = await connection.query(query, { name: answers.department });
        this.department_id = result[0].id;
        return this;
    }

    async postToDB(connection){ 
          await connection.query("INSERT INTO roles SET ?",  
          {
              title: this.title,
              salary: this.salary,
              department_id: this.department_id
          });
          console.log(`Role: ${this.title} added to the database`.red)
          return this;
      }
  
}

module.exports = Role;