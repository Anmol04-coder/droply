let s = function(sketch) {
  sketch.setup = function() {
    document.body.style['userSelect'] = 'none';
    let h = document.body.clientHeight;
    let c = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    c.position(0, 0);
    c.style('pointer-events', 'none');
  };

  sketch.mouseClicked = function() {
    //let cont = sketch.getContext('2d');
    let pixel = sketch.drawingContext.getImageData(sketch.mouseX, sketch.mouseY, 1, 1);
    let data = pixel.data;
    let rgba = 'rgba(' + data[0] + ', ' + data[1] + ', ' + data[2] + ', ' + (data[3] / 255) + ')';
    console.log(rgba);
    //const result = await analyze(img);
    //console.log(result[0].color);
  }
};

let myp5 = new p5(s);
