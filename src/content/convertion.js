function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min){
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return `(${Math.floor(h * 360)}, ${Math.floor(s * 100)}, ${Math.floor(l * 100)})`;
}

function rgbToHex(r, g, b) {
  let hexCode = "";

  if (isNaN(r)) {
    hexCode += "00";
  } else {
    r = Math.max(0,Math.min(r,255));
    hexCode += "0123456789ABCDEF".charAt((r-r%16)/16)
        + "0123456789ABCDEF".charAt(r%16);
  }

  if (isNaN(g)) {
    hexCode += "00";
  } else {
    g = Math.max(0,Math.min(g,255));
    hexCode += "0123456789ABCDEF".charAt((g-g%16)/16)
        + "0123456789ABCDEF".charAt(g%16);
  }

  if (isNaN(b)) {
    hexCode += "00";
  } else {
    b = Math.max(0,Math.min(b,255));
    hexCode += "0123456789ABCDEF".charAt((b-b%16)/16)
        + "0123456789ABCDEF".charAt(b%16);
  }

  return "#" + hexCode;
}
