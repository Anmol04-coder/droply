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
			console.log(`width: ${img.naturalWidth}, height: ${img.naturalHeight}`);
			tempContext.drawImage(img, 0, 0);

			// Make sure it works on screens with very high resolutions like Retina
			if (window.devicePixelRatio > 1){
				console.log('its more ye');
				console.log(window.devicePixelRatio);
                tempContext.scale(1/window.devicePixelRatio, 1/window.devicePixelRatio);
            }

			// experimenting with different X and Y values
			let rect = tempCanvas.getBoundingClientRect();
			let x = event.clientX - rect.left;
			let y = event.clientY - rect.top;

			getColor(x, y);
			getColor(event.clientX, event.clientY);
			getColor(event.offsetX, event.offsetY);
			getColor(event.pageX, event.pageY);
			getColor(event.screenX, event.screenY); 
			getColor(event.layerX, event.layerY);
		}
	});
}

function getColor(x, y) {
	console.log(`x: ${x}, y: ${y}`);
	let pixel = tempContext.getImageData(x, y, 1, 1).data;
	let red = pixel[0];
	let green = pixel[1];
	let blue = pixel[2];
	console.log([red, green, blue]);
}

document.addEventListener("click", sendMessage, false);
