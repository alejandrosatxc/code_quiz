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
    var slides = []
    slide = {
        number: 1,
        question: "Which of the following is a programming language? Like an actual programming language",
        answer_choices: ['JavaScript', 'HTML', 'CSS', "jquery"],
        correct_answer: "JavaScript"
    }
    $('.card-title').text('Question #' + slide.number)
    $('.card-text').text(slide.question)
    $('#a').text(slide.answer_choices[0])
    $('#b').text(slide.answer_choices[1])
    $('#c').text(slide.answer_choices[2])
    $('#d').text(slide.answer_choices[3])
    $('#answer-choices').on('click', function (e) {
        if($(e.target).text() === slide.correct_answer) {
            console.log('correct')
            endQuiz()
        } else {
            console.log('wrong')
        }
    })

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