var quizTimer = null
var score = 0
var highscores = []
var mainComponents = $('#main-container').children()
mainComponents.hide()
$('#welcome').show()
$('.home-btn').on('click', home)
$('.start-btn').on('click', startQuiz)
$('.reset-highscores-btn').on('click', resetHighscores)
$('.highscores-btn').on('click', showHighscores)
$('#submit-btn').on('click', submitHighScore)

loadHighscores()

function startQuiz() {
    score = 0
    //Start a timer
    var time_remaining = 60
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
    $('#main-container').children().hide()
    $('#time-remaining').show()
    $('#questions').show()
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
    var i = 0;
    var total_questions = slides.length
    var slide = slides.pop()

    //present question
    $('.card-title').text(`Question ${i + 1} / ${total_questions}`)
    $('.card-text').text(slide.question)
    $('#a').text(slide.answer_choices[0])
    $('#b').text(slide.answer_choices[1])
    $('#c').text(slide.answer_choices[2])
    $('#d').text(slide.answer_choices[3])

    //Add Click handler, use delegation to get users choice
    $('#answer-choices').on('click', function (e) {
        i++
        if ($(e.target).text() === slide.correct_answer) {
            score += 100 / total_questions
            console.log('correct')
        } else {
            console.log('wrong')
            time_remaining -= 5
            $('#time-remaining').text("Time Remaining: " + time_remaining)
        }
        //If there is no more time due to point deduction, end quiz
        if (time_remaining <= 0) {
            endQuiz()
        } else {
            //check if there are still questions,
            if (slides.length === 0) {
                endQuiz()
            } else {
                slide = slides.pop()
                $('.card-title').text(`Question ${i + 1} / ${total_questions}`)
                $('.card-text').text(slide.question)
                $('#a').text(slide.answer_choices[0])
                $('#b').text(slide.answer_choices[1])
                $('#c').text(slide.answer_choices[2])
                $('#d').text(slide.answer_choices[3])
            }
        }
    })
}

function endQuiz() {
    //Stop the timer
    clearInterval(quizTimer)
    //Clear click handler
    $('#answer-choices').off('click')
    //Hide all components
    mainComponents.hide()
    $('#done').show()
    $('#score').text(score.toFixed(2))
}

function home() {
    mainComponents.hide()
    $('#welcome').show()
}

function submitHighScore() {
    var highscore = {
        name: $('#player-name').val().toUpperCase(),
        score: score.toFixed(2)
    }
    highscores.push(highscore)
    localStorage.setItem('codingQuizHighScores', JSON.stringify(highscores))
    showHighscores()
}

function showHighscores() {
    mainComponents.hide()
    loadHighscores()
    $('#highscores').show()
}

function loadHighscores() {

    //Clear current highscores
    $('tbody').children().remove()

    //Load high scores from local storage
    var data = localStorage.getItem('codingQuizHighScores')
    if (data) {
        highscores = JSON.parse(data)
        for (var i in highscores) {
            $('tbody').append(
                '<tr>' +
                '<th scope="row">' + i + '</th>' +
                '<td>' + highscores[i].name + '</td>' +
                '<td>' + highscores[i].score + '</td>' +
                '</tr>'
            )
        }
    } else {
        highscores = []
    }
}

function resetHighscores() {
    localStorage.clear()
    $('tbody').children().remove()
    highscores = []
}