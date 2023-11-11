let ellipses = [];
let diameter = 40;
let dragging = [];
let circleDiameter = 100;
let circleColor;

function setup() {
  createCanvas(displayWidth, 700);
  circleColor = color(255, 0, 0);
}

function draw() {
  background("lightgrey");

  fill(circleColor);
  ellipse(width - circleDiameter / 2, height - circleDiameter / 2, circleDiameter, circleDiameter);

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

    // Verifica se o toque está sobre alguma elipse e a move
    let ellipseTouched = false;
    for (let j = ellipses.length - 1; j >= 0; j--) {
      let ell = ellipses[j];
      let distTouchEllipse = dist(ell.x, ell.y, touchX, touchY);
      if (distTouchEllipse < diameter / 2) {
        dragging[i] = j;
        ellipseTouched = true;
        break;
      }
    }

    // Se o toque não estiver sobre nenhuma elipse, adiciona uma nova elipse
    if (!ellipseTouched) {
      let d = dist(width - circleDiameter / 2, height - circleDiameter / 2, touchX, touchY);
      if (d < circleDiameter / 2) {
        let newEllipse = generateRandomEllipsePosition();
        ellipses.push(newEllipse);
      }
    }
  }
  return false;
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
  return false;
}

function touchEnded() {
  for (let i = 0; i < touches.length; i++) {
    if (dragging[i] !== undefined) {
      dragging.splice(i, 1);
    }
  }
  return false;
}

function generateRandomEllipsePosition() {
  let newEllipse;
  let overlapping;
  do {
    overlapping = false;
    newEllipse = {
      x: random(diameter / 2, width - diameter / 2),
      y: random(diameter / 2, height - diameter / 2)
    };
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

