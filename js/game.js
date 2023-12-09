const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

// criar cards
const characters = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
];

// passar a tag e a classe mais facilmenete 
const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');
  const tempoFinal = timer.innerHTML;

  if (disabledCards.length === 20) {
    clearInterval(this.loop);
    alert(`Parabéns, seu tempo foi: ${timer.innerHTML}`);
    localStorage.setItem('tempo', tempoFinal);
    finalizarJogo();
  }
}

function finalizarJogo() {
  const nome = localStorage.getItem('nome');
  const tempo = localStorage.getItem('tempo');

  const historico = JSON.parse(localStorage.getItem('historico')) || [];

  historico.push({ nome, tempo });

  localStorage.setItem('historico', JSON.stringify(historico));
  
  window.location = '../index.html';
}


//checar cards
const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter == secondCharacter-1 && firstCharacter%2 !== 0 && secondCharacter%2 == 0 || 
    firstCharacter-1 == secondCharacter && firstCharacter%2 == 0 && secondCharacter&2 !== 0) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 1000);
  }

}

//revelar carta
const revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }
}

 // criando os elementos
const createCard = (character) => {

   
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../imagens/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}

//aleatorizando as cartas
const loadGame = () => {
  const duplicateCharacters = [...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

const startTimer = () => {

  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);

}

window.onload = () => {
  startTimer();
  loadGame();
}