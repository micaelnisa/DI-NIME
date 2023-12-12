let gamestate = "inicio";
let canvas;
let corMelodia, corPercussao, corApitos, corGraves;
let isPlaying = false;

//gamestate inicio
let inicioButton, iniciosvg, tecno, tecno2;
//gamestate elementos
let botaoMelodia, botaoPercussao, botaoApitos, botaoGraves, melodiasvg, percussaosvg, apitossvg, gravessvg;
let indexText = 0;
let instrucaoElementos = ['Garanta que todos estão prontos para começar.', 'Todos os instrumentos devem ser selecionados'];
//gamestate instrucoes
let instrucoes, jogar, jogar2;
//gamestate jogar
//sons
let time = 0;
let frameRate = 30;
let playButton;
let allSounds = [];
let melodia1, melodia2, melodia3, melodia4, melodia5, baixo1, baixo2, baixo3, baixo4, baixo5, perc1, perc2, perc3, perc4, perc5, apito1, apito2, apito3, apito4, apito5;
//painel
let fundogeralsvg;
let speedSlider;
let botaoinstrucoes, botaoinstrucoessvg, fechar, fecharsvg;
//botoes
let botaoCirculos = [];


function preload(){
  //gamestate inicio
  iniciosvg = loadImage('svg/inicio.svg');
  tecno = loadImage('svg/techno.svg');
  tecno2 = loadImage('svg/techno2.svg');

  //gamestate elementos
  melodiasvg = loadImage('svg/botaoMelodia.svg');
  percussaosvg = loadImage('svg/botaoPercussao.svg');
  apitossvg = loadImage('svg/botaoApitos.svg');
  gravessvg = loadImage('svg/botaoGraves.svg');

  //gamstate instrucoes
  instrucoes = loadImage('svg/instrucoes.svg');
  //gamestate jogar
  fundogeralsvg = loadImage('svg/fundopainelgeral.svg');
  botaoinstrucoessvg = loadImage('svg/botaoinstrucoes.svg');
  fecharsvg = loadImage('svg/fechar.svg')

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
  
  // Add sons ao array
  allSounds = [melodia1, melodia2, melodia3, melodia4, melodia5, baixo1, baixo2, baixo3, baixo4, baixo5, perc1, perc2, perc3, perc4, perc5, apito1, apito2, apito3, apito4, apito5];
  melodias = [melodia1, melodia2, melodia3, melodia4, melodia5];
  baixos = [baixo1, baixo2, baixo3, baixo4, baixo5];
  percussoes = [perc1, perc2, perc3, perc4, perc5];
  apitos = [apito1, apito2, apito3, apito4, apito5];

    // Volume inicial igual a 0 (sons todos a dar em mute)
    allSounds.forEach(sound => {
      sound.setVolume(0);
    });
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
  botaoMelodia = new Botao (width/2 - (width/10), height/2 - (height/10), melodiasvg, width/10);
  botaoPercussao = new Botao (width/2 + (width/10), height/2 - (height/10), percussaosvg, width/10);
  botaoApitos = new Botao (width/2 - (width/10), height/2 + (height/10), apitossvg, width/10);
  botaoGraves = new Botao (width/2 + (width/10), height/2 + (height/10), gravessvg, width/10);
  setInterval(trocartext, 3000);

  //gamestate instrucoes
  jogar = createImg('svg/jogar.svg', 'Play');
  jogar.position(width/2 - (width/8)/2 , height/2 + height/5 + (height/6)/2);
  jogar.size(width/8, height/8); 


  push();
  jogar2 = createImg('svg/jogar2.svg', 'Play');
  jogar2.position(width/2 - (width/8)/2 , height/2 - height/6 - (height/8)/2);
  jogar2.size(width/8, height/8); 
  pop();
  
  //gamestate jogar
  //painel
  botaoinstrucoes = new Botao (width/2 + width/12, height/2 - width/30, botaoinstrucoessvg, width/20);
  fechar = new Botao (width/2 + width/12, height/2 + width/30, fecharsvg, width/20);

  //SpeedSlider
  speedSlider = createSlider(0.5, 1.5, 1, 0.1);
  speedSlider.position(width/2 - width/27 , height/2 - (height/8)/2);
  speedSlider.size(height/6, height/8);
  speedSlider.style('rotate', '90deg');
  speedSlider.hide();

  //play
    playButton = createImg('svg/inicio.svg', 'Play');
    playButton.position(width/2 - width/7, height/2 - (height/8)/2);
    playButton.size(width/8, height/8);  
    playButton.mousePressed(play); 

    //botoes
    //melodia
    botaoCirculos[1] = new BotaoCirculos(windowWidth / 10, 0 + windowHeight / 6, 100, 5, 0, PI, melodiasvg, corMelodia, melodias);
    //apitos
    botaoCirculos[2] = new BotaoCirculos2(windowWidth - windowWidth / 10, 0 + windowHeight / 5, 100, 5, PI, 0, apitossvg, corApitos, apitos);
    //graves
    botaoCirculos[3] = new BotaoCirculos(windowWidth - windowWidth / 10, 0 + windowHeight - windowHeight / 6, 100, 5, -PI, 0, gravessvg, corGraves, baixos)  ;
    //percursão
    botaoCirculos[4] = new BotaoCirculos(windowWidth / 10, 0 + windowHeight - windowHeight / 6, 100, 5, 0, -PI, percussaosvg, corPercussao, percussoes);
  
}

