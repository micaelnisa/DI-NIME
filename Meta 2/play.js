let inicioButton;
let gameState = "play"; // estado do jogo para podermos ir alterando conforme o que esta a acontecer
let botaoCirculos = [];
let canvas;
let corMelodia, corPercursão, corApitos, corGraves;


//SONS
let playButton; 
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
     allSounds = [melodia1, melodia2, melodia3, melodia4, melodia5, baixo1, baixo2, baixo3, baixo4, baixo5, perc1, perc2, perc3, perc4, perc5, apito1, apito2, apito3, apito4, apito5];

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
  corGraves = color(217, 224, 33)
  /* -------------------------------------- Codigo para gamestate play ----------------------------------------*/
  inicioButton = new BotaoRedondo(width / 2, height / 2, 200, color(0, 113, 188));

  /* -------------------------------------- Codigo para gamestate iniciar ----------------------------------------*/
  //diametro cagado a definir a posição one love codigo á pedreiro 
  melodia_button = new BotaoRedondo((width / 2) - 100, (height / 2) - 100, 100, corMelodia);
  percursao_button = new BotaoRedondo((width / 2) - 100, (height / 2) + 100, 100, corPercursão);
  apitos_button = new BotaoRedondo((width / 2) + 100, (height / 2) - 100, 100, corApitos);
  graves_button = new BotaoRedondo((width / 2) + 100, (height / 2) + 100, 100, corGraves);

  sair = new BotaoRedondo(100, 100, 50, color(255, 0, 0));
  jogar = new BotaoRedondo(100, 200, 50, color(0, 255, 0));

  /* -------------------------------------- Codigo para gamestate jogar ----------------------------------------*/
  botaoCirculos[1] = new BotaoCirculos(windowWidth / 10, 0 + windowHeight / 6, 100, 2, 0, PI,corMelodia);
  botaoCirculos[2] = new BotaoCirculos(windowWidth - windowWidth / 10, 0 + windowHeight / 6, 100, 2, PI, 0, corApitos);
  botaoCirculos[3] = new BotaoCirculos(windowWidth - windowWidth / 10, 0 + windowHeight - windowHeight / 6, 100, 2, -PI, 0, corGraves);
  botaoCirculos[4] = new BotaoCirculos(windowWidth / 10, 0 + windowHeight - windowHeight / 6, 100, 2, 0, -PI, corPercursão);

    playButton = createButton('Play');
    playButton.position(10, 10);
    playButton.mousePressed(play);
  
}

function createToggleButton(label, sound, index) {
  let button = createButton(label);
  let verticalPosition = 50 + index * 40;
  button.position(10, verticalPosition);
  button.mousePressed(() => toggleVolume(sound));
}
  
function toggleVolume(sound) {
  // Alterna o volume entre 0 e 1
  sound.setVolume(sound.getVolume() === 0 ? 1 : 0);
}

 
function draw() {
  noStroke();
  background(35, 53, 63);

  if (gameState === "play") {
    inicioButton.display();
  } else if (gameState === "iniciar") {
    // botoes do elementos do jogo
    melodia_button.display();
    percursao_button.display();
    apitos_button.display();
    graves_button.display();

    jogar.display();
    sair.display();
  } else if (gameState === "jogar") {
    for (let i = 1; i < botaoCirculos.length; i++) {
      botaoCirculos[i].display();
    }

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
  
    createToggleButton('Apito 1', apito1, 16);
    createToggleButton('Apito 2', apito2, 17);
    createToggleButton('Apito 3', apito3, 18);
    createToggleButton('Apito 4', apito4, 19);
    createToggleButton('Apito 5', apito5, 20);

    sair.display();
  }
  
  if (gameState === "play" || gameState === "iniciar") {
    playButton.hide();
  } else {
    playButton.show();
  }
}

function play() {
  // Play all sounds
  allSounds.forEach(sound => {
      sound.play();
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
  constructor(x, y, diametroCentral, numCirculosSatelites, angSeletoresInicio, angSeletoresFim, cor) {
    this.x = x;
    this.y = y;
    this.angSeletoresInicio = angSeletoresInicio;
    this.angSeletoresFim = angSeletoresFim;
    this.diametroCentral = diametroCentral;
    this.numCirculosSatelites = numCirculosSatelites;
    this.circulosSatelites = [];
    this.cor = cor;

    for (let i = 0; i < numCirculosSatelites; i++) {
      let angulo = map(i, 0, numCirculosSatelites, angSeletoresInicio, angSeletoresFim);
      let raio = this.diametroCentral * 1.3;
      let sateliteX = this.x + raio * cos(angulo);
      let sateliteY = this.y + raio * sin(angulo);
      this.circulosSatelites.push(new SeletorCirculos(sateliteX, sateliteY, 50, i + 1, this.cor));
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
  constructor(x, y, diametro, numero, cor) {
    this.x = x;
    this.y = y;
    this.diametro = diametro;
    this.numero = numero;
    this.cor = cor;
  }

  display() {
    fill(this.cor);
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
    this.cor = color(255, 165, 0);
  }
}
