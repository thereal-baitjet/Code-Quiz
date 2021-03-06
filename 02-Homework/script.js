const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

var count = 100;
const endgame = document.querySelector('endgame');
let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}


function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
    
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  if (!correct) {
    count -= 10
    }
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })



  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {

    if (currentQuestion > questions.length - 1) {
      endGame();
      return;
    }

  }
}



function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

 
function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}


var interval = setInterval(function(){
  document.getElementById('count').innerHTML=count;  
  count--;
  if (count === 0) {
    clearInterval(interval);
    document.getElementById('count').innerHTML='Done';
    // or...
    alert("time ran out!!!");
  }
}, 1000);

function endGame() {
  clearInterval(count);
  startButton.innerText = "endgame";
  startButton.classList.remove('hide');
}


const questions = [
  {
    question: 'Inside which HTML element do we put the JavaScript?',
    answers: [
      { text: '<scripting>', correct: false },
      { text: '<javascript>', correct: false },
      { text: '<js>', correct: false },
      { text: '<script>', correct: true }
    ]
  },
  {
    question: "Which is not a JavaScript Framework?",
    answers: [
      { text: "DJango", correct: true },
      { text: "Python Script", correct: false },
      { text: "JQuery", correct: false },
      { text: "NodeJS", correct: false }
    ]
  },
  {
    question: 'Which of the following function of String object returns the capitalized string while respecting the current locale?',
    answers: [
      { text: 'toString()', correct: false },
      { text: 'toUpperCase()', correct: true },
      { text: 'substring()', correct: false },
      { text: 'toLocaleUpperCase()', correct: false }
    ]
  },
  {
    question: 'Which of the following is the correct syntax to display “This Quiz is cool” in an alert box using JavaScript?',
    answers: [
      { text: 'alert(“This Quiz is cool”);', correct: true },
      { text: 'msgbox(“This Quiz is cool”);', correct: false },
      { text: ' msg(“This Quiz is cool”);', correct: false },
      { text: 'alertbox(“This Quiz is cool”);', correct: false }
    ]
  }
]