function draw() {
  noStroke();
  background(35, 53, 63);

    //TIMER
    if (frameCount % frameRate == 0) {
      time++;
    }

  if (gamestate === "inicio") {
    inicioButton.exibir();
    jogar.hide();
    jogar2.hide();
    playButton.hide();
    speedSlider.hide();

    push();
    imageMode(CENTER);
    let proporcao = tecno.width / tecno.height;
    let novaAltura = (width / 4) * 2 / proporcao;
    let novaLargura = (width / 4) * 2; 
    image(tecno, windowWidth/2 , windowHeight - windowHeight/4 , novaLargura, novaAltura);
    pop();

    push();
    imageMode(CENTER);
    let proporcao2 = tecno2.width / tecno2.height;
    let novaAltura2 = (width / 4) * 2 / proporcao2;
    let novaLargura2 = width / 4 * 2; 
    image(tecno2, windowWidth/2 , windowHeight/4 , novaLargura2, novaAltura2);
    pop();

  } else if (gamestate === "elementos") {
    botaoMelodia.exibir();
    botaoPercussao.exibir();
    botaoApitos.exibir();
    botaoGraves.exibir();

    jogar.hide();
    jogar2.hide();
    speedSlider.hide();

    //elementos
    textAlign(CENTER, CENTER);
    textSize(width / 40);
    fill(255);

    text(instrucaoElementos[indexText], width / 2, height - (height / 5));

    push();
    translate(width / 2, height/5);
    rotate(PI);
    text(instrucaoElementos[indexText], 0, 0);
    pop();
  }else if (gamestate === "instrucoes"){
    playButton.hide();
    jogar.show();
    jogar2.show();
    speedSlider.hide();
    push();
    imageMode(CENTER);
    image(instrucoes, windowWidth/2 - (width/4) , windowHeight/2, width/2, height/1.6);
    pop();

    push();
    imageMode(CENTER);
    translate(windowWidth / 2 + (width/2) / 2, windowHeight / 2);
    rotate(PI); 
    image(instrucoes, 0, 0, width/2, height/1.6);
    pop();
  }else if (gamestate === "jogar") {
    playButton.show();
    speedSlider.show();
    jogar.hide();
    jogar2.hide();
    push();
    imageMode(CENTER);
    image(fundogeralsvg, width/2, height/2, width/3, height/4);
    pop();
    botaoinstrucoes.exibir();
    fechar.exibir();

    for (let i = 1; i < botaoCirculos.length; i++) {
      botaoCirculos[i].exibir();
    }
  }

  const playbackSpeed = speedSlider.value();
  allSounds.forEach(sound => {
    sound.rate(playbackSpeed);
  });

}
//verificar toque 
function verificar(button, x, y) {
  return x > button.position().x && x < button.position().x + button.width &&
         y > button.position().y && y < button.position().y + button.height;
}

//----------TROCAR TEXTO NA PAGINA ELEMENTOS--------------------
function trocartext(){
  indexText++; 
  
  if(indexText >= instrucaoElementos.length){
    indexText = 0; 
  }
}

//------------- Play all sounds simultaneously with volume 0----
function play() {

  if (isPlaying) {

    baixos.forEach(sound => {
      sound.stop();
      sound.setVolume(0);
    });
  
    melodias.forEach(sound => {
      sound.stop();
      sound.setVolume(0);
    });
  
    percussoes.forEach(sound => {
      sound.stop();
      sound.setVolume(0);
    });
  } else {

    baixos.forEach(sound => {
      sound.stop();
      sound.loop();
      sound.setVolume(0);
    });
  
    melodias.forEach(sound => {
      sound.stop();
      sound.loop();
      sound.setVolume(0);
    });
  
    percussoes.forEach(sound => {
      sound.stop();
      sound.loop();
      sound.setVolume(0);
    });
  }
}

//-------------FAZER O TOGGLE DO SOM-----------
function toggleVolume(sound) {
  // Toggle the volume between 0 and 1
  sound.setVolume(sound.getVolume() === 0 ? 1 : 0);
}

