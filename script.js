var quizTimer = null //Variable to keep track of the game timer
var time_remaining = 60 //Time Remaining for the game
var score = 0 //User's score
var highscores = [] //Array to hold highscore objects for reading and writing to localStorage
var mainComponents = $('#main-container').children() //All distinct components in <main>
mainComponents.hide() //Hide all components first
$('#welcome').show() //First show welcome component
//Add Event handlers to all buttons in the quiz
$('.home-btn').on('click', home)
$('.start-btn').on('click', startQuiz)
$('.reset-highscores-btn').on('click', resetHighscores)
$('.highscores-btn').on('click', showHighscores)
$('#submit-btn').on('click', submitHighScore)

loadHighscores()

//Starts a countdown timer for the quiz
function countdown() {
    //start at 60 seconds
    time_remaining = 60
    //Update time-remaining element
    $('#time-remaining').text("Time Remaining: " + time_remaining)
    time_remaining--
    quizTimer = setInterval(function () {
        time_remaining--
        $('#time-remaining').text("Time Remaining: " + time_remaining)
        //If time runs out
        if (time_remaining <= 0) {
            endQuiz()
        }
    }, 1000)
}

function startQuiz() {
    score = 0
    //Start a timer
    countdown()

    //Hide all components, then show the timer and question components
    $('#main-container').children().hide()
    $('#time-remaining').show()
    $('#questions').show()
    //An Array of objects describing questions, their answer choices and the correct answer
    var slides = [
        {
            question: "Which of the following is a programming language? Like an actual programming language",
            answer_choices: ['JavaScript', 'HTML', 'CSS', "jquery"],
            correct_answer: "JavaScript"
        },
        {
            question: "What is catfish?",
            answer_choices: ['A fish', 'Its 4 life', 'Nothing really', "Bananas"],
            correct_answer: "Its 4 life"
        },
        {
            question: "Which of the following would you use for quickly creating a web app with a layout and components?",
            answer_choices: ['React', 'jquery', 'Bootstrap', "Events"],
            correct_answer: "Bootstrap"
        },
        {
            question: "Your Mom and dad are in a car accident, which one do you save first and how does that reflect our company values?",
            answer_choices: ['Mom', 'Dad', 'wtf?', "idk."],
            correct_answer: "wtf?"
        },
        {
            question: "How much wood could a woodchuck chuck if a woodchuck could chuck wood?",
            answer_choices: ['All of it', 'A lot', 'A solid 2 units of wood', "None"],
            correct_answer: "All of it"
        }
    ]
    //Use 'i' to track what question we are on
    var i = 0;
    //Get total # of questions in array
    var total_questions = slides.length
    //Remove one question object and present to the user
    var slide = slides.pop()

    //present question by injecting question and answer choices into the question component
    //from the array of questions
    $('#progress').text(`Question ${i + 1} / ${total_questions}`)
    $('#question-text').text(slide.question)
    $('#a').text(slide.answer_choices[0])
    $('#b').text(slide.answer_choices[1])
    $('#c').text(slide.answer_choices[2])
    $('#d').text(slide.answer_choices[3])

    //Hide feedback alerts
    $('.alert-success').hide()
    $('.alert-danger').hide()
    //Add Click handler, use delegation to get users choice
    $('#answer-choices').on('click', function (e) {
        //increment i by 1 to track which question we are on
        i++
        //Check if the correct answer was clicked
        if ($(e.target).text() === slide.correct_answer) {
            //If it was, add to score the number of points that question is worth
            //out of the total number of questions
            score += 100 / total_questions
            //Give positive feedback
            $('.alert-success').show()
        } else {
            //If wrong, give negative feedback and deduct 5 seconds from total time
            $('.alert-danger').show()
            time_remaining -= 5
            $('#time-remaining').text("Time Remaining: " + time_remaining)
        }
        //If there is no more time due to point deduction, end quiz
        if (time_remaining <= 0) {
            endQuiz()
        } else {
            //check if there are still questions,
            if (slides.length === 0) {
                //if no more questions end quiz
                setTimeout(function () {
                    $('.alert-success').hide()
                    $('.alert-danger').hide()
                    endQuiz()
                },1000)
            } else {
                //Otherwise, after a one second delay, show the next question
                setTimeout(function () {
                    $('.alert-success').hide()
                    $('.alert-danger').hide()
                    slide = slides.pop()
                    $('#progress').text(`Question ${i + 1} / ${total_questions}`)
                    $('#question-text').text(slide.question)
                    $('#a').text(slide.answer_choices[0])
                    $('#b').text(slide.answer_choices[1])
                    $('#c').text(slide.answer_choices[2])
                    $('#d').text(slide.answer_choices[3])
                }, 1000)
            }
        }
    })
}

function endQuiz() {
    //Stop the timer
    clearInterval(quizTimer)
    //Clear click handler
    $('#answer-choices').off('click')
    //Add remaining time to score
    score += time_remaining
    //Hide all components
    mainComponents.hide()
    //Show the done component with the users score
    $('#done').show()
    $('#score').text(score.toFixed(2))
}

function home() {
    //Hide all components
    mainComponents.hide()
    //Show Welcome component
    $('#welcome').show()
}

function submitHighScore() {
    //Create an object to hold user data
    var highscore = {
        name: $('#player-name').val().toUpperCase(),
        score: score.toFixed(2)
    }
    //Push that highscore object into the global array of highscores
    highscores.push(highscore)
    //Stringify that array, and save it to local storage
    localStorage.setItem('codingQuizHighScores', JSON.stringify(highscores))

    showHighscores()
}

function showHighscores() {
    //Hide all components, 
    mainComponents.hide()
    //Show the highscore component
    loadHighscores()
    $('#highscores').show()
}

function loadHighscores() {

    //Clear current highscores
    $('tbody').children().remove()

    //Load high scores from local storage
    var data = localStorage.getItem('codingQuizHighScores')
    //If previous highscores were found,
    if (data) {
        //parse the string representation of the array containing highscore objects
        highscores = JSON.parse(data)
        //Sort the array of objects from least highscore to greatest highscore
        highscores.sort((a, b) => b.score - a.score)
        //For each highscore object in the array of highscores
        for (var i in highscores) {
            //Append a row of data to the table in the highscore component
            $('tbody').append(
                '<tr>' +
                '<th scope="row">' + i + '</th>' +
                '<td>' + highscores[i].name + '</td>' +
                '<td>' + highscores[i].score + '</td>' +
                '</tr>'
            )
        }
    } else {
        //Otherwise, no previous highscores were found, set the array oh highscores to an empty highscore
        highscores = []
    }
}

//Clear any existing highscores from localStorage, the table in the highscores component, and the array of highscores
function resetHighscores() {
    localStorage.clear()
    $('tbody').children().remove()
    highscores = []
}