let inicioButton;
let gameState = "play";
let botaoCirculos = [];
let canvas;
let corMelodia, corPercursão, corApitos, corGraves;


let time = 0;
let frameRate = 30;

// SONS
let playButton;
let melodia1, melodia2, melodia3, melodia4, melodia5, baixo1, baixo2, baixo3, baixo4, baixo5, perc1, perc2, perc3, perc4, perc5, apito1, apito2, apito3, apito4, apito5;
let allSounds = [];
let playbackSpeedSlider;

function preload() {
  // MELODIAS
  melodia1 = loadSound("som/Melodia_1.mp3");
  melodia2 = loadSound("som/Melodia_2.mp3");
  melodia3 = loadSound("som/Melodia_3.mp3");
  melodia4 = loadSound("som/Melodia_4.mp3");
  melodia5 = loadSound("som/Melodia_5.mp3");

  // BAIXOS
  baixo1 = loadSound("som/Baixo_1.mp3");
  baixo2 = loadSound("som/Baixo_2.mp3");
  baixo3 = loadSound("som/Baixo_3.mp3");
  baixo4 = loadSound("som/Baixo_4.mp3");
  baixo5 = loadSound("som/Baixo_5.mp3");

  // PERCUSSÕES
  perc1 = loadSound("som/Perc_1.mp3");
  perc2 = loadSound("som/Perc_2.mp3");
  perc3 = loadSound("som/Perc_3.mp3");
  perc4 = loadSound("som/Perc_4.mp3");
  perc5 = loadSound("som/Perc_5.mp3");

  // APITOS
  apito1 = loadSound("som/Apito_1.mp3");
  apito2 = loadSound("som/Apito_2.mp3");
  apito3 = loadSound("som/Apito_3.mp3");
  apito4 = loadSound("som/Apito_4.mp3");
  apito5 = loadSound("som/Apito_5.mp3");

  // Add all sounds to the array
  allSounds = [melodia1, melodia2, melodia3, melodia4, melodia5, baixo1, baixo2, baixo3, baixo4, baixo5, perc1, perc2, perc3, perc4, perc5, apito1, apito2, apito3, apito4, apito5];
  melodias = [melodia1, melodia2, melodia3, melodia4, melodia5];
  baixos = [baixo1, baixo2, baixo3, baixo4, baixo5];
  percussoes = [perc1, perc2, perc3, perc4, perc5];
  apitos = [apito1, apito2, apito3, apito4, apito5];

  // Set volume to 0 for all sounds
  allSounds.forEach(sound => {
    sound.setVolume(0);
  });
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);

  corMelodia = color(32, 181, 115);
  corPercursão = color(0, 169, 157);
  corApitos = color(140, 198, 63);
  corGraves = color(217, 224, 33);

  inicioButton = new BotaoRedondo(width / 2, height / 2, 200, color(0, 113, 188));

  melodia_button = new BotaoRedondo((width / 2) - 100, (height / 2) - 100, 100, corMelodia);
  percursao_button = new BotaoRedondo((width / 2) - 100, (height / 2) + 100, 100, corPercursão);
  apitos_button = new BotaoRedondo((width / 2) + 100, (height / 2) - 100, 100, corApitos);
  graves_button = new BotaoRedondo((width / 2) + 100, (height / 2) + 100, 100, corGraves);

  sair = new BotaoRedondo(100, 100, 50, color(255, 0, 0));
  jogar = new BotaoRedondo(100, 200, 50, color(0, 255, 0));

  //melodia
  botaoCirculos[1] = new BotaoCirculos(windowWidth / 10, 0 + windowHeight / 6, 100, 6, 0, PI, corMelodia, melodias);
  //apitos
  botaoCirculos[2] = new BotaoCirculos(windowWidth - windowWidth / 10, 0 + windowHeight / 5, 100, 6, PI, 0, corApitos, apitos);
  //graves
  botaoCirculos[3] = new BotaoCirculos(windowWidth - windowWidth / 10, 0 + windowHeight - windowHeight / 6, 100, 6, -PI, 0, corGraves, baixos)  ;
  //percursão
  botaoCirculos[4] = new BotaoCirculos(windowWidth / 10, 0 + windowHeight - windowHeight / 6, 100, 6, 0, -PI, corPercursão, percussoes);

  playButton = createButton('Play');
  playButton.position(windowWidth / 2, windowHeight / 2);
  playButton.mousePressed(play);

  playbackSpeedSlider = createSlider(0.5, 1.5, 1, 0.1);
  playbackSpeedSlider.position(windowWidth / 2, (windowHeight / 2 - 100));
  playbackSpeedSlider.style('width', '80px');
  playbackSpeedSlider.hide();
}

function play() {
  // Play all sounds simultaneously with volume 0
  allSounds.forEach(sound => {
    sound.play();
    sound.setVolume(0);
  });
}

function toggleVolume(sound) {
  // Toggle the volume between 0 and 1
  sound.setVolume(sound.getVolume() === 0 ? 1 : 0);
}

function createToggleButton(label, sound, index) {
  let button = createButton(label);

  if (index <= 5) {
    button.position(windowWidth / 5, 150 + index * 30);
  } else if (index > 5 && index <= 10) {
    button.position(windowWidth - windowWidth / 5, 10 + index * 30);
  } else if (index > 10 && index <= 15) {
    button.position(windowWidth - windowWidth / 5, windowHeight - (-150 + index * 30));
  } else if (index > 15 && index <= 20) {
    button.position(windowWidth / 5, windowHeight - (-300 + index * 30));
  }
  button.mousePressed(() => toggleVolume(sound));
  button.mouseClicked(() => playApito(index));
}