function playsom(sound) {
  // Toggle the volume between 0 and 1
  sound.setVolume(1);
  sound.play();
}

//----------- CRIAR OS BOTOES PARA DAR TOGGLE-----
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

//---------NEM SEI MUITO BEM, É PARA ESGALHAR CENAS AQUI-----
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
      gamestate = "instrucoes";
    }
  }
  
  if (gamestate == "instrucoes" && verificar(jogar, x, y)) {
      gamestate ="jogar";
  }else if (gamestate == "jogar" && fechar.contains(x, y)) {
    //sound.stop();
    location.reload();

  } else if (gamestate == "jogar" && botaoinstrucoes.contains(x, y)) {
    gamestate = "instrucoes";
  }

  for (let i = 1; i < botaoCirculos.length; i++) {
    botaoCirculos[i].verificarToque(x, y);
  }
}
}


//------CLASSES--------------

//BOTOES DA GAMESTATE INICIO E ELEMENTOS
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
  

  
  //BOTAO PRINCIPAL ONDE CONSEGUIMOS FAZER PREVIEW DO SOM
  class BotaoCirculos {
    constructor(x, y, diametroCentral, numCirculosSatelites, angSeletoresInicio, angSeletoresFim, svg, cor, array) {
      this.x = x;
      this.y = y;
      this.angSeletoresInicio = angSeletoresInicio;
      this.angSeletoresFim = angSeletoresFim;
      this.diametroCentral = diametroCentral;
      this.numCirculosSatelites = numCirculosSatelites;
      this.circulosSatelites = [];
      this.cor = cor;
      this.svg = svg;
      this.array = array;
  
      for (let i = 0; i < numCirculosSatelites; i++) {
        let angulo = map(i, 0, numCirculosSatelites, angSeletoresInicio, angSeletoresFim);
        let raio = this.diametroCentral * 1.3;
        let sateliteX = this.x + raio * cos(angulo);
        let sateliteY = this.y + raio * sin(angulo);
        this.circulosSatelites.push(new SeletorCirculos(sateliteX, sateliteY, 50, i + 1, this.cor, array));   
       }
    }
  
    exibir() {
      fill(this.cor);
      image(this.svg, this.x - this.diametroCentral / 2, this.y - this.diametroCentral / 2, this.diametroCentral, this.diametroCentral);
  
      for (let i = 0; i < this.numCirculosSatelites; i++) {
        this.circulosSatelites[i].exibir();
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
  
  // BOLAS COM OS SONS DENTRO DO BOTAO CIRCULOS
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
  
  exibir() {
      noStroke();
      fill(this.corAtual);
      ellipse(this.x, this.y, this.diametro, this.diametro);
      fill(255);
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
      this.corAtual = (this.corAtual === this.corOriginal) ? this.corNova : this.corOriginal;
  
      //som
      toggleVolume(this.array[this.numero-1]);
      
  
      this.id = this.numero-1;
    }
  
    getId() {
      return this.id;
    }
  }
    class BotaoCirculos2 {
      constructor(x, y, diametroCentral, numCirculosSatelites, angSeletoresInicio, angSeletoresFim, svg, cor, array) {
        this.x = x;
        this.y = y;
        this.angSeletoresInicio = angSeletoresInicio;
        this.angSeletoresFim = angSeletoresFim;
        this.diametroCentral = diametroCentral;
        this.numCirculosSatelites = numCirculosSatelites;
        this.circulosSatelites = [];
        this.cor = cor;
        this.svg = svg;
        this.array = array;
    
        for (let i = 0; i < numCirculosSatelites; i++) {
          let angulo = map(i, 0, numCirculosSatelites, angSeletoresInicio, angSeletoresFim);
          let raio = this.diametroCentral * 1.3;
          let sateliteX = this.x + raio * cos(angulo);
          let sateliteY = this.y + raio * sin(angulo);
          this.circulosSatelites.push(new SeletorCirculos2(sateliteX, sateliteY, 50, i + 1, this.cor, array));   
         }
      }
    
      exibir() {
        fill(this.cor);
        image(this.svg, this.x - this.diametroCentral / 2, this.y - this.diametroCentral / 2, this.diametroCentral, this.diametroCentral);
    
        for (let i = 0; i < this.numCirculosSatelites; i++) {
          this.circulosSatelites[i].exibir();
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
    
    // BOLAS COM OS SONS DENTRO DO BOTAO CIRCULOS
    class SeletorCirculos2 {
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
    
    exibir() {
        noStroke();
        fill(this.corAtual);
        ellipse(this.x, this.y, this.diametro, this.diametro);
        fill(255);
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
    
        //som
        playsom(this.array[this.numero-1]);
        
      }
    
      getId() {
        return this.id;
      }
  }
