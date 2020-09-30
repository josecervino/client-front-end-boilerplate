#!/usr/bin/env node

// Import the Commander library (for creating the CLI)
const { Command } = require("commander");

// // Import the fs (filesystem) library (for reading and writing to files)
// const fs = require("fs");

// Import axios http library for making API requests to server
const axios = require('axios').default;

// Import enquirer library for getting user input
const { prompt } = require('enquirer');

// Create the main CLI command
const cli = new Command("lc");

// var environmentOptions = {
//     "crhost": process.env.CRHOST || "localhost",
//     "crport": process.env.CRPORT || 3000,
//     "cruser": process.env.CRUSER
// }

// var requestOptions = {
//     host: environmentOptions.crhost,
//     port: environmentOptions.crport,
//     path: `/card/user/${environmentOptions.cruser}`
// };


// Create the "session" subcommand
const cli_session = new Command("session");
function action_session(cmdObj) {

    let route;

    if (cmdObj.updateSm2) {
        route = `users/${cmdObj.userId}/cards/session`;
    } else if (cmdObj.sectionId) {
        route = `users/${cmdObj.userId}/cards/section/${cmdObj.sectionId}`;
    }
    else {
        route = `users/${cmdObj.userId}/cards`;
    }

    let url = `http://127.0.0.1:3000/${route}`;

    // axios.get("http://127.0.0.1:3000/cards/user/e02e0b5c-d747-4645-be22-c4c050ecd025").then(async function(response) {
    axios.get(url).then(async function(response) {
    // axios.get("http://127.0.0.1:3000/users/e02e0b5c-d747-4645-be22-c4c050ecd025/cards/section/1").then(async function(response) {
        let questions = response.data;
        quiz({ questions: questions, updateSm2: cmdObj.updateSm2});

    }).catch(function(error) {
        console.log(error);
    });
}
cli_session.action(action_session);
cli_session.option("--user-id <userId>", "User ID");
cli_session.option("--section-id <sectionId>", "Section ID");
cli_session.option("--subsection-id <subsectionId>", "Subsection ID");
cli_session.option("--update-sm2", "Update SM2 parameters for spaced repetition", true);
cli_session.option("--no-update-sm2", "Do NOT update SM2 parameters for spaced repetition", true);
cli.addCommand(cli_session)


async function quiz({ questions, updateSm2=false }) {

    // NOTE: We have to define an async function so that we can call "prompt" with await
    async function prompter(question) {
        let questionStartTime = Date.now();
        const response = await prompt({
            type: 'input',
            name: 'answer',
            message: question["question"],
            question: question
        });
        let questionEndTime = Date.now();
        let questionDuration = Math.floor((questionEndTime - questionStartTime)/1000);

        let correct;

        if (response["answer"]==question["answer"]) {
            console.log("Correct!");
            correct = true;
        } else {
            console.log("Incorrect!");
            console.log(`Answer was: ${question.answer}`)
            correct = false;
        }
        console.log(`Took ${questionDuration} seconds`)

        // Compute SM2 response quality based on correctness and time taken to answer
        let quality;
        if (!correct) {
            quality = 0;
        } else if (questionDuration < 10) {
            quality = 5;
        } else if (questionDuration < 30) {
            quality = 4;
        } else if (questionDuration < 60) {
            quality = 3;
        }
        else {
            quality = 2;
        }

        return { correct, quality };
    }

    while (questions.length>0) {
        let question = questions.shift();
        let response = await prompter(question);
        let { correct, quality } = response;
        if (quality < 4) {
            questions.push(question);
        } else {
            let cardId = question.id;
            let params = {
                "cardId": cardId,
                // NOTE: Used `new Date()` instead of `Date.now()`
                "timeStamp": new Date(),
                "quality": quality
            }
            if (updateSm2) {
                axios.patch("http://127.0.0.1:3000/users/e02e0b5c-d747-4645-be22-c4c050ecd025/cards", {
                    "params": params
                }
                ).then(async function(response) {
                    // console.log(response);
                });
            }
        }
    }
}



// Parse the command-line
args = cli.parse(process.argv);