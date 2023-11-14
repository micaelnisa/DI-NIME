let playButton;
let gameState = "play"; // estado do jogo para podermos ir alterando conforme o que esta a acontecer
let botaoCirculos = [];
let canvas;
<<<<<<< Updated upstream
=======
let corMelodia, corPercursão, corApitos, corGraves;

// SONS
let playButton;
let melodia1, melodia2, melodia3, melodia4, melodia5, baixo1, baixo2, baixo3, baixo4, baixo5, perc1, perc2, perc3, perc4, perc5, apito1, apito2, apito3, apito4, apito5;
let allSounds = [];
let playbackSpeedSlider;

let selectedCategory = null;

function preload() {
  // MELODIAS
  melodia1 = loadSound("som/Melodia_1.mp3");
  melodia2 = loadSound("som/Melodia_2.mp3");
  melodia3 = loadSound("som/Melodia_3.mp3");
  melodia4 = loadSound("som/Melodia_4.mp3");
  melodia5 = loadSound("som/Melodia_5.mp3");

  melodia1.category = "melodia";
  melodia2.category = "melodia";
  melodia3.category = "melodia";
  melodia4.category = "melodia";
  melodia5.category = "melodia";

  // BAIXOS
  baixo1 = loadSound("som/Baixo_1.mp3");
  baixo2 = loadSound("som/Baixo_2.mp3");
  baixo3 = loadSound("som/Baixo_3.mp3");
  baixo4 = loadSound("som/Baixo_4.mp3");
  baixo5 = loadSound("som/Baixo_5.mp3");

  baixo1.category = "baixo";
  baixo2.category = "baixo";
  baixo3.category = "baixo";
  baixo4.category = "baixo";
  baixo5.category = "baixo";

  // PERCUSSÕES
  perc1 = loadSound("som/Perc_1.mp3");
  perc2 = loadSound("som/Perc_2.mp3");
  perc3 = loadSound("som/Perc_3.mp3");
  perc4 = loadSound("som/Perc_4.mp3");
  perc5 = loadSound("som/Perc_5.mp3");

  perc1.category = "perc";
  perc2.category = "perc";
  perc3.category = "perc";
  perc4.category = "perc";
  perc5.category = "perc";

  // APITOS
  apito1 = loadSound("som/Apito_1.mp3");
  apito2 = loadSound("som/Apito_2.mp3");
  apito3 = loadSound("som/Apito_3.mp3");
  apito4 = loadSound("som/Apito_4.mp3");
  apito5 = loadSound("som/Apito_5.mp3");

  apito1.category = "apitos";
  apito2.category = "apitos";
  apito3.category = "apitos";
  apito4.category = "apitos";
  apito5.category = "apitos";

  // Add all sounds to the array
  allSounds = [melodia1, melodia2, melodia3, melodia4, melodia5, baixo1, baixo2, baixo3, baixo4, baixo5, perc1, perc2, perc3, perc4, perc5, apito1, apito2, apito3, apito4, apito5];

  // Set volume to 0 for all sounds
  allSounds.forEach(sound => {
    sound.setVolume(0);
  });
}
>>>>>>> Stashed changes

