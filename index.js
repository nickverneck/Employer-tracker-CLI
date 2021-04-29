const inquirer = require("inquirer");
const connection = require("./config/Connection")
const q1 = [
    {
        name: "firstQ",
        message: "What would you like to do?",
        type: "list",
        choices: ["View all Employees", "View all roles", "View all departments", "add employee", "add department", "add role", "update employee role", "exit", "View all Employees by department", "view all employees by Manager", "delete employee", "update employee manager", "exit"]
    }
];
// this fuction will do a query and return all employees
// then it will promp the first question again
const viewAllEmp = () => {
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })

}
// this function adds new employee by asking them questions and then using it values to fill the database just lkike a form
const addEmp = () => {
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;
        console.table(res);
        connection.query("SELECT * FROM employee", (err, resp) => {
            if (err) throw err;
            console.table(resp);
            const question = [
                {
                    name: "firstName",
                    message: "Whats the employee first name?",
                    type: "input",
                },
                {
                    name: "lastName",
                    message: "Whats the employee last name?",
                    type: "input",
                },
                {
                    name: "role",
                    message: "what the employee role?",
                    type: "rawlist",
                    choices() {
                        const choiceArray = [];

                        res.forEach(({ title }) => {
                            choiceArray.push(title);
                        });

                        return choiceArray;
                    }

                },
                {
                    name: "manager",
                    message: "what the employee manager?",
                    type: "rawlist",
                    choices() {
                        const choiceArray = [];
                        resp.forEach(({ first_name }) => {
                            choiceArray.push(first_name);
                        });
                        choiceArray.push('');
                        return choiceArray;
                    }
                }
            ]
            inquirer.prompt(question).then((answer) => {
                let chosenRole;

                res.forEach((item) => {
                    if (item.title === answer.role) {
                        chosenRole = item;
                    }
                });
                // check if we have any users to be manager if it doesn't do a insert query without chosen manager variable otherwise do one with .
                if (resp == '') {
                    connection.query(
                        'INSERT INTO employee SET ?',

                        {
                            first_name: answer.firstName,
                            last_name: answer.lastName,
                            role_id: chosenRole.id,

                        },
                        (err) => {
                            if (err) throw err;
                            console.log('Your employee data was created successfully!');
                            init();
                        }
                    );
                }
                else {
                    let chosenManager;
                    resp.forEach((item) => {

                        if (item.first_name === answer.manager) {
                            chosenManager = item.id;
                        }
                    });
                    connection.query(
                        'INSERT INTO employee SET ?',

                        {
                            first_name: answer.firstName,
                            last_name: answer.lastName,
                            role_id: chosenRole.id,
                            manager_id: chosenManager,
                        },
                        (err) => {
                            if (err) throw err;
                            console.log('Your employee data was created successfully!');
                            init();
                        }
                    );

                }



            })
        })
    })
}
// this fuction will do a query and return all departments
// then it will promp the first question again
const viewAllDep = () => {
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })

}
// this fuction will do a query and return all Roles
// then it will promp the first question again
const viewAllRoles = () => {
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })

}
const viewByDep = () => {
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        inquirer.prompt(
            [
                {
                    name: "choice",
                    message: "select the department",
                    type: "rawlist",
                    choices() {
                        const choiceArray = [];
                        res.forEach(({ name }) => {
                            choiceArray.push(name);
                        });
                        return choiceArray;

                    }
                }
            ]
        ).then((resp) => {
            connection.query(`SELECT * FROM employee JOIN role ON employee.role_id = role.id join JOIN department ON role.department_id = department.id WHERE department.name=${resp.choice}`,
                (erro, respo) => {
                    if (erro) throw erro;
                    console.table(respo);
                })
        });
        init();
    })
}
// will check choices from the first inquirer and return it's function
const checkChoice = (res) => {
    switch (res.firstQ) {
        case "View all Employees":
            return viewAllEmp();
        case "View all roles":
            return viewAllRoles();
        case "View all departments":
            return viewAllDep();
        case "View all Employees by department":
            return viewByDep();
        case "view all employees by Manager":
            return
        case "add employee":
            return addEmp();
        case "delete employee":
            return
        case "update employee role":
            return
        case "update employee manager":
            return
        case "exit":
            return connection.end();
    }
}
const init = () => {
    inquirer.prompt(q1).then((res) => {
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
