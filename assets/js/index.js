
// Minimum Requirements
// The application generates a PDF resume from the user provided GitHub profile.

// Submission Requirements
// An animated GIF demonstrating the app functionality
// A generated PDF of your GitHub profile
// The URL of the GitHub repository


// *** Todo List  ***

// revise code to use variables and functions in sample code
// create animated gif of the app functionality

// *** coding starts here ***
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const inquirer = require("inquirer");
const generateHTML = require("./generateHTML.js");
const writeFileAsync = util.promisify(fs.writeFile);
const gs = require('github-scraper');
const pdfcrowd = require("pdfcrowd");


let data = {};


async function getData() {
// this prompts the user for username and color choice then retreives data using a couple of queiries against github APIs
    try {
        const userAnswers = await
            inquirer.prompt(questions);

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

            // this creates the index.html  file using the above data the format from generateHTML.js
        const html = generateHTML.generateHTML(data);
        writeFileAsync("../../index.html", html);

        // this creates a PDF document using the html string above
        var client = new pdfcrowd.HtmlToPdfClient("rcavalero", "bbfee87a0727daaf33389b6a07838172");
        try {
            client.setPageWidth("8.27in");
            client.setScaleFactor(75)
            client.setPrintPageRange("1")
        } catch(why) {
            console.error("Pdfcrowd Error: " + why);
            console.error("Pdfcrowd Error Code: " + why.getCode());
            console.error("Pdfcrowd Error Message: " + why.getMessage());
            process.exit(1);
        }

        client.convertStringToFile(
            html,
            "../images/profile.pdf",
            function(err, fileName) {
                if (err) return console.error("Pdfcrowd Error: " + err);
                console.log("Success: the file was created " + fileName);
                
            });
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

