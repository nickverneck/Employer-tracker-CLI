const inquirer = require("inquirer");
const connection = require("./config/Connection")
const q1 = [
    {
        name:"firstQ",
        message:"What would you like to do?",
        type:"list",
        choices:["View all Employees","View all Employees by department","view all employees by Manager","add employee","delete employee","update employee role","update employee manager"]
    }
];
// this fuction will do a query and return all employees
// then it will promp the first question again
const viewAll= () =>{
    connection.query("SELECT * FROM employee",(err,res)=>{
        if (err) throw err;
        console.table(res);
        init();
    })
    
}
const viewByDep= ()=>{
    connection.query("SELECT * FROM department",(err,res)=>{
        if (err) throw err;
        
        init();
    })
}
const checkChoice = (res)=> {
switch (res.firstQ)
{
    case "View all Employees":
        return viewAll();
    case "View all Employees by department":
        return
    case "view all employees by Manager":
        return
    case "add employee":
        return
    case "delete employee":
        return
    case "update employee role":
        return 
    case "update employee manager":
        return
}
}
const init = () =>{
    inquirer.prompt(q1).then((res) =>
    {
       checkChoice(res);
    })
}

// Function call to initialize app
// first it creates a connection to the database
// then it will either give an error start the app

connection.connect((err) => {
    if (err) throw err;
   init();
  });
  