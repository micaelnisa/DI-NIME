let botaoCirculos = [];
let canvas;

//SONS
var melodia1, melodia2, melodia3, melodia4, melodia5, baixo1, baixo2, baixo3, baixo4, baixo5, perc1, perc2, perc3, perc4, perc5, apito1, apito2, apito3, apito4, apito5;
let allSounds = [];

function preload() {
    //SOM

    //MELODIAS
    melodia1 = loadSound("som/Melodia_1.mp3");
    melodia2 = loadSound("som/Melodia_2.mp3");
    melodia3 = loadSound("som/Melodia_3.mp3");
    melodia4 = loadSound("som/Melodia_4.mp3");
    melodia5 = loadSound("som/Melodia_5.mp3");

    //BAIXOS
    baixo1 = loadSound("som/Baixo_1.mp3");
    baixo2 = loadSound("som/Baixo_2.mp3");
    baixo3 = loadSound("som/Baixo_3.mp3");
    baixo4 = loadSound("som/Baixo_4.mp3");
    baixo5 = loadSound("som/Baixo_5.mp3");

    //PERCUSSÕES
    perc1 = loadSound("som/Perc_1.mp3");
    perc2 = loadSound("som/Perc_2.mp3");
    perc3 = loadSound("som/Perc_3.mp3");
    perc4 = loadSound("som/Perc_4.mp3");
    perc5 = loadSound("som/Perc_5.mp3");

    //APITOS
    apito1 = loadSound("som/Apito_1.mp3");
    apito2 = loadSound("som/Apito_2.mp3");
    apito3 = loadSound("som/Apito_3.mp3");
    apito4 = loadSound("som/Apito_4.mp3");
    apito5 = loadSound("som/Apito_5.mp3");


     // Add all sounds to the array
     allSounds = [melodia1, melodia2, melodia3, melodia4, melodia5, baixo1, baixo2, baixo3, baixo4, baixo5, perc1, perc2, perc3, perc4, perc5];

     // Set volume to 0 for all sounds
     allSounds.forEach(sound => {
         sound.setVolume(0);
     });
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);

  botaoCirculos[1] = new BotaoCirculos(windowWidth / 10, 0 + windowHeight / 6, 50, 2, 0, PI);
  botaoCirculos[2] = new BotaoCirculos(windowWidth - windowWidth / 10, 0 + windowHeight / 6, 50, 2, PI, 0);
  botaoCirculos[3] = new BotaoCirculos(windowWidth - windowWidth / 10, 0 + windowHeight - windowHeight / 6, 50, 2, -PI, 0);
  botaoCirculos[4] = new BotaoCirculos(windowWidth / 10, 0 + windowHeight - windowHeight / 6, 50, 2, 0, -PI);

  let playButton = createButton('Play');
    playButton.position(10, 10);
    playButton.mousePressed(playInitial);
    
// Adiciona botões para Melodia, Baixo, Percussão e Apito
createToggleButton('Melodia 1', melodia1, 1);
createToggleButton('Melodia 2', melodia2, 2);
createToggleButton('Melodia 3', melodia3, 3);
createToggleButton('Melodia 4', melodia4, 4);
createToggleButton('Melodia 5', melodia5, 5);

createToggleButton('Baixo 1', baixo1, 6);
createToggleButton('Baixo 2', baixo2, 7);
createToggleButton('Baixo 3', baixo3, 8);
createToggleButton('Baixo 4', baixo4, 9);
createToggleButton('Baixo 5', baixo5, 10);

createToggleButton('Percussão 1', perc1, 11);
createToggleButton('Percussão 2', perc2, 12);
createToggleButton('Percussão 3', perc3, 13);
createToggleButton('Percussão 4', perc4, 14);
createToggleButton('Percussão 5', perc5, 15);

createPlayButton('Apito 1', apito1, playApito.bind(null, apito1));
createPlayButton('Apito 2', apito2, playApito.bind(null, apito2));
createPlayButton('Apito 3', apito3, playApito.bind(null, apito3));
createPlayButton('Apito 4', apito4, playApito.bind(null, apito4));
createPlayButton('Apito 5', apito5, playApito.bind(null, apito5));
}


function createToggleButton(label, sound, index) {
  let button = createButton(label);
  let verticalPosition = 50 + index * 40;
  button.position(10, verticalPosition);
  button.mousePressed(() => toggleVolume(sound));
}

function createPlayButton(label, sound) {
  let button = createButton(label);
  let verticalPosition = 50 + botaoCirculos.length * 40;
  button.position(10, verticalPosition);
  button.mousePressed(() => playSound(sound)); // Alteração aqui
}

function toggleVolume(sound) {
  // Alterna o volume entre 0 e 1
  sound.setVolume(sound.getVolume() === 0 ? 1 : 0);
}

function playSound(sound) {
  if (sound.isPlaying()) {
    sound.stop();
  } else {}
  sound.play();
}

function playInitial() {
  // Play todos os sons, exceto apitos
  allSounds.forEach(sound => {
    if (!isApito(sound)) {
      sound.play();
    }
  });
}

function isApito(sound) {
  // Verifica se o som é um apito
  return [apito1, apito2, apito3, apito4, apito5].includes(sound);
}

function draw() {
  background(50);
  for (let i = 1; i < botaoCirculos.length; i++) {
    botaoCirculos[i].display();
  }
}


function touchStarted() {
  for (let j = 0; j < touches.length; j++) {
    let x = touches[j].x;
    let y = touches[j].y;

    for (let i = 1; i < botaoCirculos.length; i++) {
      botaoCirculos[i].verificarToque(x, y);
    }
  }
}

class BotaoCirculos {
  constructor(x, y, diametroCentral, numCirculosSatelites, angSeletoresInicio, angSeletoresFim) {
    this.x = x;
    this.y = y;
    this.angSeletoresInicio = angSeletoresInicio;
    this.angSeletoresFim = angSeletoresFim;
    this.diametroCentral = diametroCentral;
    this.numCirculosSatelites = numCirculosSatelites;
    this.circulosSatelites = [];

    for (let i = 0; i < numCirculosSatelites; i++) {
      let angulo = map(i, 0, numCirculosSatelites, angSeletoresInicio, angSeletoresFim);
      let raio = this.diametroCentral * 1.3;
      let sateliteX = this.x + raio * cos(angulo);
      let sateliteY = this.y + raio * sin(angulo);
      this.circulosSatelites.push(new SeletorCirculos(sateliteX, sateliteY, 25, i + 1));
    }
  }

  display() {
    fill(0, 128, 255);
    ellipse(this.x, this.y, this.diametroCentral, this.diametroCentral);

    for (let i = 0; i < this.numCirculosSatelites; i++) {
      this.circulosSatelites[i].display();
    }
  }

  verificarToque(px, py) {
    for (let i = 0; i < this.numCirculosSatelites; i++) {
      if (this.circulosSatelites[i].contains(px, py)) {
        this.circulosSatelites[i].mudarCor();
      }
    }
  }
}

class SeletorCirculos {
  constructor(x, y, diametro, numero) {
    this.x = x;
    this.y = y;
    this.diametro = diametro;
    this.numero = numero;
    this.cor = color(255);
  }

  display() {
    fill(this.cor);
    ellipse(this.x, this.y, this.diametro, this.diametro);

    fill(0);
    textAlign(CENTER, CENTER);
    textSize(12);
    text(this.numero, this.x, this.y);
  }

  contains(px, py) {
    let d = dist(px, py, this.x, this.y);
    return d < this.diametro / 2;
  }

  mudarCor() {
    this.cor = color(255, 250, 0);
  }
}

function mousePressed() {
}
