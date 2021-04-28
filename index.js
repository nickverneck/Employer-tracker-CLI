const inquirer = require("inquirer");
const q1 = [
    {
        name:"firstQ",
        message:"What would you like to do?",
        type:"list",
        choices:["View all Employees","View all Employees by department","view all employees by Manager","add employee","delete employee","update employee role","update employee manager"]
    }
]
function checkChoice(res) {
switch (res.firstQ)
{
    case "View all Employees":
        return console.log(res.firstQ);
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
function init() {
    inquirer.prompt(q1).then((res) =>
    {
       checkChoice(res);
    })
}

// Function call to initialize app
init();
