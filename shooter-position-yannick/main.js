//Constants
const minRotation = 0;
const maxRotation = 360;
const minRotationSpeed = 1;
const maxRotationSpeed = 50;
const initialRotation = 180;
const initialspeedRotationValue = 10;
const TEAM_NB = 2;
const USERNAME = 'PaulZer';
const USERJOB = 'Engineer';
const ws = new WebSocket(`ws://92.222.88.16:9090?team=`+TEAM_NB+'&username='+USERNAME+'&job='+USERJOB);
ws.onopen = function(e){
	console.log(e);
}
ws.onmessage = function(event){
	var data = JSON.parse(event.data);
	//console.log(data);
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
	console.log('rotationValue : ', rotationValue);
	if(rotationValue <= minRotation){
		rotationValue = maxRotation - rotationValue;
	} else if(rotationValue >= maxRotation){
		rotationValue = minRotation + (maxRotation - rotationValue);
	}
	rotationController.value = rotationValue;
}

function updateValues(){
	if(inputRotationSelected){
		rotationValue = rotationController.value;
		resetInputRange();
		reloadView();
	}
}

function sendToServer(id, value){

	var component = id.replace('Power', '');
	//console.log('COMMAND => spaceship:'+component+':power');
	//console.log('COMMAND DATA : power =>', value);

	ws.send(JSON.stringify({ power: 'spaceship:'+component+':power', data: { power: value }}));
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
		updateValues();
	});
	document.addEventListener('click', function(){
		updateValues();
	});
	
	////Arrows click
	arrowLeft.addEventListener('click', function(){
		rotate(-1)
	});
	
	arrowRight.addEventListener('click', function(event){
		rotate(1)
	});
	
	//Arrow keyboard
	////Keydown
	document.addEventListener('keydown', function(event){
		if(event.keyCode == 37){
			leftDirection = true;
		}
		else if(event.keyCode == 39){
			rightDirection = true;
		}
		//console.log('leftDirection : ', leftDirection, '/ rightDirection : ', rightDirection);
	});
	////Keyup
	document.addEventListener('keyup', function(event){
		console.log(event);
		if(event.keyCode == 37){	//left
			leftDirection = false;
		}
		else if(event.keyCode == 39){	//right
			rightDirection = false;
		}
		//console.log('leftDirection : ', leftDirection, '/ rightDirection : ', rightDirection);
	});
	////Keypress
	document.addEventListener('keypress', function(event){
		if(leftDirection){
			rotate(-1);
		}
		else if(rightDirection){
			rotate(1);
		}
		else if(upSpeed){
			if(speedRotationValue < maxRotationSpeed){
				++speedRotationValue;
				reloadView();
			}
		} else if(downSpeed){
			if(speedRotationValue > minRotationSpeed){
				--speedRotationValue;
				reloadView();
			}
		}
	});
		
};

//Notes pour Yannick
//spaceship:turret:rotate (angle, -1 ||1)
//spaceship:turret:turnto (angle)