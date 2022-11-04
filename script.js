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
    }, 1000)
    $('#main-container').children().hide()
    $('#time-remaining').show()
    $('#questions').show()
    var slides = [
        {
            number: 1,
            question: "Which of the following is a programming language? Like an actual programming language",
            answer_choices: ['JavaScript', 'HTML', 'CSS', "jquery"],
            correct_answer: "JavaScript"
        },
        {
            number: 2,
            question: "What is catfish?",
            answer_choices: ['A fish', 'Its 4 life', 'Nothing really', "Bananas"],
            correct_answer: "Its 4 life"
        },
        {
            number: 3,
            question: "Which of the following would you use for quickly creating a web app with a layout and components?",
            answer_choices: ['React', 'jquery', 'Bootstrap', "Events"],
            correct_answer: "Bootstrap"
        }
    ]

    for(var i in slides) {
        $('.card-title').text('Question #' + slides[i].number)
        $('.card-text').text(slides[i].question)
        $('#a').text('A. ' + slides[i].answer_choices[0])
        $('#b').text('B. ' + slides[i].answer_choices[1])
        $('#c').text('C. ' + slides[i].answer_choices[2])
        $('#d').text('D. ' + slides[i].answer_choices[3])
    }

    $('#answer-choices').on('click', function (e) {
        if($(e.target).text() === slide.correct_answer) {
            console.log('correct')
            endQuiz()
        } else {
            console.log('wrong')
            time_remaining -= 5
            if (time_remaining <= 0) {
                endQuiz()
            }
            $('#time-remaining').text("Time Remaining: " + time_remaining)
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