function draw() {
  noStroke();
  background(35, 53, 63);

  //TIMER
  if (frameCount % frameRate == 0) {
    time++;
  }

  if (gameState === "play") {
    inicioButton.display();
  } else if (gameState === "iniciar") {
    melodia_button.display();
    percursao_button.display();
    apitos_button.display();
    graves_button.display();

    //jogar.display();
    //sair.display();
  } else if (gameState === "jogar") {
    for (let i = 1; i < botaoCirculos.length; i++) {
      botaoCirculos[i].display();
    }

    /*
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

    createToggleButton('Apito 1', apito1, 16);
    createToggleButton('Apito 2', apito2, 17);
    createToggleButton('Apito 3', apito3, 18);
    createToggleButton('Apito 4', apito4, 19);
    createToggleButton('Apito 5', apito5, 20);
*/
    //sair.display();
  }

  if (gameState === "play" || gameState === "iniciar") {
    playButton.hide();
    playbackSpeedSlider.hide();
  } else {
    playButton.show();
    playbackSpeedSlider.show();
  }

  const playbackSpeed = playbackSpeedSlider.value();
  allSounds.forEach(sound => {
    sound.rate(playbackSpeed);
  });
}



function touchStarted() {

  for (let j = 0; j < touches.length; j++) {
    let x = touches[j].x;
    let y = touches[j].y;

    if (gameState === "play" && inicioButton.contains(x, y)) {
      gameState = "iniciar";
    } else if (gameState === "iniciar" && sair.contains(x, y)) {
      gameState = "play";
    } else if (gameState === "iniciar") {
      melodia_button.verificarToque(x, y);
      percursao_button.verificarToque(x, y);
      apitos_button.verificarToque(x, y);
      graves_button.verificarToque(x, y);

      // Verifica se todos os botões estão selecionados no iniciar
      if (
        melodia_button.selecionada &&
        percursao_button.selecionada &&
        apitos_button.selecionada &&
        graves_button.selecionada
      ) {
        gameState = "jogar";
      }
    } else if (gameState === "jogar" && sair.contains(x, y)) {
      gameState = "play";
    }

    for (let i = 1; i < botaoCirculos.length; i++) {
      botaoCirculos[i].verificarToque(x, y);
    }
  }
}


class BotaoRedondo {
  constructor(x, y, diametro, cor) {
    this.x = x;
    this.y = y;
    this.diametro = diametro;
    this.cor = cor;
    this.selecionada = false;
  }

  display() {
    fill(this.cor);
    noStroke();
    ellipse(this.x, this.y, this.diametro, this.diametro);

    // Adiciona um indicador visual quando o botão está selecionado
    if (this.selecionada) {
      fill(255, 0, 0, 100);
      ellipse(this.x, this.y, this.diametro, this.diametro);
    }
  }

  contains(px, py) {
    let d = dist(px, py, this.x, this.y);
    return d < this.diametro / 2;
  }

  selecionar() {
    this.selecionada = !this.selecionada;
  }

  verificarToque(x, y) {
    if (this.contains(x, y)) {
      this.selecionar();
    }
  }
}



class BotaoCirculos {
  constructor(x, y, diametroCentral, numCirculosSatelites, angSeletoresInicio, angSeletoresFim, cor, array) {
    this.x = x;
    this.y = y;
    this.angSeletoresInicio = angSeletoresInicio;
    this.angSeletoresFim = angSeletoresFim;
    this.diametroCentral = diametroCentral;
    this.numCirculosSatelites = numCirculosSatelites;
    this.circulosSatelites = [];
    this.cor = cor;
    this.array = array;

    for (let i = 0; i < numCirculosSatelites; i++) {
      let angulo = map(i, 0, numCirculosSatelites, angSeletoresInicio, angSeletoresFim);
      let raio = this.diametroCentral * 1.3;
      let sateliteX = this.x + raio * cos(angulo);
      let sateliteY = this.y + raio * sin(angulo);
      this.circulosSatelites.push(new SeletorCirculos(sateliteX, sateliteY, 50, i + 1, this.cor, array));
    }
  }

  display() {
    fill(this.cor);
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
  constructor(x, y, diametro, numero, cor, array) {
    this.x = x;
    this.y = y;
    this.diametro = diametro;
    this.numero = numero;
    this.cor = cor;
    this.corOriginal = cor; // Adiciona uma propriedade para armazenar a cor original
    this.corNova = color(255, 165, 0); // Define a nova cor
    this.corAtual = cor; // Inicializa a cor atual com a cor original
    this.array = array;
    this.isSelected = false;
    this.id = 0;
  }

  display() {
    noStroke();
    fill(this.corAtual);
    ellipse(this.x, this.y, this.diametro, this.diametro);
    fill(10, 43, 53);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(24);
    text(this.numero, this.x, this.y);
  }

  contains(px, py) {
    let d = dist(px, py, this.x, this.y);
    return d < this.diametro / 2;
  }

  mudarCor() {  
    // Alterna entre a cor original e a nova cor apenas para o botão atual
   // this.corAtual = (this.corAtual === this.corOriginal) ? this.corNova : this.corOriginal;
   // Stop all sounds
   for (let i = 0; i < this.array.length; i++) {
    this.array[i].stop();
  }

  // Play the selected sound
  this.array[this.numero - 1].play();

  // Set volume for the selected sound (if needed)
  this.array[this.numero - 1].setVolume(1);

    //som
    toggleVolume(this.array[this.numero - 1]);
    for (let i = 0; i < this.array.length; i++) {
      if (i !== this.numero - 1) {
        this.array[i].setVolume(0);
      }
    }

    this.id = this.numero-1;
  }

  getId() {
    return this.id;
  }
}
