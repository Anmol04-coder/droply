let tempCanvas = document.createElement('canvas');
let tempContext = tempCanvas.getContext('2d');

// Stop the pointer events to prevent accidental button clicking when picking a color
document.body.style['pointer-events'] = 'none';

let iframe = document.createElement('iframe');
let iframeDocument;
setupIframe(0, 0, 0);

document.addEventListener("click", captureCurrentPixel, false);

function captureCurrentPixel(e) {
	chrome.runtime.sendMessage({message: 'capture'}, (currentScreen) => {
		let img = new Image();
		img.src = currentScreen.imgSrc;
		img.onload = function() {
			tempCanvas.width = img.naturalWidth;
			tempCanvas.height = img.naturalHeight;

			tempContext.drawImage(img, 0, 0);

			// Use pixel ratio to make sure it works on screens with very high resolutions like Retina
			getColor(e.clientX * window.devicePixelRatio, e.clientY * window.devicePixelRatio);
		}
	});
}

function getColor(x, y) {
	let pixel = tempContext.getImageData(x, y, 1, 1).data;
	let red = pixel[0];
	let green = pixel[1];
	let blue = pixel[2];

	setupIframe(red, green, blue);

	document.body.style['pointer-events'] = 'auto';
}

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

function setupIframe(r, g, b) {
	iframe.onload = function() {
		iframe.style.background = "#EEEEEE";
		iframe.style.height = "50%";
		iframe.style.width = "180px";
		iframe.style.position = "fixed";
		iframe.style.top = "0px";
		iframe.style.right = "0px";
		iframe.style.zIndex = "1000000000";
		iframe.frameBorder = "none";

		iframeDocument = iframe.contentDocument;

		showClose();
		showRect(r, g, b);
		showParagraph(`RGB: (${r}, ${g}, ${b})`);
		showParagraph(`HEX: ${rgbToHex(r, g, b)}`);
		showParagraph(`HSL: ${rgbToHsl(r, g, b)}`);

		iframeDocument.body.style.fontFamily = 'Open Sans';
		iframeDocument.body.style.fontWeight = '200';
    iframeDocument.body.style.color = '#333333';
		iframeDocument.body.style.paddingLeft = "10px";
		iframeDocument.body.style.overflow = "hidden";
	}
	document.body.appendChild(iframe);
}

function showClose() {
	let closeButton = iframeDocument.createElement("p");
	let closeSymbol = iframeDocument.createTextNode("✕");
	closeButton.style.textAlign = "right";
	closeButton.onclick = stopExtension;
	closeButton.appendChild(closeSymbol);

	iframeDocument.body.appendChild(closeButton);
}

function showRect(r, g, b) {
	let c = iframeDocument.createElement('canvas');
	let ctx = c.getContext("2d");

	ctx.beginPath();
	ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
	ctx.rect(10, 10, 100, 100);
	ctx.rect.lineWidth = "5px";
	ctx.rect.strokeStyle = "black";
	ctx.stroke();
	ctx.fill();

	iframeDocument.body.appendChild(c);
}

function showParagraph(text) {
	let paragraph = iframeDocument.createElement("p");
	let textElement = iframeDocument.createTextNode(text);
	paragraph.appendChild(textElement);

	iframeDocument.body.appendChild(paragraph);
}

function stopExtension() {
	iframe.parentNode.removeChild(iframe);
}
