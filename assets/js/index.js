
// Objective:
    // GIVEN the developer has a GitHub profile
    // WHEN prompted for the developer's GitHub username and favorite color
    // THEN a PDF profile is generatedThe PDF will be populated with the following:

    // Profile image                            avatar_url: 'https://avatars1.githubusercontent.com/u/57707960?v=4'
    // User name                                name: 'Robert Cavalero'
    // Links to the following:
    // User location via Google Maps            location: 'Seattle, WA'
    // User GitHub profile                      html_url: 'https://github.com/rcavalero'
    // User blog                                blog: 'https://rcavalero.github.io/portfolio/'
    // User bio                                 bio: 'I am currently enrolled in a Full-Stack Web Development Boot Camp offered by the University of Washington. '
    // Number of public repositories            public_repos: 12
    // Number of followers                      followers: 0    'https://api.github.com/users/rcavalero/followers'
    // Number of GitHub stars                   'https://api.github.com/users/rcavalero/starred{/owner}{/repo}'
    // Number of users following                following: 0   'https://api.github.com/users/rcavalero/following{/other_user}'


// Minimum Requirements
    // Functional, deployed application.
    // GitHub repository with a unique name and a README describing project.
    // The application generates a PDF resume from the user provided GitHub profile.
    // The generated resume includes a bio image from the user's GitHub profile.
    // The generated resume includes the user's location and a link to their GitHub profile.
    // The generated resume includes the number of: public repositories, followers, GitHub stars and following count.
    // The background color of the generated PDF matches the color that the user provides.

// Submission Requirements
    // You are required to submit the following:
    // An animated GIF demonstrating the app functionality
    // A generated PDF of your GitHub profile
    // The URL of the GitHub repository


// *** Todo List  ***

// add try & await to code
// revise code to use variables and functions in sample code
// use return to pass info from one function to another
// update HTML file to look like pdf example
// convert html file to a pdf file (Clint published something in slack)
// create animated gif of the app functionality
// save a pdf of my profile
// create README file 


// *** coding starts here ***


const fs = require("fs");
const util = require("util");
const axios = require("axios");
const inquirer = require("inquirer");
var generateHTML = require("./generateHTML.js");
const writeFileAsync = util.promisify(fs.writeFile);
 let data = {};

 async function getData() {
     try {
         const userAnswers = await
     inquirer
     .prompt([
    {   type: "input",
        message: "Enter your GitHub username",
        name: "username"
    },
    {
    type: "list",
    message: "What is your favorite color?",
    choices: ["green","blue","pink","red"],
    name: "color"
    }

]);

// console.log(userAnswers);

       const queryUrl = `https://api.github.com/users/${userAnswers.username}`;
//   const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

    const gitData = await axios.get(queryUrl);

    // console.log(gitData);

       data = {
        color: userAnswers.color,
        username: gitData.data.login,
        image: gitData.data.avatar_url,
        name: gitData.data.name,
        location: gitData.data.location,
        profile: gitData.data.html_url,
        blog: gitData.data.blog,
        bio: gitData.data.bio,
        repos: gitData.data.public_repos,
        follower: gitData.data.followers,
        stars: 0,
        following: gitData.data.following


    }
    console.log(data);
    const html = generateHTML.generateHTML(data);
    writeFileAsync("index.html", html);


} catch (err) {
    console.log(err);
};
};


    // });
// });
// };    


// promptUser()
// .then(function(data) {
    // console.log(data);
    
// });

// promptUser()
//   .then(function(data) {
//     const html = generateHTML(data);

//     return writeFileAsync("index.html", html);
//   })
//   .then(function() {
//     console.log("Successfully wrote to index.html");
//   })
//   .catch(function(err) {
//     console.log(err);
//   });

const questions = [

];

function writeToFile(fileName, data) {
 
}

function init() {
    getData();
    // writeFile();
}


init();


