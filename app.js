const path = require("path");
const fs = require("fs");

const createTeamMember = require('./lib/createTeamMember');
const addTeamMember = require('./lib/addTeamMember');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Function to build a team using exported functions from inquirer prompts and 
// generates those responses into a new object sub class from the Employee constructor.
const buildTeam = async () => {
    // array to hold all the team members generated.
    const team = [];
    // var to hold value for weather or not to add a new team member.
    let addMember = true;
    
    // do while loop if addMember is true build new team members and push that member into the team array.
        // 1. ask for role                                            
        // 2. ask role specific questions                             
        // 3. push new member
        // 4. ask if you want to create new member  (updates addMember with value)   

    let manager = await createTeamMember('Manager');    //-- inquirer promise function
    team.push(manager)
    console.log('Manager added.');                
        
    do {
        let teamMemberRole = await addTeamMember.memberRole()      // -- inquirer promise function
        let newMember = await createTeamMember(teamMemberRole);    //-- inquirer promise function
        team.push(newMember)
        console.log(`New ${teamMemberRole} added.`);
        addMember =  await addTeamMember.proceed();                //-- inquirer promise function              
    } while (addMember)

    // var for holding value of the team rendered using the render function
    const renderedTeam = render(team);
    //  Writing new file the rendered html in the output folder.
    fs.writeFile(outputPath, renderedTeam, err => {
        if (err) throw err;
        console.log('This file has been created and added to the output folder.');
    })

}
buildTeam()


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
