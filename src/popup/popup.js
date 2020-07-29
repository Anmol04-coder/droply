// coding for the popup
// need code finding hex number before can fully be completed
// layout for actual code

function setup() {
    createCanvas(200, 50)
    colorMode(RGB, 255, 255, 255);
    backgroundColor = 255;
    c = color(200, 80, 80);
}

function draw() {
    background(backgroundColor);

    // Need variable for the color in HSB -- can be changed
    fill(c)
    ellipse(20, 20, 20);

    // Need variable for hex numeber ${varible}
    fill(0, 0, 0);
    textSize(15)
    text(`RGB: `,75, 40);
    text(`HEX: ` ,75, 15);
    
    
    // alert("Droply\nHex: number");

}

/* function newPopup(url) {
    popupWindow = window.opem(url, 'popUpWindow', 'height = 300, width = 400, left = 10, top = 10, resizable = yes, scrollbars = yes, toolbars = yes, menubars = no, location = no, directories = no, status = yes')
} */


