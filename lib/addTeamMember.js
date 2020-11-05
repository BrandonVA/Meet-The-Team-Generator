const inquirer = require('inquirer')

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
    const memberRole = async (createMember) => {
        // if (createMember) {
            return Promise.resolve(
                inquirer.prompt([
                    {
                        type: 'list',
                        message: 'What Kind of employee do you want to add?',
                        name: 'memberRole',
                        choices: [
                            'Manager',
                            'Engineer',
                            'Intern'
                        ]
                    }
                ]).then(response => {
                    return response.memberRole
                })
            )
        // }

    }

module.exports = {
    proceed: proceed,
    memberRole: memberRole
}