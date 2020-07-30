let tempCanvas = document.createElement('canvas');
let tempContext = tempCanvas.getContext('2d');

// Stop the pointer events to prevent accidental button clicking when picking a color
document.body.style['pointer-events'] = 'none';

function sendMessage(event) {
	chrome.runtime.sendMessage({message: 'capture'}, (currentScreen) => {
		let img = new Image();
		img.src = currentScreen.imgSrc;
		img.onload = function() {
			tempCanvas.width = img.naturalWidth;
			tempCanvas.height = img.naturalHeight;

			tempContext.drawImage(img, 0, 0);

			// Use pixel ratio to make sure it works on screens with very high resolutions like Retina
			getColor(event.clientX * window.devicePixelRatio, event.clientY * window.devicePixelRatio);
		}
	});
}

function getColor(x, y) {
	let pixel = tempContext.getImageData(x, y, 1, 1).data;
	let red = pixel[0];
	let green = pixel[1];
	let blue = pixel[2];
	console.log([red, green, blue]);

	let iframe = document.createElement('iframe');
	iframe.onload = function() {
		iframe.style.background = "#071a52";
		iframe.style.height = "50%";
		iframe.style.width = "160px";
		iframe.style.position = "fixed";
		iframe.style.top = "0px";
		iframe.style.right = "0px";
		iframe.style.zIndex = "1000000000";
		iframe.frameBorder = "none";

		let iframeDocument = iframe.contentDocument;

		let c = iframeDocument.createElement('canvas');
		let ctx = c.getContext("2d");

		ctx.beginPath();
		ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
		ctx.rect(10, 10, 100, 100);
		ctx.fill();

		let rgbParagraph = iframeDocument.createElement("p");
		let rgbText = iframeDocument.createTextNode(`RGB: ${[red, green, blue]}`);
		rgbParagraph.appendChild(rgbText);

		let hexParagraph = iframeDocument.createElement("p");
		let hexText = iframeDocument.createTextNode(`HEX: `);
		hexParagraph.appendChild(hexText);

		let hslParagraph = iframeDocument.createElement("p");
		let hslText = iframeDocument.createTextNode(`HSL: `);
		hslParagraph.appendChild(hslText);

		let cmykParagraph = iframeDocument.createElement("p");
		let cmykText = iframeDocument.createTextNode(`CMYK: `);
		cmykParagraph.appendChild(cmykText);

		iframeDocument.body.appendChild(c);
		iframeDocument.body.appendChild(rgbParagraph);
		iframeDocument.body.appendChild(hexParagraph);
		iframeDocument.body.appendChild(hslParagraph);
		iframeDocument.body.appendChild(cmykParagraph);

		iframeDocument.body.style.fontFamily = 'Open Sans';
		iframeDocument.body.style.fontWeight = '200';
		iframeDocument.body.style.color = 'white';
		iframeDocument.body.style.paddingLeft = "10px";
	}

	document.body.appendChild(iframe);
}

document.addEventListener("click", sendMessage, false);
