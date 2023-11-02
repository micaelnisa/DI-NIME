let ellipses = []; // Array para armazenar as elipses
let diameter = 40;
let offsetX, offsetY;
let dragging = false;
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

function mousePressed() {
  // Verifica se o mouse está sobre o círculo maior
  let d = dist(width - circleDiameter / 2, height - circleDiameter / 2, mouseX, mouseY);
  if (d < circleDiameter / 2) {
    // Adiciona uma nova elipse em uma posição aleatória não sobreposta
    let newEllipse = generateRandomEllipsePosition();
    ellipses.push(newEllipse);
  } else {
    // Verifica se o mouse está sobre alguma elipse e a move
    for (let i = 0; i < ellipses.length; i++) {
      let ell = ellipses[i];
      let distMouseEllipse = dist(ell.x, ell.y, mouseX, mouseY);
      if (distMouseEllipse < diameter / 2) {
        dragging = true;
        offsetX = ell.x - mouseX;
        offsetY = ell.y - mouseY;
        ellipses.splice(i, 1); // Remove a elipse do array para que seja redesenhada na frente
        ellipses.push(ell); // Adiciona a elipse novamente no final do array
        return;
      }
    }
  }
}

function mouseDragged() {
  // Move a elipse que está sendo arrastada
  if (dragging) {
    ellipses[ellipses.length - 1].x = mouseX + offsetX;
    ellipses[ellipses.length - 1].y = mouseY + offsetY;
  }
}

function mouseReleased() {
  // Para de arrastar a elipse quando o botão do mouse é solto
  dragging = false;
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
