let playButton;
let gameState = "play"; // estado do jogo para podermos ir alterando conforme o que esta a acontecer
let botaoCirculos = [];
let canvas;

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

  /* -------------------------------------- Codigo para gamestate jogar ----------------------------------------*/     
  botaoCirculos[1] = new BotaoCirculos(windowWidth / 10, 0 + windowHeight / 6, 50, 2, 0, PI);
  botaoCirculos[2] = new BotaoCirculos(windowWidth - windowWidth / 10, 0 + windowHeight / 6, 50, 2, PI, 0);
  botaoCirculos[3] = new BotaoCirculos(windowWidth - windowWidth / 10, 0 + windowHeight - windowHeight / 6, 50, 2, -PI, 0);
  botaoCirculos[4] = new BotaoCirculos(windowWidth / 10, 0 + windowHeight - windowHeight / 6, 50, 2, 0, -PI);
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

      // Verifica se todos os botões estão selecionados
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
  // Redefine o estado de seleção quando não há toque
  melodia_button.selecionada = false;
  percursao_button.selecionada = false;
  apitos_button.selecionada = false;
  graves_button.selecionada = false;
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
