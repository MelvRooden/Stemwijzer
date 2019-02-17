
//boxes
const startButton = document.getElementById("start");
const mainBox = document.getElementById("mainBox");
const opinionBox = document.getElementById("opinionBox");
const resultBox = document.getElementById("resultBox");
const resultBoxContainer = document.getElementById("resultBoxContainer");

//text
const title = document.getElementById("title");
const question = document.getElementById("question");

//spare buttons
const backButton = document.getElementById("back");
const countButton = document.getElementById("count");

//choice button save
var userChoice = [];
var answersPoints = [];

//array lengths
const subjectsLength = subjects.length - 1;

//
var questionNumber = 0;
var addPoints = 1;
var startStatus = false;
var nextQuestionStatus = false;
var foldoutStatus = false;
var previousQuestionStatus = false;
var colorFoldOutStatus = false;


function buttonFunction(choice)
{
    console.log("function: buttonFunction");
    if (choice === "pro") {
        userChoice.push("pro");

    } else if (choice === "ambivalent") {
        userChoice.push("ambivalent");

    } else if (choice === "contra") {
        userChoice.push("contra");

    } else if (choice === "skip") {
        userChoice.push("skip");
        answersPoints.push(0);

    } else {
        error();

    }
    console.log("userChoice = " + userChoice[questionNumber]);
    checker();

}


function checker()
{
    console.log("run function: checker");

    if (questionNumber === 0 && startStatus === false) {
        start();
        nextQuestion();

    } else if (userChoice[questionNumber] === "skip") {
        nextQuestion();

    } else if (userChoice[questionNumber] === "pro" || userChoice[questionNumber] === "ambivalent" || userChoice[questionNumber] === "contra") {
        pointAdder();
        nextQuestion();

    } else {
        error();

    }
}


