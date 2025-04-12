import { shuffle, makeElement } from "/helpers.js";
import { addSlides } from "/slideshow.js";

let amountCorrect = 0;
let amountAnswered = 0;
let myid = 0;

document.querySelector('button').onclick = getQuestions;

function getQuestions() {
  const numElement = document.querySelector('#number');
  const categoryElement = document.querySelector('#categories');
  const difficultyElement = document.querySelector('#ease');
  const typeElement = document.querySelector('#type');

  if (!numElement || !categoryElement || !difficultyElement || !typeElement) {
    console.error("Required DOM elements are missing!");
    return;
  }

  const num = numElement.value;
  const category = categoryElement.value;
  const difficulty = difficultyElement.value;
  const type = typeElement.value;

  fetch(`https://opentdb.com/api.php?amount=${num}&category=${category}&difficulty=${difficulty}&type=${type}`)
    .then(response => response.json())
    .then(data => createQuiz(data));
}

function createQuiz(data) {
  resetQuiz();
  data.results.forEach((question, index) => {
    buildQuestion(question, index, data);
  });

  addSlides();
}

function buildQuestion(question, index, data) {
  const questionContainer = makeElement('div', 'qcontainer');

  const questionText = makeElement('h2', undefined, question.question);
  const answersContainer = makeElement('div', 'answers');
  let answersArray = [...question.incorrect_answers, question.correct_answer];

  answersArray = shuffle(answersArray);

  answersArray.forEach(answer => {
    const newAnswer = makeElement('div', 'answer', answer);
    newAnswer.onclick = () => checkAnswer(newAnswer, index, data);
    answersContainer.append(newAnswer);
  });

  questionContainer.append(questionText, answersContainer);
  questionContainer.id = myid++;
  document.querySelector('#quiz').append(questionContainer);
}

function checkAnswer(answer, index, data) {
  amountAnswered++;
  const parent = answer.parentNode;
  parent.style.pointerEvents = 'none';

  if (data.results[index].correct_answer === answer.innerHTML) {
    answer.style.backgroundColor = 'green';
    amountCorrect++;
  } else {
    answer.style.backgroundColor = 'red';
  }

  if (amountAnswered >= data.results.length) {
    displayResults(data);
  }
}

function resetQuiz() {
  document.querySelector('#myCode').style.opacity = "1";
  document.querySelector('#quiz').innerHTML = "";
  document.querySelector('#correctAnswers').innerHTML = '<h2 id="correct"></h2>';
  document.querySelector('#correctAnswers').style.visibility = "hidden";

  amountAnswered = 0;
  amountCorrect = 0;
}

function displayResults(data) {
  document.querySelector('#myCode').style.opacity = "0.5";
  document.querySelector('#correctAnswers').style.visibility = "visible";

  const correct = document.querySelector('#correct');
  correct.innerHTML = `Score: ${(amountCorrect / amountAnswered) * 100}%`;

  const correctAnswersContainer = document.querySelector('#correctAnswers');
  data.results.forEach(question => {
    correctAnswersContainer.append(makeElement('p', undefined, question.correct_answer));
  });

  const closeButton = makeElement('button', 'close', '<i class="fa-solid fa-xmark"></i>');
  closeButton.style = "border: none; color: white; font-size: 50px; position: absolute; right: 10px; background-color: transparent; top: 10px;";
  closeButton.onclick = closeModal;
  correctAnswersContainer.append(closeButton);
}

function closeModal() {
  resetQuiz();
}
