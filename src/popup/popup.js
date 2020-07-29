// coding for the popup
// need code finding hex number before can fully be completed
// layout for actual code

function setup() {
    createCanvas(100, 100)
    colorMode(HSB, 360, 100, 100);
    backgroundColor = 95;
    // c = HSB color variable
}

function draw() {
    background(backgroundColor);

    // Need variable for the color in HSB -- can be changed
    // fill(c)
    ellipse(10, 10, 20);

    // Need variable for hex numeber ${varible}
    text(`Hex: ` 30, 10);
}