function start() {
    console.log("function: start");
    startButton.classList.add("w3-hide");
    mainBox.classList.remove("w3-hide");
    startStatus = true;
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


function nextQuestion()
{
    console.log("function: nextQuestion");
    if (foldoutStatus === true) {
        foldOut();

    }

    if (questionNumber === subjectsLength) {
        testResult()

    } else if (nextQuestionStatus === true) {
        //displays the next title with the corresponding question
        //enables the backButton
        backButton.disabled = false;
        console.log("back button enabled");
        questionNumber++;

    } else {
        nextQuestionStatus = true;

    }

    title.innerHTML = subjects[questionNumber]["title"];
    question.innerHTML = subjects[questionNumber]["statement"];
    alert();
}


function alert() {
    console.log("function: alert");
    document.getElementById("alertPanel").classList.remove("w3-hide");
    document.getElementById("alertPanelTitle").innerText = "Vraag " + (questionNumber + 1) + ".";

    if (questionNumber >= subjectsLength - 1) {
        document.getElementById("alertPanelText").innerText = "Nog " + (subjectsLength - questionNumber + 1) + " vraag te gaan.";

    } else if (questionNumber < subjectsLength) {
        document.getElementById("alertPanelText").innerText = "Nog " + (subjectsLength - questionNumber + 1) + " vragen te gaan.";

    } else {
        error();

    }
    setTimeout(hideAlert, 5000);

    function hideAlert() {
        document.getElementById("alertPanel").classList.add("w3-hide");
    }
}


function previousQuestion()
{
    console.log("function: previousQuestion");
    if (foldoutStatus === true) {
        foldOut();

    }
    previousQuestionStatus = true;
    questionNumber--;
    pointAdder();
    userChoice.splice(questionNumber);
    answersPoints.splice(questionNumber);

    //displays the previous title with the corresponding question
    title.innerHTML = subjects[questionNumber]["title"];
    question.innerHTML = subjects[questionNumber]["statement"];

    //disabled the back button if questionNumber = 0
    if (questionNumber <= 0) {
        backButton.disabled = true;
        console.log("back button disabled");
    }
}


function pointAdder()
{
    console.log("function: pointAdder .......................... run");
    subjects[questionNumber].parties.forEach(function(subjectParty){
        if (userChoice[questionNumber] === subjectParty["position"])
        {
            // console.log(subjectParty + " has made de same choice as you (" + userChoice[questionNumber] + ")");
            parties.forEach(function(party)
            {
                if (party["name"] === subjectParty["name"])
                {
                    console.log(addPoints + " points added to " + party["name"]);
                    answersPoints.push(addPoints);
                    if (previousQuestionStatus === true) {
                        party["points"] -= (answersPoints[questionNumber]);
                        previousQuestionStatus = false;

                    } else if (previousQuestionStatus === false) {
                        party["points"] += answersPoints[questionNumber];

                    } else {
                        error();
                    }
                }
            });
      }
    });
}


function foldOut()
{
    console.log("function: foldout");
    if (foldoutStatus === false) {
        console.log("creating foldout");
        opinionBox.classList.remove("w3-hide");
        var partyNumber = 0;

        subjects[questionNumber]["parties"].forEach(function(party)
        {
            var createLi = document.createElement("button");
            var createName = document.createElement("h2");
            var createExplanation = document.createElement("p2");

            //li
            createLi.setAttribute("id", "li" + partyNumber);
            createLi.setAttribute("class", "w3-bar-item w3-button w3-hover-white w3-black");
            createLi.setAttribute("onclick", "infoFoldOut(this.dataset.explanation)");
            createLi.setAttribute("style", "width:100%;");
            createLi.setAttribute("data-explanation", "" + partyNumber);
            //name
            createName.setAttribute("style", "font-size:20px;");
            createName.innerText = party["name"];

            //Explanation
            createExplanation.setAttribute("style", "font-size:10px;");
            createExplanation.setAttribute("class", "w3-hide");
            createExplanation.setAttribute("id", "" + partyNumber);
            createExplanation.innerText = party["explanation"];

            //creates elements
            if (party["position"] === "pro") {
                document.getElementById("opinionPro").appendChild(createLi);

            } else if (party["position"] === "ambivalent") {
                document.getElementById("opinionAmbivalent").appendChild(createLi);

            } else if (party["position"] === "contra") {
                document.getElementById("opinionContra").appendChild(createLi);

            }
            createLi.appendChild(createName);
            createLi.appendChild(createExplanation);
            partyNumber++;

        });
        foldoutStatus = true;

    } else if (foldoutStatus === true) {
        console.log("remove foldout");
        opinionBox.classList.add("w3-hide");
        partyNumber = 0;

        subjects[questionNumber]["parties"].forEach(function(party)
        {
            if (party["position"] === "pro") {
                document.getElementById("opinionPro").removeChild(document.getElementById("li" + partyNumber));

            } else if (party["position"] === "ambivalent") {
                document.getElementById("opinionAmbivalent").removeChild(document.getElementById("li" + partyNumber));

            } else if (party["position"] === "contra") {
                document.getElementById("opinionContra").removeChild(document.getElementById("li" + partyNumber));

            }
            partyNumber++;
        });
        foldoutStatus = false;

    } else {
        error();

    }

}


function infoFoldOut(explanation) {
    console.log("function: infoFoldOut");
    var foldout = document.getElementById(explanation);
    var foldoutButton = document.getElementById("li" + explanation);
    foldout.classList.remove("w3-hide");
    foldoutButton.setAttribute("onclick", "infoFoldIn(this.dataset.explanation)");

}

function infoFoldIn(explanation) {
    console.log("function: infoFoldIn");
    var foldIn = document.getElementById(explanation);
    var foldInButton = document.getElementById("li" + explanation);
    foldIn.classList.add("w3-hide");
    foldInButton.setAttribute("onclick", "infoFoldOut(this.dataset.explanation)");

}


function testResult()
{
    console.log("function: testResult");
    //displays result of the test
    title.innerText = "Test Results";
    mainBox.classList.add("w3-hide");
    opinionBox.classList.add("w3-hide");
    resultBoxContainer.classList.remove("w3-hide");

    var partyNumber = 0;

    parties.forEach(function(party)
    {
        var createLi = document.createElement("li");
        var createName = document.createElement("h2");
        var createSize = document.createElement("p1");
        var createProgressbar = document.createElement("div");
        var createInnerProgressbar = document.createElement("div");

        //li
        createLi.setAttribute("class", "w-bar-item w3-light-grey w3-card");
        createLi.setAttribute("style", "width:49% font-size:30px; list-style:none;");
        //name
        createName.setAttribute("style", "font-size:30px");
        createName.innerText = party["name"];
        //size
        createInnerProgressbar.setAttribute("class", "w3-bottom-right");
        createSize.innerText = "Huidig zetel bezit: " + party["size"];
        //progressbar
        createInnerProgressbar.setAttribute("class", "w3-bottom-right");
        // createInnerProgressbar.setAttribute("style", "height:24px; width:20%;");
        createInnerProgressbar.innerText = "Punten: " + party["points"];

        //creates elements
        resultBox.appendChild(createLi);
        createLi.appendChild(createName);
        createLi.appendChild(createSize);
        createLi.appendChild(createProgressbar);
        createProgressbar.appendChild(createInnerProgressbar);

        partyNumber++;
        console.log("Cards created");

    });
}

function colorFoldOut() {
    if (colorFoldOutStatus === false) {
        document.getElementById("colorScheme").classList.remove("w3-hide");
        colorFoldOutStatus = true;

    } else if (colorFoldOutStatus === true) {
        document.getElementById("colorScheme").classList.add("w3-hide");
        colorFoldOutStatus = false;

    } else {
        error();

    }
}

function colorChange(color) {
    document.getElementById("body").setAttribute("class", "w3-" + color);
}


function error() {
    alert("Oops, it looks like something went wrong");
}