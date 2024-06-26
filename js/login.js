const input = document.querySelector('.login__input');
const button = document.querySelector('.login__button');
const form = document.querySelector('.login-form');

const validateInput = ({ target }) => {
  if (target.value.length > 3 && target.value.length <= 12) {
    button.removeAttribute('disabled');
    return;
  }

  button.setAttribute('disabled', '');
}

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.login-form');
  const inputNome = document.querySelector('.login__input');

  form.addEventListener('submit', function (event) {
      event.preventDefault();

      const nome = inputNome.value;
      localStorage.setItem('nome', nome);

      // Redireciona para a página do jogo
      window.location = 'pages/game.html';
  });
});


// Recupera os dados do Local Storage e exibe na tabela
document.addEventListener('DOMContentLoaded', function () {
  const historicoTbody = document.getElementById('historico-tbody');

  // Recupera a lista de registros do Local Storage ou cria uma nova se não existir
  const historico = JSON.parse(localStorage.getItem('historico')) || [];

  // Adiciona cada registro à tabela
  historico.forEach(function (registro) {
    const newRow = historicoTbody.insertRow();
    const cellNome = newRow.insertCell(0);
    const cellTempo = newRow.insertCell(1);

    cellNome.textContent = registro.nome;
    cellTempo.textContent = registro.tempo;
  });
});

document.getElementById("anoAtual").textContent = new Date().getFullYear();


input.addEventListener('input', validateInput);


// Slider
document.addEventListener("DOMContentLoaded", function() {
  const slides = document.querySelectorAll('.slides img');
  let currentSlide = 0;

  function showSlide(index) {
      slides.forEach((slide, i) => {
          if (i === index) {
              slide.style.display = 'block';
          } else {
              slide.style.display = 'none';
          }
      });
  }

  function nextSlide() {
      currentSlide++;
      if (currentSlide >= slides.length) {
          currentSlide = 0;
      }
      showSlide(currentSlide);
  }

  function prevSlide() {
      currentSlide--;
      if (currentSlide < 0) {
          currentSlide = slides.length - 1;
      }
      showSlide(currentSlide);
  }

  document.querySelector('.next').addEventListener('click', nextSlide);
  document.querySelector('.prev').addEventListener('click', prevSlide);

  showSlide(currentSlide);
});


