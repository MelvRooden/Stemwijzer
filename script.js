
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
    if (choice === "pro") {
        buttonChoice = "pro";
    } else if (choice === "ambivalent") {
        buttonChoice = "ambivalent";
    } else if (choice === "contra") {
        buttonChoice = "contra";
    }
    checker()
}

function count()
{
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
    if (questionNumber === 0 && startStatus === false)
    {
        startButton.classList.add("w3-hide");
        mainBox.classList.remove("w3-hide");
        startStatus = true;
        nextQuestion();
    } else if (questionNumber >= subjectsLength) {
        testResult();
    } else {
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
        console.log("testje");
        nextQuestion()
    }
}


function nextQuestion()
{
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
    console.log("test result");
    //displays result of the test
    title.innerHTML = "Test Results";
    mainBox.classList.add("w3-hide");
    resultBox.classList.remove("w3-hide");

    var createDiv = document.createElement("div");
    var createH2 = document.createElement("h2");
    var createP = document.createElement("p");

    for (var createLoop = 0; createLoop < partiesLength;)
    {
        console.log("partiesLenght: " + partiesLength);
        createH2.setAttribute("id", "party" + createLoop);
        createH2.innerText = parties[createLoop]["name"];
        createDiv.appendChild(createH2);

        createP.setAttribute("id", "party" + createLoop);
        createP.innerText = parties[createLoop]["size"];
        createDiv.appendChild(createP);

        createP.setAttribute("id", "party" + createLoop);
        createP.innerText = parties[createLoop]["points"];
        createDiv.appendChild(createP);

        createDiv.setAttribute("id", "party" + createLoop);
        createDiv.setAttribute("class", "w-bar-item w3-button w3-light-grey");
        resultBox.appendChild(createDiv);

        createLoop++;
    }
}