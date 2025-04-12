function makeElement(type = 'div', newClass, inner = '') {
  let newElement = document.createElement(type);

  if (newClass) {
    newElement.classList.add(newClass);
  }

  newElement.innerHTML = inner;

  return newElement;

}

function shuffle(array) {

  let currentIndex = array.length;
  let temporaryValue, randomIndex;
  

  while (currentIndex > 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;

    
  }

  return array;

}

export { shuffle, makeElement };