function setup() {
 canvas = createCanvas(windowWidth, windowHeight);
 canvas.position(0, 0);

 /* -------------------------------------- Codigo para gamestate play ----------------------------------------*/   
  playButton = new BotaoRedondo(width / 2, height / 2, 200, color(0, 113, 188));

  /* -------------------------------------- Codigo para gamestate iniciar ----------------------------------------*/   
  //diametro cagado a definir a posição one love codigo á pedreiro 
  melodia_button = new BotaoRedondo((width / 2) - 100, (height / 2) - 100, 100, color (32, 181, 115));
  percursao_button = new BotaoRedondo((width / 2) - 100, (height / 2) + 100, 100, color (0, 169, 157));
  apitos_button = new BotaoRedondo((width / 2) + 100, (height / 2) - 100, 100, color (140, 198, 63));
  graves_button = new BotaoRedondo((width / 2) + 100, (height / 2) + 100, 100, color (217, 224, 33));

  sair = new BotaoRedondo( 100, 100, 50, color (255, 0, 0));
  jogar = new BotaoRedondo( 100, 200, 50, color (0, 255, 0));

<<<<<<< Updated upstream
  /* -------------------------------------- Codigo para gamestate jogar ----------------------------------------*/     
  botaoCirculos[1] = new BotaoCirculos(windowWidth / 10, 0 + windowHeight / 6, 50, 2, 0, PI);
  botaoCirculos[2] = new BotaoCirculos(windowWidth - windowWidth / 10, 0 + windowHeight / 6, 50, 2, PI, 0);
  botaoCirculos[3] = new BotaoCirculos(windowWidth - windowWidth / 10, 0 + windowHeight - windowHeight / 6, 50, 2, -PI, 0);
  botaoCirculos[4] = new BotaoCirculos(windowWidth / 10, 0 + windowHeight - windowHeight / 6, 50, 2, 0, -PI);
=======
  sair = new BotaoRedondo(100, 100, 50, color(255, 0, 0));
  jogar = new BotaoRedondo(100, 200, 50, color(0, 255, 0));

  botaoCirculos[1] = new BotaoCirculos(windowWidth / 10, 0 + windowHeight / 6, 100, 2, 0, PI, corMelodia);
  botaoCirculos[2] = new BotaoCirculos(windowWidth - windowWidth / 10, 0 + windowHeight / 6, 100, 2, PI, 0, corApitos);
  botaoCirculos[3] = new BotaoCirculos(windowWidth - windowWidth / 10, 0 + windowHeight - windowHeight / 6, 100, 2, -PI, 0, corGraves);
  botaoCirculos[4] = new BotaoCirculos(windowWidth / 10, 0 + windowHeight - windowHeight / 6, 100, 2, 0, -PI, corPercursão);

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

function toggleVolume(sound, category) {
  if (selectedCategory === category) {
    // Se a categoria já estiver selecionada, desligue todos os sons dessa categoria
    allSounds.filter(s => s !== sound && s.category === category).forEach(s => s.setVolume(0));
  } else {
    // Se a categoria não estiver selecionada, desligue todos os sons de outras categorias
    allSounds.filter(s => s.category !== category).forEach(s => s.setVolume(0));
  }

  // Alterna o volume do som específico
  sound.setVolume(sound.getVolume() === 0 ? 1 : 0);

  // Atualiza a categoria selecionada
  selectedCategory = sound.getVolume() === 0 ? null : category;
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
>>>>>>> Stashed changes
}

function playApito(apitoNumber, category) {
  // Garante que apenas o som da categoria selecionada seja reproduzido
  if (selectedCategory === category) {
    allSounds[apitoNumber - 1].play();
  }
}

function draw() {
 background(35, 53, 63);

  if (gameState === "play") {
    playButton.display();
  } else if (gameState === "iniciar") {
    // botoes do elementos do jogo
    melodia_button.display();
    percursao_button.display();
    apitos_button.display();
    graves_button.display();

    jogar.display();
    sair.display();
  }  else if (gameState === "jogar") {
     for (let i = 1; i < botaoCirculos.length; i++) {
         botaoCirculos[i].display();
       }
       sair.display();
  }
}



<<<<<<< Updated upstream
=======
function play() {
  // Play all sounds
  allSounds.forEach(sound => {
      sound.play();
  });
}


>>>>>>> Stashed changes
function touchStarted() {


 for (let j = 0; j < touches.length; j++) {
   let x = touches[j].x;
   let y = touches[j].y;

   if (gameState === "play" && playButton.contains(x, y)) {
     gameState = "iniciar";
   } else if (gameState === "iniciar" && sair.contains(x, y)) {
     gameState = "play";
    } else if (gameState === "iniciar") {
      melodia_button.verificarToque(x, y);
      percursao_button.verificarToque(x, y);
      apitos_button.verificarToque(x, y);
      graves_button.verificarToque(x, y);

      // Adiciona verificação para manter a seleção
      if (melodia_button.selecionada) {
        percursao_button.selecionar();
        apitos_button.selecionar();
        graves_button.selecionar();
      } else if (percursao_button.selecionada) {
        melodia_button.selecionar();
        apitos_button.selecionar();
        graves_button.selecionar();
      } else if (apitos_button.selecionada) {
        melodia_button.selecionar();
        percursao_button.selecionar();
        graves_button.selecionar();
      } else if (graves_button.selecionada) {
        melodia_button.selecionar();
        percursao_button.selecionar();
        apitos_button.selecionar();
      }

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

function touchEnded() {
  for (let j = 0; j < touches.length; j++) {
    let x = touches[j].x;
    let y = touches[j].y;

    // Desseleciona os botões quando o toque é removido
    if (!touches.find((touch) => melodia_button.contains(touch.x, touch.y))) {
      melodia_button.nao_selecionada();
    }

    if (!touches.find((touch) => percursao_button.contains(touch.x, touch.y))) {
      percursao_button.nao_selecionada();
    }

    if (!touches.find((touch) => apitos_button.contains(touch.x, touch.y))) {
      apitos_button.nao_selecionada();
    }

    if (!touches.find((touch) => graves_button.contains(touch.x, touch.y))) {
      graves_button.nao_selecionada();
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

  nao_selecionada() {
    this.selecionada = false;
  }

  verificarToque(x, y) {
    if (this.contains(x, y)) {
      this.selecionar();
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
