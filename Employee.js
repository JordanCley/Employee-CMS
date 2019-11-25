class Employee {
    constructor(firstName, lastName){
        this.firstName = firstName;
        this.lastName = lastName;
        this.role_id = null;
        this.department_id = null;
    }
    getRoleID(){
        // query DB and set role id to id of role
        return role_id;
    }

    getDepID(){
        // query DB and get Dep ID of Department
        return department_id;
    }
}

module.exports = Employee;