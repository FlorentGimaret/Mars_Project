//Constants
const minRotation = 0;
const maxRotation = 360;
const minRotationSpeed = 1;
const maxRotationSpeed = 50;
const initialRotation = 180;
const initialspeedRotationValue = 10;
const USERNAME_GUNNER2 = 'Yaya';
const USERJOB_GUNNER2 = 'Gunner';

////Websocket

ws.onopen = function(){
	console.log('Server opened');
}
ws.onmessage = function(event){
	var data = JSON.parse(event.data);
	console.log('Message server : ', data);
}

//Variables
var rotationValue = initialRotation;
var speedRotationValue = initialspeedRotationValue;
var inputRotationSelected = false;
var leftDirection = false;
var rightDirection = false;
var upSpeed = false;
var downSpeed = false;

//DOM elements
var rotationView;
var rotationController;
var arrowLeft;
var arrowRight;

//Functions
function reloadView() {
	rotationController.value = rotationValue;
}

function rotate(rotationKey = 1){
	if(rotationKey == -1){
		rotationValue -= speedRotationValue;
		message = {
			name: 'spaceship:turret:rotate',
			data: {
				angle: 10,
				direction: -1
			}
		};
	} else if( rotationKey == 1){
		rotationValue += speedRotationValue;
		message = {
			name: 'spaceship:turret:rotate',
			data: {
				angle: 5,
				direction: 1
			}
		};
	}
	//console.log('COMMAND => spaceship:'+component+':power');
	//console.log('COMMAND DATA : power =>', value);
	sendToServer(ws, message);
	resetInputRange();
	reloadView();
}

function resetInputRange(){
	if(rotationValue <= minRotation){
		rotationValue = maxRotation - rotationValue;
	} else if(rotationValue >= maxRotation){
		rotationValue = minRotation + (maxRotation - rotationValue);
	}
	rotationController.value = rotationValue;
}

function rangeMoved(){
	if(inputRotationSelected){
		rotationValue = rotationController.value;
		reloadView();
	}
}

function sendToServer(socket, message){
	let stringigy = JSON.stringify(message);
	socket.send(stringigy);
}

	
//main
window.onload = function(){
	
	//Dom initialisation
	rotationView = document.getElementsByClassName('rotationView')[0];
	rotationController = document.getElementsByClassName('rotationController')[0];
	speedRotationView = document.getElementsByClassName('speedRotationView')[0];
	speedRotationController = document.getElementsByClassName('speedRotationController')[0];
	let arrows = document.getElementsByClassName('arrow');
	arrowLeft = arrows[0];
	arrowRight = arrows[1];
	
	//init view
	reloadView();
	
	//Events	
	
	//Arrow keyboard
	////Keyup
	document.addEventListener('keyup', function(event){
		if(event.keyCode == 37){	//left
			leftDirection = false;
		}
		if(event.keyCode == 39){	//right
			rightDirection = false;
		}
	});
	////Keydown
	document.addEventListener('keydown', function(event){
		if(event.keyCode == 37){
			leftDirection = true;
		}
		if(event.keyCode == 39){
			rightDirection = true;
		}
		if(leftDirection){
			rotate(-1);
		}
		if(rightDirection){
			rotate(1);
		}
	});
		
};

//Notes pour Yannick
//spaceship:turret:rotate (angle, -1 ||1)
//spaceship:turret:turnto (angle)