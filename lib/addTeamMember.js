const inquirer = require('inquirer')

// Prompt the user if they would like to add a new member
// returns a as a promise if they select yes return true and false if no 
const proceed = async () => {
    return Promise.resolve(
        inquirer.prompt([
            {
                type: 'confirm',
                message: 'Would you like to add a team member?',
                name: 'proceed',
            }
        ]).then(response => {
            return response.proceed;
        })
    );
}

// Asks the user what type of employee they would like to create
// returns as a promise with they type of employee they selected.
const memberRole = async (createMember) => {
    return Promise.resolve(
        inquirer.prompt([
            {
                type: 'list',
                message: 'What Kind of employee do you want to add?',
                name: 'memberRole',
                choices: [
                    'Engineer',
                    'Intern'
                ]
            }
        ]).then(response => {
            return response.memberRole
        })
    )
}

module.exports = {
    proceed: proceed,
    memberRole: memberRole
}