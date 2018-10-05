//Constants
const minRotation = 0;
const maxRotation = 360;
const minRotationSpeed = 1;
const maxRotationSpeed = 50;
const initialRotation = 180;
const initialspeedRotationValue = 10;
const TEAM_NB = 3;
const USERNAME = 'Yaya';
const USERJOB = 'Gunner';

////Websocket
const ws = new WebSocket(`ws://92.222.88.16:9090?team=`+TEAM_NB+'&username='+USERNAME+'&job='+USERJOB);
ws.onopen = function(e){
	console.log(e);
}
ws.onmessage = function(event){
	var data = JSON.parse(event.data);
	console.log(data);
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
	rotationView.textContent = rotationValue;
}

function rotate(rotationKey = 1){
	if(rotationKey == -1){
		rotationValue -= speedRotationValue;
	} else if( rotationKey == 1){
		rotationValue += speedRotationValue;	
	}
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

function sendToServer(id, value){
	var component = id.replace('Power', '');
	//console.log('COMMAND => spaceship:'+component+':power');
	//console.log('COMMAND DATA : power =>', value);
	//ws.send(JSON.stringify({ power: 'spaceship:'+component+':power', data: { power: value }}));
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
	////Range input changement
	rotationController.addEventListener('mousedown', function(){
		inputRotationSelected = true;
	});
	
	rotationController.addEventListener('mouseup', function(){
		inputRotationSelected = false;
	});	
	
	//Main event : mousemove
	document.addEventListener('mousemove', function(){
		rangeMoved();
	});
	document.addEventListener('click', function(){
		rangeMoved();
	});
	
	////Arrows click
	arrowLeft.addEventListener('click', function(){
		rotate(-1)
	});
	
	arrowRight.addEventListener('click', function(event){
		rotate(1)
	});
	
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