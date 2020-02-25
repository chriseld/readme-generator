const fs = require("fs");
const inquirer = require('inquirer');
const api = require("./utils/api");

function init() {
    inquirer
  .prompt([
    {
        name: 'username',
        message: 'What is your GitHub username?',
    },
    {
        name: 'email',
        message: 'What is your email?',
    },
    {
        name: 'projectName',
        message: 'What is your project name?',
    },
    {
        name: 'projectDesc',
        message: 'Please prvide a short description of your project.',
    },
    {
        type: 'list',
        name: 'license',
        message: 'What license do you want to use for your project?',
        choices: ['MIT', 'Creative Commons'],
    },
    {
        name: 'projectDepend',
        message: 'What command should be installed to run project dependencies?',
        default: 'npm i',
    },
    {
        name: 'projectTest',
        message: 'What command should be used to run tests?',
        default: 'npm test',
    },
    {
        name: 'useRepo',
        message: 'What does the user need to know about using the repo?',
        default: 'nothing!',
    },
    {
        name: 'contributeRepo',
        message: 'What does the user need to know about contributing to the repo?',
        default: 'nothing!',
    },
  ]).then(answers => {
    api.getUser(answers.username).then(({data}) => {
        fs.writeFile("newREADME.md", 
    `# ${answers.projectName}
    ## Description:
    ${answers.projectDesc}
    ### Table of Contents:
    - [License](#license)
    - [Dependencies](#dependencies)
    - [Testing](#testing)
    - [Usage](#usage)
    - [Contributing](#contributing)
    - [Questions](#questions)
    ### License
    ${answers.license}
    ### Dependencies
    ${answers.projectDepend}
    ### Testing
    ${answers.projectTest}
    ### Usage:
    ${answers.useRepo}
    ### Contributing
    ${answers.contributeRepo}
    ### Questions
    Regarding questions, please contact:<br>
    <img src="${data.avatar_url}" width='50px'/> ${answers.username} at email: ${answers.email}
    <br>
    ![GitHub followers](https://img.shields.io/github/followers/${answers.username}?style=social)`, 
        function(err) {
            if (err) {
                return console.log(err);
        }
        });
    });
});
}

init();