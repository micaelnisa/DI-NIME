let playButton;
let gameState = "play"; // estado do jogo para podermos ir alterando conforme o que esta a acontecer
let botaoCirculos = [];
let canvas;
let corMelodia, corPercursão, corApitos, corGraves;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);



  corMelodia = color(32, 181, 115);
  corPercursão = color(0, 169, 157);
  corApitos = color(140, 198, 63);
  corGraves = color(217, 224, 33)
  /* -------------------------------------- Codigo para gamestate play ----------------------------------------*/
  playButton = new BotaoRedondo(width / 2, height / 2, 200, color(0, 113, 188));

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
}

function draw() {
  noStroke();
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
  } else if (gameState === "jogar") {
    for (let i = 1; i < botaoCirculos.length; i++) {
      botaoCirculos[i].display();
    }
    sair.display();
  }
}

function touchStarted() {
  let melodiaTocado = false;
  let percursaoTocado = false;
  let apitosTocado = false;
  let gravesTocado = false;

  for (let j = 0; j < touches.length; j++) {
    let x = touches[j].x;
    let y = touches[j].y;

    if (gameState === "play" && playButton.contains(x, y)) {
      gameState = "iniciar";
    } else if (gameState === "iniciar" && sair.contains(x, y)) {
      gameState = "play";
    } else if (gameState === "iniciar") {
      melodiaTocado = melodiaTocado || melodia_button.verificarToque(x, y);
      percursaoTocado = percursaoTocado || percursao_button.verificarToque(x, y);
      apitosTocado = apitosTocado || apitos_button.verificarToque(x, y);
      gravesTocado = gravesTocado || graves_button.verificarToque(x, y);
    } else if (gameState === "jogar" && sair.contains(x, y)) {
      gameState = "play";
    }

    for (let i = 1; i < botaoCirculos.length; i++) {
      botaoCirculos[i].verificarToque(x, y);
    }
  }

  // Verifica se todas as bolas estão sendo tocadas antes de ir para a gameState "jogar"
  if (gameState === "iniciar" && melodiaTocado && percursaoTocado && apitosTocado && gravesTocado && touches.length === 4) {
    gameState = "jogar";
  }
}


/*function touchStarted() {


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
}*/

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
