//Import dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');

//Inquirer questions array
const menu =
[
    {
    type: 'list',
    message: 'What would you like to do?',
    choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'EXIT'],
    name: 'action'
    },
];

// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_db'
  },
);

// connects to sql database
db.connect(function(err){

  if (err) throw err;

  //Launch Employee Database Menu
  launchMenu();

});

//Run each function based on user action
function launchMenu() {

  // prompt user actions using inquirer 
  inquirer.prompt(menu)
    .then(function(answer) {

      // execute function viewAll if user selection is "View employees"
      if(answer.action == "View All Employees") {
          
          viewAllEmployees();
      
      // execute function viewDept if user selection is "View departments"
      }else if(answer.action == "View All Departments") {

          viewDept();

      // execute function viewRoles if user selection is "View roles"
      }else if(answer.action == "View All Roles") {

          viewRoles();

      // execute function addEmployee if user selection is "Add employee"
      }else if(answer.action == "Add An Employee") {

          addEmployee();
          
      // execute function addDept if user selection is "Add department"
      }else if(answer.action == "Add A Department") {

          addDept();
      
      // execute function addRole if user selection is "Add roles"
      }else if(answer.action == "Add A Role") {

          addRole();

      // execute function addRole if user selection is "Add roles"
      }else if(answer.action == "Update An Employee Role") {

          updateEmployee();

      // execute function addRole if user selection is "Add roles"
      }else if(answer.action == "Remove employee") {

          deleteEmployee();

      // execute function EXIT if user selection is "EXIT"
      }else if(answer.action == "EXIT") {

          exit();

      }
  })
};

//Create an array of current employees
let employeeQuery = 'SELECT first_name, last_name FROM employees';

let employeeArray = [];

db.query(employeeQuery, function(err, res) {

  if (err) throw err;

  employeeArray = res.map(function (obj) {

  var employeeNames = `${obj.first_name} ${obj.last_name}`;

  employeeArray.push(employeeNames);

  return employeeArray;

  });
});

//Create an array of current roles
let roleQuery = 'SELECT title FROM roles';

let roleArray = [];

db.query(roleQuery, function(err, res) {

  if (err) throw err;

 roleArray = res.map(function (obj) {

  var titles = `${obj.title}`;

  roleArray.push(titles);

  return roleArray;

  });
});

//Questions to add employee
const addEmployeeQuestions =
[
  {
  type: 'input',
  message: 'First name of new employee:',
  name: 'firstName'
  },
  {
  type: 'input',
  message: 'Last name of new employee:',
  name: 'lastName'
  },
  {
  type: 'list',
  message: 'New employee role:',
  choices: ['Account Executive', 'Sr Account Executive', 'Sales Director', 'HR Coordinator', 'HR Director', 'Jr Developer', 'Sr Developer', 'Programming Director', 'IT Project Manager', 'IT Project Director', 'Chief Executive Officer', 'Chief Operating Officer', 'Chief Financial Officer'],
  name: 'newRole'
  },
  {
  type: 'list',
  message: 'New employee\'s manager:',
  choices: employeeArray,
  name: 'employeeManager'
  },
];

//Question to select employee to update
const updateEmployeeQuestions = 
[
  {
  type: 'list',
  message: 'Employee to update:',
  choices: employeeArray,
  name: 'empToUpdate'
  },
  {type: 'list',
  message: 'Employee\'s new role:',
  choices: roleArray,
  name: 'updateRole'
  },
];

//Question to add a department
const addDepartmentQuestions =
[
    {
    type: 'input',
    message: 'Name of new Department:',
    name: 'deptName'
    },
];

//Questions to add new role
const addRoleQuestions =
[
  {
  type: 'input',
  message: 'Name of new Role:',
  name: 'roleTitle'
  },
  {
  type: 'input',
  message: 'Salary of new Role (No symbols, round numbers only):',
  name: 'roleSalary'
  },
  {
  type: 'list',
  message: 'Assign Role to department:',
  choices: ['Sales', 'Human Resources', 'Engineering', 'IT', 'Finance', 'Executive'],
  name: 'departmentName'
  },
];

