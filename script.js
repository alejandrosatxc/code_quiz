var quizTimer = null
$('#main-container').children().hide()
$('#welcome').show()
$('.home-btn').on('click', home)
$('.start-btn').on('click', startQuiz)
$('.highscores-btn').on('click', showHighscores)

function startQuiz() {
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
    }, 100)
    $('#main-container').children().hide()
    $('#time-remaining').show()
    $('#questions').show()
}

function endQuiz() {
    //Stop the timer
    clearInterval(quizTimer)
    $('#main-container').children().hide()
    $('#done').show()
}

function home() {
    $('#main-container').children().hide()
    $('#welcome').show()
}

function showHighscores() {
    $('#main-container').children().hide()
    $('#highscores').show()
}