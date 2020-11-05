const inquirer = require("inquirer");

const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");

const createTeamMember = async (role) => {
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
    return Promise.resolve( 
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
            const uniqueValue = employeeSpecificQuestions[role].name;
            const {name, id, email} = answers;
            
            if (role === 'Engineer') {
                return new Engineer(name, id, email, answers[uniqueValue]);
                
            } else if (role === 'Manager') {
                
                return new Manager(name, id, email, answers[uniqueValue]);
            } else if (role === 'Intern') {
            
                return new Intern(name, id, email, answers[uniqueValue]);
            }
            
            // array.forEach(member => console.log(member));
        })
    )

}

module.exports = createTeamMember;