// //startTests
// console.log("test");
// console.log(subjects);
//
// const testText = document.getElementById("test");
//
// testText.innerHTML = subjects[0]["title"];
// testText.innerHTML = subjects[0]["title"];
//
// //endTests

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

//
const partiesLength = parties.length - 1;
const subjectsLenght = subjects.length - 1;
var CSPName; //currentSubjectsPartyName
var CSPPosition; //currentSubjectsPartyPosition
var CPName; //currentPartyName
var partyPoints;
var questionNumber = 0;
var addPoints = 1;
var startStatus = false;
var nextQuestionStatus = false;


//sets buttonChoice to pro
function yesButtonAdd() {
    console.log("pro");
    buttonChoice = "pro";
    checker()
}
//sets buttonChoice to ambivalent
function noneButtonAdd() {
    console.log("ambivalent");
    buttonChoice = "ambivalent";
    checker()
}
//sets buttonChoice to contra
function noButtonAdd() {
    console.log("contra");
    buttonChoice = "contra";
    checker()
}


function checker()
{
    if (questionNumber === 0 && startStatus === false)
    {
        console.log("Start");
        startButton.classList.add("w3-hide");
        mainBox.classList.remove("w3-hide");
        startStatus = true;
        nextQuestion();
    } else if (questionNumber >= subjectsLenght) {
        testResult();
    } else {
        console.log("buttonChoice: " + buttonChoice);
        console.log("partiesLength: " + partiesLength);

        //runs through all the parties
        for (var subjectsPartiesLoop = 0; subjectsPartiesLoop >= partiesLength;)
        {
            console.log("2");
            //sets the variables to the current party name and its position
            CSPName = subjects[subjectsPartiesLoop]["name"];
            CSPPosition = subjects[subjectsPartiesLoop]["position"];
            console.log(CSPName + CSPPosition);

            //checks if your choice is the same as the parties position on the current subject
            if (buttonChoice === CSPPosition)
            {
                console.log("3");
                for (var partiesLoop = 0; partiesLoop >= partiesLength;)
                {
                    CPName = parties[partiesLoop]["name"];
                    if (CSPName === CPName)
                    {
                        console.log("4");
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

    for (var createLoop = 0; createLoop > partiesLength;) {
        var createDiv = document.createElement("div", {"id":"party" + createLoop}, {"class":"w3-bar-item w3-button w3-green choiceButton"});
        var createH2 = document.createElement("h2", {"id":"name" + createLoop}, parties[createLoop]["name"]);
        var createP0 = document.createElement("p", {"id":"size" + createLoop}, parties[createLoop]["size"]);
        var createP1 = document.createElement("p", {"id":"points" + createLoop}, parties[createLoop]["points"]);
        resultBox.appendChild(createDiv);
        createDiv.appendChild(createH2);
        createDiv.appendChild(createP0);
        createDiv.appendChild(createP1);
        createLoop++;
    }
}

    // //displays result of the test
    // mainBox.classList.add("w3-hide");
    // resultBox.classList.remove("w3-hide");
    // var createDiv = document.createElement("div", {"id":"party"});
    // var createH2 = document.createElement("h2");
    // var createP = document.createElement("p");
    // parties.forEach(function(party)
    // {
    //     resultBox.appendChild("createDiv");
    //     createDiv.id =
    //     createDiv.appendChild("createH2");
    //     createDiv.appendChild("createP");
    //     NAME.innerHTML = party["name"];
    //     NAME.innerHTML = party["size"];
    //     resultBox.document.createElement("")
    // });



















// function foldout()
// {
//     // subjects.forEach(subjects[questionNumber]) {
//     //
//     // }
// }

// document.getElementById("I-knop").style.display="block";
// document.getElementById('text-h').innerHTML ='You awake at the sound of sirens.';
// document.getElementById('text').innerHTML ='A nuclear war has started';
// document.body.style.background="url('img/Fallout-1.jpg')";
// document.body.style.backgroundSize='cover';
// document.getElementById("knop1").style.display="block";