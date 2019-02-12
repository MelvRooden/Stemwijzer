
//boxes
const startButton = document.getElementById("start");
const mainBox = document.getElementById("mainBox");
const resultBox = document.getElementById("resultBox");

//text
const title = document.getElementById("title");
const question = document.getElementById("question");

//choice buttons
const yesButton = document.getElementById("yes");
const noneButton = document.getElementById("none");
const noButton = document.getElementById("no");

//spare buttons
const backButton = document.getElementById("back");
const countButton = document.getElementById("count");
const nextButton = document.getElementById("next");

//choice button save
var buttonChoice;

//array lengths
const partiesLength = parties.length - 1;
const subjectsLength = subjects.length - 1;

//
var CSPName; //currentSubjectsPartyName
var CSPPosition; //currentSubjectsPartyPosition
var CPName; //currentPartyName

//
var partyPoints;
var questionNumber = 0;
var addPoints = 1;
var startStatus = false;
var nextQuestionStatus = false;


function buttonFunction(choice)
{
    console.log("run function: buttonFunction");
    if (choice === "pro") {
        buttonChoice = "pro";
    } else if (choice === "ambivalent") {
        buttonChoice = "ambivalent";
    } else if (choice === "contra") {
        buttonChoice = "contra";
    } else {
        buttonChoice = "skip";
    }
    checker()
}

function count()
{
    console.log("run function: count");
    if (addPoints >= 3) {
        addPoints = 1;
        countButton.innerText = "Vraag telt " + addPoints + "x";
    } else {
        addPoints++;
        countButton.innerText = "Vraag telt " + addPoints + "x";
    }
}

function checker()
{
    console.log("run function: checker");
    if (questionNumber === 0 && startStatus === false)
    {
        console.log("start");
        startButton.classList.add("w3-hide");
        mainBox.classList.remove("w3-hide");
        startStatus = true;
        nextQuestion();

    } else if (questionNumber >= subjectsLength) {
        testResult();

    } else if (buttonChoice === "skip") {
        nextQuestion();

    } else {
        console.log("checking answer");
        subjects[questionNumber].parties.forEach(function(subjectParty){
            if (buttonChoice === subjectParty["position"])
            {
                parties.forEach(function(party)
                {
                    if (party["name"] = subjectParty["name"])
                    {
                        console.log(addPoints + " points added to " + party["name"]);
                        party["points"].push(addPoints);
                    }
                });
            }
        });
        /*
        //runs through all the parties
        for (var subjectsPartiesLoop = 0; subjectsPartiesLoop >= partiesLength;)
        {
            //sets the variables to the current party name and its position
            CSPName = subjects[subjectsPartiesLoop]["name"];
            CSPPosition = subjects[subjectsPartiesLoop]["position"];

            //checks if your choice is the same as the parties position on the current subject
            if (buttonChoice === CSPPosition)
            {
                for (var partiesLoop = 0; partiesLoop >= partiesLength;)
                {
                    CPName = parties[partiesLoop]["name"];
                    if (CSPName === CPName)
                    {
                        partyPoints = parties[partiesLoop]["points"] + addPoints;
                        parties[partiesLoop]["points"] = partyPoints;
                        // parties[partiesLoop]["points"] = parties[partiesLoop]["points"] + addPoints;
                    }
                    partiesLoop++;
                }
            }
            subjectsPartiesLoop++;
        }
        */
        nextQuestion()
    }
}


function nextQuestion()
{
    console.log("run function: nextQuestion");
    //displays the next title with the corresponding question
    if (nextQuestionStatus === true) {
        //enabled the backButton
        backButton.disabled = false;
        console.log("back button enabled");

        questionNumber++;
    } else {
        nextQuestionStatus = true;
    }

    title.innerHTML = subjects[questionNumber]["title"];
    question.innerHTML = subjects[questionNumber]["statement"];
}

function previousQuestion()
{
    console.log("run function: previousQuestion");
    questionNumber--;

    //displays the previous title with the corresponding question
    title.innerHTML = subjects[questionNumber]["title"];
    question.innerHTML = subjects[questionNumber]["statement"];

    //disabled the back button if questionNumber = 0
    if (questionNumber <= 0) {
        backButton.disabled = true;
        console.log("back button disabled");
    }
}


function testResult()
{
    console.log("run function: testResult");
    //displays result of the test
    title.innerHTML = "Test Results";
    mainBox.classList.add("w3-hide");
    resultBox.classList.remove("w3-hide");

    var createDiv = document.createElement("div");
    var createH2 = document.createElement("h2");
    var createP = document.createElement("p");
    var partyNumber = 0;

    parties.forEach(function()
    {
        //creates elements
        resultBox.appendChild(createDiv);
        createDiv.appendChild(createH2);
        createDiv.appendChild(createP);
        createDiv.appendChild(createP);

        //h1
        createH2.setAttribute("id", "party" + partyNumber);
        createH2.innerText = parties[partyNumber]["name"];
        //p
        createP.setAttribute("id", "party" + partyNumber);
        createP.innerText = parties[partyNumber]["size"];
        //p
        createP.setAttribute("id", "party" + partyNumber);
        createP.innerText = parties[partyNumber]["points"];
        //div
        createDiv.setAttribute("id", "party" + partyNumber);
        createDiv.setAttribute("class", "w-bar-item w3-button w3-light-grey");

        partyNumber++;
        console.log("created elements");
    });
    console.log(partyNumber + " Elements created");
}