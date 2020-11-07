const inquirer = require("inquirer");

const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");

// Function to create a new class instance for an employee based on questions asked from inquirer prompts
// depending on what type of employee is entered the questions vary depending on the role.
const createTeamMember = async (role) => {
    // Object to contain different possible questions for the types of employees.
    const employeeSpecificQuestions = {
        Manager: {
            message: 'What is the managers office number?',
            name: 'officeNumber'
        },
        Engineer: {
            message: 'What is github username?',
            name: 'github'
        },
        Intern: {
            message: 'What is your schools name?',
            name: 'school'
        },
    }
    // return a promise.
    return Promise.resolve( 
        // Ask the user for the employees data.
            inquirer.prompt([
            {
                type: 'input',
                message: 'What is your name?',
                name: 'name'
            },
            {
                type: 'input',
                message: 'What is your id',
                name: 'id'
            },
            {
                type: 'input',
                message: 'What is your email?',
                name: 'email'
            },
            {
                type: 'input',
                message: `${employeeSpecificQuestions[role].message}`,
                name: `${employeeSpecificQuestions[role].name}`
            },
        ]).then((answers) => {
            // Storing data for inquirer prompts.
            const uniqueValue = employeeSpecificQuestions[role].name;
            const {name, id, email} = answers;
            
            // Build new instance of the type of employee that was chosen.
            if (role === 'Engineer') {
                return new Engineer(name, id, email, answers[uniqueValue]);
            } else if (role === 'Manager') {
                return new Manager(name, id, email, answers[uniqueValue]);
            } else if (role === 'Intern') {
                return new Intern(name, id, email, answers[uniqueValue]);
            }
            
        })
    )

}

module.exports = createTeamMember;