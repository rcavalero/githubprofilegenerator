
// Minimum Requirements
// The application generates a PDF resume from the user provided GitHub profile.

// Submission Requirements
// An animated GIF demonstrating the app functionality
// A generated PDF of your GitHub profile
// The URL of the GitHub repository


// *** Todo List  ***

// revise code to use variables and functions in sample code
// convert html file to a pdf file (Clint published something in slack)
// create animated gif of the app functionality


// *** coding starts here ***
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const inquirer = require("inquirer");
const generateHTML = require("./generateHTML.js");
const writeFileAsync = util.promisify(fs.writeFile);
const gs = require('github-scraper');

let data = {};

async function getData() {
    try {
        const userAnswers = await
            inquirer.prompt(questions);
                // {
                //     type: "input",
                //     message: "Enter your GitHub username",
                //     name: "username"
                // },
                // {
                //     type: "list",
                //     message: "What is your favorite color?",
                //     choices: ["green", "blue", "pink", "red"],
                //     name: "color"
                // }
            // ]);

        const queryUrl = `https://api.github.com/users/${userAnswers.username}`;
        const gitData = await axios.get(queryUrl);

        const url = `/${userAnswers.username}`
        gs(url, function(err, scraperData) {

            data = {
                color: userAnswers.color,
                username: scraperData.username,
                image: scraperData.avatar,
                name: scraperData.name,
                company: scraperData.worksfor,
                location: gitData.data.location,
                profile: gitData.data.html_url,
                blog: gitData.data.blog,
                bio: gitData.data.bio,
                repos: scraperData.repos,
                follower: scraperData.followers,
                stars: scraperData.stars,
                following: scraperData.following
            }
        const html = generateHTML.generateHTML(data);
        writeFileAsync("index.html", html);
            }); 
    }
        catch (err) {
            console.log(err);
    };
};


const questions = [
    {
        type: "input",
        message: "Enter your GitHub username",
        name: "username"
    },
    {
        type: "list",
        message: "What is your favorite color?",
        choices: ["green", "blue", "pink", "red"],
        name: "color"
    }

];

function writeToFile(fileName, data) {

}

function init() {
    getData();
    // writeFile();
}

 init();

