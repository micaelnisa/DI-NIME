let ellipses = []; // Array para armazenar as elipses
let diameter = 40;
let dragging = [];
let circleDiameter = 100; // Tamanho inicial do círculo maior
let circleColor;

function setup() {
  createCanvas(displayWidth, 700);
  circleColor = color(255, 0, 0); // Define a cor do círculo maior como vermelho (R, G, B)
}

function draw() {
  background("lightgrey");

  // Desenha o círculo maior
  fill(circleColor);
  ellipse(width - circleDiameter / 2, height - circleDiameter / 2, circleDiameter, circleDiameter);

  // Loop para desenhar e exibir cada elipse no array
  for (let i = 0; i < ellipses.length; i++) {
    let ell = ellipses[i];
    noStroke();
    ellipse(ell.x, ell.y, diameter, diameter);
  }
}

function touchStarted() {
  for (let i = 0; i < touches.length; i++) {
    let touchX = touches[i].x;
    let touchY = touches[i].y;

    // Verifica se o toque está sobre o círculo maior
    let d = dist(width - circleDiameter / 2, height - circleDiameter / 2, touchX, touchY);
    if (d < circleDiameter / 2) {
      // Adiciona uma nova elipse em uma posição aleatória não sobreposta
      let newEllipse = generateRandomEllipsePosition();
      ellipses.push(newEllipse);
    } else {
      // Verifica se o toque está sobre alguma elipse e a move
      for (let j = ellipses.length - 1; j >= 0; j--) {
        let ell = ellipses[j];
        let distTouchEllipse = dist(ell.x, ell.y, touchX, touchY);
        if (distTouchEllipse < diameter / 2) {
          dragging[i] = j;
          break; // Impede a seleção múltipla de elipses
        }
      }
    }
  }
  return false; // Evita o comportamento padrão do toque
}

function touchMoved() {
  for (let i = 0; i < touches.length; i++) {
    let touchX = touches[i].x;
    let touchY = touches[i].y;

    if (dragging[i] !== undefined) {
      let index = dragging[i];
      ellipses[index].x = touchX;
      ellipses[index].y = touchY;
    }
  }
  return false; // Evita o comportamento padrão do toque
}

function touchEnded() {
  for (let i = 0; i < touches.length; i++) {
    if (dragging[i] !== undefined) {
      dragging.splice(i, 1);
    }
  }
  return false; // Evita o comportamento padrão do toque
}

function generateRandomEllipsePosition() {
  // Gera uma posição aleatória para a elipse sem sobreposição
  let newEllipse;
  let overlapping;
  do {
    overlapping = false;
    newEllipse = {
      x: random(diameter / 2, width - diameter / 2),
      y: random(diameter / 2, height - diameter / 2)
    };
    // Verifica se a nova elipse se sobrepõe a alguma elipse existente
    for (let i = 0; i < ellipses.length; i++) {
      let ell = ellipses[i];
      let distance = dist(newEllipse.x, newEllipse.y, ell.x, ell.y);
      if (distance < diameter) {
        overlapping = true;
        break;
      }
    }
  } while (overlapping);
  return newEllipse;
}
