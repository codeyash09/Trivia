import { makeElement } from "/helpers.js";

let num = 0;


function addSlides(){
  let myQuestions = document.querySelectorAll(".qcontainer");
  
  myQuestions.forEach(function(question) {
    let button = makeElement('button', 'down', '<i class="fa-solid fa-angle-down"></i>');
    let buttonUp = makeElement('button', 'up', '<i class="fa-solid fa-angle-down fa-rotate-180"></i>');
    button.onclick = down;
    buttonUp.onclick = up;
    question.append(button);
    question.append(buttonUp);
  })
}

document.querySelector('#up').onclick = allUp;

function down(){
  let myQuestions = document.querySelectorAll(".qcontainer");

  if(num < myQuestions.length -1){
    num++;
  }
  
  window.location.href = "/#" + num;
}

function up(){
  if(!num <= 0){
    num--;
  }
  
  window.location.href = "/#" + num;
}

function allUp(){
  num = 0;
  
  window.location.href = "/#-1";
}

export { addSlides };