//Functions to return responses based on user action
function viewAllEmployees() {

  let query = "SELECT employees.e_id, employees.first_name, employees.last_name, roles.title AS title, departments.department_name AS department, roles.salary AS salary FROM employees JOIN roles ON employees.role_id = roles.r_id JOIN departments ON roles.department_id = departments.d_id";

  // connect to mySQL with query to view all employees
  db.query(query, function(err, res) {

      if (err) throw err;

      // show All Employees table
      console.info('');
      console.table(res); 

      // prompt user for next action
      launchMenu();
  });
};

function viewDept() {

    let query = "SELECT * FROM departments";
  
    // connect to mySQL with query to view all departments
    db.query(query, function(err, res) {
  
        if (err) throw err;
  
        // show All departments
        console.info('');
        console.table(res); 
  
        // prompt user for next action
        launchMenu();
    });
  };

  function viewRoles() {

    let query = "SELECT * FROM roles";
  
    // connect to mySQL with query to view all roles
    db.query(query, function(err, res) {
  
        if (err) throw err;
  
        // show All roles table
        console.info('');

        console.table(res); 
  
        // prompt user for next action
        launchMenu();
    });
};

//Function to add new employee 
async function addEmployee() {

  // prompt user for new employee information
  await inquirer.prompt(addEmployeeQuestions)
    .then(function(answer) {

      //Get manager's first name to pull Id before inserting as new employee's manager_id
      let firstNameSlice = answer.employeeManager.replace(/ .*/,'');

      //TODO - FIX GETTING ACTUAL MANAGER ID
      let mngrName = `SELECT e_id FROM employees WHERE first_name = "${firstNameSlice}"`;

      var mId = 1;

      // db.query(mngrName, function(err, res) {

      //   if (err) throw err;

      //   mId = res.e_id;

      // });

      //TODO - FIX INSERTING ACTUAL MANAGER ID
      let roleId = `SELECT r_id FROM roles WHERE title = "${answer.newRole}"`;

      var rId = 1;

      // db.query(roleId, function(err, res) {

      //   if (err) throw err;

      //   rId = res.r_id;
  
      // });

      //Insert new employee info into employees table
      let insertEmployeeQuery = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;

      let eValues = [answer.firstName, answer.lastName, rId, mId];

      // connect to mySQL with insert employee query
      db.query(insertEmployeeQuery, eValues, function(err, res) {

        if (err) throw err;

        console.info(`New employee added to employees table!`)

        // prompt user for next action
        launchMenu();
    });
  });
};

//Create New Department
async function addDept() {

  // prompt user for new department information
  await inquirer.prompt(addDepartmentQuestions)
    .then(function(answer) {

      //Insert new department info into departments table
      let insertDeptQuery = `INSERT INTO departments (department_name) VALUES (?)`;

      // connect to mySQL with insert query
      db.query(insertDeptQuery, answer.deptName, function(err, res) {

        if (err) throw err;

        console.info(`New department added to departments table!`)

        // prompt user for next action
        launchMenu();
    });
  });
};

//Create New Role
async function addRole() {

  // prompt user for new role information
  await inquirer.prompt(addRoleQuestions)
    .then(function(answer) {

      //Insert new role info into roles table
      let insertRoleQuery = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;

      //TODO - FIX INSERTING ACTUAL MANAGER ID 
      let dId = 1;

      let rValues = [answer.roleTitle, answer.roleSalary, dId];

      // connect to mySQL with insert query
      db.query(insertRoleQuery, rValues, function(err, res) {

        if (err) throw err;

        console.info(`New role added to roles table!`)

        // prompt user for next action
        launchMenu();
    });
  });
};

//Update Employee Role
async function updateEmployee() {
    
  // prompt user to select employee to update
  inquirer.prompt(updateEmployeeQuestions)
  .then(function(answer) {

    let employeeToUpdate = answer.empToUpdate;

    let roleToUpdate = answer.updateRole;

    let getRoleId = `SELECT r_id FROM roles WHERE title = "${roleToUpdate}"`;

    db.query(getRoleId, function(err, res) {

      if (err) throw err;

      let roleIdResponse = res[0].r_id;

      let empNameSlice = employeeToUpdate.replace(/ .*/,'');

      let employeeUpdateQuery = `UPDATE employees SET role_id = ${roleIdResponse} WHERE first_name = "${empNameSlice}"`;

      db.query(employeeUpdateQuery, function(err, res) {

        if (err) throw err;

        console.log(`Emloyee role updated to: ${roleIdResponse}`)

        // prompt user for next action
        launchMenu();

      })
    })
  })
};