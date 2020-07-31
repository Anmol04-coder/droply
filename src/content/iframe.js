let children = document.body.children; // for pointer-events control
let iframe = document.createElement('iframe');
let iframeDocument;

setupIframe(0, 0, 0);

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
		iframe.id = 'droplyIframe';

		iframeDocument = iframe.contentDocument;

		showClose();
		showRect(r, g, b);
		showParagraph(`RGB: (${r}, ${g}, ${b})`);
		showParagraph(`HEX: ${rgbToHex(r, g, b)}`);
		showParagraph(`HSL: ${rgbToHsl(r, g, b)}`);

    let link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', 'https://fonts.googleapis.com/css?family=Open+Sans:200');
    document.head.appendChild(link);

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

	for (let i = 0; i < children.length; i++) {
		children[i].style['pointer-events'] = 'auto';
	}

  document.removeEventListener('click', captureCurrentPixel, false);
}
