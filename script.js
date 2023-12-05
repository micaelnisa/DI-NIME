let gamestate = "inicio";
let canvas;
let corMelodia, corPercussao, corApitos, corGraves;

//gamestate inicio
let inicioButton, iniciosvg;
//gamestate elementos
let botaoMelodia, botaoPercussao, botaoApitos, botaoGraves, melodiasvg, percussaosvg, apitossvg, gravessvg;
let indexText = 0;
let instrucaoElementos = ['Pressione o elemento que pretende controlar.', 'Cada jogador deverá escolher entre 1 e 2 elementos.'];

//gamestate jogar
let playButton;
let allSounds = [];
let melodia1, melodia2, melodia3, melodia4, melodia5, baixo1, baixo2, baixo3, baixo4, baixo5, perc1, perc2, perc3, perc4, perc5, apito1, apito2, apito3, apito4, apito5;
//painel
let fundogeral, fundogeralsvg;
let speedSlider, VolSlider;
//o volume ainda não funciona só posicionei o slider


function preload(){
  //gamestate inicio
  iniciosvg = loadImage('svg/inicio.svg');

  //gamestate elementos
  melodiasvg = loadImage('svg/botaoMelodia.svg');
  percussaosvg = loadImage('svg/botaoPercussao.svg');
  apitossvg = loadImage('svg/botaoApitos.svg');
  gravessvg = loadImage('svg/botaoGraves.svg');

  //gamestate jogar
  fundogeralsvg = loadImage('svg/fundopainelgeral.svg');

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
  
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);

  corMelodia = color(32, 181, 115);
  corPercussao = color(0, 169, 157);
  corApitos = color(140, 198, 63);
  corGraves = color(217, 224, 33);

  //gamestate inicio
  inicioButton = new Botao (width/2, height/2, iniciosvg, width/5);

  //gamestate elementos (to a usar width para definir diametro e posicao para ser kinda responsivo)
  botaoMelodia = new Botao (width/2 - (width/8), height/2 - (width/8), melodiasvg, width/7);
  botaoPercussao = new Botao (width/2 + (width/8), height/2 - (width/8), percussaosvg, width/7);
  botaoApitos = new Botao (width/2 - (width/8), height/2 + (width/8), apitossvg, width/7);
  botaoGraves = new Botao (width/2 + (width/8), height/2 + (width/8), gravessvg, width/7);
  setInterval(trocartext, 3000);

  //gamestate jogar
  playButton = createButton('Play');
  playButton.position(windowWidth/2, windowHeight/2 - 300);
  playButton.mousePressed(play);

  fundogeral = new painel (width/2, height/2, fundogeralsvg, width/4, width/6);
  //SpeedSlider
  speedSlider = createSlider(0.5, 1.5, 1, 0.1);
  speedSlider.position(width/2 - (fundogeral.w/2), height/2 -(fundogeral.h/9));
  speedSlider.style('transform', 'rotate(-90deg)');
  speedSlider.hide();

  //VolSlider
  VolSlider = createSlider(0.5, 1.5, 1, 0.1);
  VolSlider.position(width/2 - (fundogeral.w/2 + 40), height/2 -(fundogeral.h/9));
  VolSlider.style('transform', 'rotate(-90deg)');
  VolSlider.hide();
}

function trocartext(){
  indexText++; 
  
  if(indexText >= instrucaoElementos.length){
    indexText = 0; 
  }
}


function draw() {
  noStroke();
  background(35, 53, 63);

  if (gamestate === "inicio") {
    inicioButton.exibir();
    playButton.hide();
    speedSlider.hide();
    VolSlider.hide();
  } else if (gamestate === "elementos") {
    botaoMelodia.exibir();
    botaoPercussao.exibir();
    botaoApitos.exibir();
    botaoGraves.exibir();

    playButton.hide();
    speedSlider.hide();
    VolSlider.hide();

    //instruções
    textAlign(CENTER, CENTER);
    textSize(width / 40);
    fill(255);

    text(instrucaoElementos[indexText], width / 2, height - (height / 9));

    push();
    translate(width / 2, height / 9);
    rotate(PI);
    text(instrucaoElementos[indexText], 0, 0);
    pop();
  } else if (gamestate === "jogar") {
    playButton.show();
    speedSlider.show();
    VolSlider.show();
    fundogeral.exibir();
  }

  const playbackSpeed = speedSlider.value();
  allSounds.forEach(sound => {
    sound.rate(playbackSpeed);
  });

}

function play() {
  allSounds.forEach(sound => {
    sound.play();
    sound.setVolume(0);
  });
}

function touchStarted() {
  for (let j = 0; j < touches.length; j++) {
    let x = touches[j].x;
    let y = touches[j].y;

  if (gamestate === "inicio" && inicioButton.contains(x, y)) {
    gamestate = "elementos";
  } //experimentar codigo numa cena touch
   else if (gamestate === "elementos" /*&& botaoMelodia.contains(x, y) && botaoGraves.contains(x, y) && botaoApitos.contains(x, y) && botaoPercussao.contains(x, y)*/) {
    botaoMelodia.verificarToque(x, y);
    botaoGraves.verificarToque(x, y);
    botaoApitos.verificarToque(x, y);
    botaoPercussao.verificarToque(x, y);
    if (botaoMelodia.selecionada && botaoApitos.selecionada && botaoGraves.selecionada && botaoPercussao.selecionada) {
      gamestate = "jogar";
    }
  }
}
}


class Botao {
  constructor(x, y, svg, diametro) {
    this.x = x;
    this.y = y;
    this.svg = svg;
    this.diametro = diametro;
    this.selecionada = false;
  }

  exibir() {
    image(this.svg, this.x - this.diametro / 2, this.y - this.diametro / 2, this.diametro, this.diametro);

        // Adiciona um indicador visual quando o botão está selecionado
        if (this.selecionada) {
          fill(0, 0, 0, 100);
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

class painel {
  constructor(x, y, svg, w, h) {
    this.x = x;
    this.y = y;
    this.svg = svg;
    this.w = w;
    this.h = h;
  }

  exibir() {
    image(this.svg, this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
  }

}






