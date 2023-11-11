   let playButton;
   let gameState = "menu"; // estado do jogo para podermos ir alterando conforme o que esta a acontecer
   
   function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);

     playButton = new BotaoRedondo(width / 2, height / 2, 200, color(0, 113, 188));
     //diametro cagado a definir a posição
     melodia_button = new BotaoRedondo((width / 2) - 100, (height / 2) - 100, 100, color (32, 181, 115));
     percursao_button = new BotaoRedondo((width / 2) - 100, (height / 2) + 100, 100, color (0, 169, 157));
   }
   
   function draw() {
    background(35, 53, 63);
   
     if (gameState === "menu") {
       playButton.display();
     } else if (gameState === "iniciar") {
       // botoes do elementos do jogo
       melodia_button.display();
       percursao_button.display();

     }
   }
   
   //alterar depois para touch
   function mousePressed() {
     if (gameState === "menu" && playButton.contains(mouseX, mouseY)) {
        //aqui ao carregar no play o gamestate fica diferente
       gameState = "iniciar";
     }
   }
   
   class BotaoRedondo {
     constructor(x, y, diametro, cor) {
       this.x = x;
       this.y = y;
       this.diametro = diametro;
       this.cor = cor;
     }
   
     display() {
       fill(this.cor);
       noStroke();
       ellipse(this.x, this.y, this.diametro, this.diametro);
     }
   
     contains(px, py) {
       let d = dist(px, py, this.x, this.y);
       return d < this.diametro / 2;
     }
   }
   