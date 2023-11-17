let inicioButton;
let gameState = "play";
let botaoCirculos = [];
let canvas;
let corMelodia, corPercursão, corApitos, corGraves;

// SONS
let playButton;
let melodia1, melodia2, melodia3, melodia4, melodia5, baixo1, baixo2, baixo3, baixo4, baixo5, perc1, perc2, perc3, perc4, perc5, apito1, apito2, apito3, apito4, apito5;
let allSounds = [];
let playbackSpeedSlider;

const categoriaIndices = {
    "melodia": [0, 1, 2, 3, 4],
    "baixo": [5, 6, 7, 8, 9],
    "percursao": [10, 11, 12, 13, 14],
    "apitos": [15, 16, 17, 18, 19],
  };

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
  botaoCirculos[1] = new BotaoCirculos(windowWidth / 10, 0 + windowHeight / 6, 100, 5, 0, PI, corMelodia, "melodia");
  //apitos
  botaoCirculos[2] = new BotaoCirculos(windowWidth - windowWidth / 10, 0 + windowHeight / 5, 100, 5, PI, 0, corApitos, "apitos");
  //graves
  botaoCirculos[3] = new BotaoCirculos(windowWidth - windowWidth / 10, 0 + windowHeight - windowHeight / 6, 100, 5, -PI, 0, corGraves, "graves");
  //percursão
  botaoCirculos[4] = new BotaoCirculos(windowWidth / 10, 0 + windowHeight - windowHeight / 6, 100, 5, 0, -PI, corPercursão, "percursao");

  

  playButton = createButton('Play');
  playButton.position(windowWidth / 2, windowHeight / 2);
  playButton.mousePressed(play);
  playButton.hide();

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


 

function draw() {
  noStroke();
  background(35, 53, 63);

  if (gameState === "play") {
    inicioButton.display();
  } else if (gameState === "iniciar") {
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
    sair.display();
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
  constructor(x, y, diametroCentral, numCirculosSatelites, angSeletoresInicio, angSeletoresFim, cor, categoria) {
    this.x = x;
    this.y = y;
    this.angSeletoresInicio = angSeletoresInicio;
    this.angSeletoresFim = angSeletoresFim;
    this.diametroCentral = diametroCentral;
    this.numCirculosSatelites = numCirculosSatelites;
    this.circulosSatelites = [];
    this.cor = cor;
    this.categoria = categoria;

    for (let i = 0; i < numCirculosSatelites; i++) {
      let angulo = map(i, 0, numCirculosSatelites, angSeletoresInicio, angSeletoresFim);
      let raio = this.diametroCentral * 1.3;
      let sateliteX = this.x + raio * cos(angulo);
      let sateliteY = this.y + raio * sin(angulo);
      this.circulosSatelites.push(new SeletorCirculos(sateliteX, sateliteY, 50, i + 1, this.cor, allSounds[i]));

    }
  }

 toggleVolume(sound) {
    // Toggle the volume between 0 and 1
    sound.setVolume(sound.getVolume() === 0 ? 1 : 0);
  }
  
  /*createToggleButton(label, sound,index) {
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
  }*/
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
        this.circulosSatelites[i].som(this.categoria, i);
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
      this.corOriginal = cor;
      this.corNova = color(255, 165, 0);
      this.corAtual = cor;
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
      this.corAtual = (this.corAtual === this.corOriginal) ? this.corNova : this.corOriginal;
    }

  /*som() {
    this.somFunction.setVolume(1);
  }*/

  som(categoria, indice) {
    if (categoria in categoriaIndices) {
      const indices = categoriaIndices[categoria];
      const index = indices[indice];
  
      if (index !== undefined) {
        if (allSounds[index].isPlaying()) {
        } else {
          allSounds[index].setVolume(1);
        }
      }
    }
  }

}
  



