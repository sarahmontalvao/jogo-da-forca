var container = document.getElementById('wordsContainer');
var wrong = document.getElementById('wrong');
var infos = document.getElementById('infos');
var rightsLetters = [];
var wrongLetters = [];

const words = [
  'javascript', 'php', 'python', 'castelo', 'pedra', 'diamante',
  'programacao', 'computador', 'interface', 'web', 'tecnologia',
  'frontend', 'backend', 'html', 'css', 'react', 'angular', 'vue', 'nodejs', 
  'algoritmo', 'variavel', 'funcao', 'loop', 'condicional', 'array', 'objeto', 
  'componente', 'framework'
];


const indiceAleatorio = Math.floor(Math.random() * words.length);
const palavraAleatoria = words[indiceAleatorio];
var letra = palavraAleatoria.split('');

function checkWin() {
  for (let i = 0; i < letra.length; i++) {
    if (!rightsLetters.includes(letra[i])) {
      return false;
    }
  }
  return true;
}

document.addEventListener('keydown', function(event) {
  var press = event.key.toLowerCase(); 

  if (/^[a-zA-Zç]$/.test(press)) {
    if (!rightsLetters.includes(press) && !wrongLetters.includes(press)) {
      wrongOrRight(press);
      updateLettersDisplay();
      if (checkWin()) {
        infos.classList.add('infos');
        infos.innerHTML = 'Parabéns, você ganhou!';
        var button = document.createElement('a');
        button.textContent = 'Reiniciar';
        button.classList.add('button');
        button.addEventListener('click', function() {
          reiniciarJogo();
        });
        infos.appendChild(button);
        
      }
    } else {
      infos.classList.add('infos');
      infos.innerHTML = 'Digite uma letra diferente';
      setTimeout(function() {
        infos.classList.remove('infos');
        infos.innerHTML = '';
      }, 700); 
    }
  } else {
    infos.classList.add('infos');
    infos.innerHTML = 'Letra inválida';
    setTimeout(function() {
      infos.classList.remove('infos');
      infos.innerHTML = '';
    }, 700); 
  }
});

function wrongOrRight(press) {
  if (!rightsLetters.includes(press) && !letra.includes(press)) { 
    wrongLetters.push(press);
  } else {
    if (!rightsLetters.includes(press)) {
      rightsLetters.push(press);
    }
  }
}

function updateLettersDisplay() {
  container.innerHTML = '';

  letra.forEach(letter => {
    var div = document.createElement('div');
    div.classList.add('letters');

    if (rightsLetters.includes(letter)) {
      div.textContent = letter;
    }
    
    container.appendChild(div);
  });

  wrong.textContent = wrongLetters.join(' '); 

  const parts = document.querySelectorAll('.boneco');

  parts.forEach(part => {
    part.style.display = 'none';
  });

  for (let i = 0; i < wrongLetters.length; i++) {
    parts[i].style.display = 'block';
  }

  if(parts.length === wrongLetters.length) {
    infos.classList.add('infos');
    infos.innerHTML = 'Você perdeu';
    var button = document.createElement('a');
    button.textContent = 'Reiniciar';
    button.classList.add('button');
    button.addEventListener('click', function() {
      reiniciarJogo();
    });
    infos.appendChild(button);
  }
}

function reiniciarJogo() {
  rightsLetters = [];
  wrongLetters = [];

  const indiceAleatorio = Math.floor(Math.random() * words.length);
  const palavraAleatoria = words[indiceAleatorio];
  letra = palavraAleatoria.split('');

  updateLettersDisplay();

  infos.classList.remove('infos');
  infos.innerHTML = '';
}

updateLettersDisplay();
