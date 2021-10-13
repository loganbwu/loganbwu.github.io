// Initialising the canvas
var canvas = document.querySelector('#animation'),
    ctx = canvas.getContext('2d');

// Setting the width and height of the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Setting up the letters
var letters = 'LOGANWU'.split('');

// Setting up the columns
var fontSize = 10,
    columns = canvas.width / fontSize;

// Setting up the drops
var drops = new Array(Math.ceil(columns)).fill(Infinity);

// Paths
// Vector field
function F(x, y) {
    var rho = Math.sqrt(x*x + y*y),
        r = rho - 1,
        a = gamma*(1 - rho*rho),
        b = -gamma*c*r*r + 1;
    return [x*a - b*y, y*a + b*x];
}

var X = [], Y = [];

// Setting up the draw function
function draw() {
  ctx.fillStyle = 'rgba(221, 221, 221, .2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // Draw letters
  for (var i = 0; i < drops.length; i++) {
    var text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillStyle = 'white';
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    drops[i]++;
    if (drops[i] * fontSize > canvas.height && Math.random() > .999) {
      drops[i] = 0;
    }
  }
  // Draw vector paths
}

canvas.addEventListener("mousedown", function(e) {
	console.log(e);
});

// Loop the animation
setInterval(draw, 66);