//Constants
const minRotation = 0;
const maxRotation = 360;
const minRotationSpeed = 1;
const maxRotationSpeed = 50;
const initialRotation = 180;
const initialspeedRotationValue = 10;

//Variables
var rotationValue = initialRotation;
var speedRotationValue = initialspeedRotationValue;
var inputRotationSelected = false;
var inputSpeedRotationSelected = false;
var leftDirection = false;
var rightDirection = false;
var upSpeed = false;
var downSpeed = false;

//DOM elements
var rotationView;
var rotationController;
var speedRotationView;
var speedRotationController;
var arrowLeft;
var arrowRight;

//Functions
function reloadView() {
	rotationController.value = rotationValue;
	rotationView.textContent = rotationValue;
	speedRotationController.value = speedRotationValue;
	speedRotationView.textContent = speedRotationValue;
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
	} else if(inputSpeedRotationSelected){
		speedRotationValue = speedRotationController.value;
		reloadView();
	}
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
	
	////Range input changement
	speedRotationController.addEventListener('mousedown', function(){
		inputSpeedRotationSelected = true;
	});
	
	speedRotationController.addEventListener('mouseup', function(){
		inputSpeedRotationSelected = false;
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
		console.log('leftDirection : ', leftDirection, '/ rightDirection : ', rightDirection);
	});
	////Keyup
	document.addEventListener('keyup', function(event){
		console.log(event);
		if(event.keyCode == 37){	//left
			leftDirection = false;
		} else if(event.keyCode == 38){	//top
		}
		else if(event.keyCode == 39){	//right
			rightDirection = false;
		} else if(event.keyCode == 40){	//bottom
		}
		console.log('leftDirection : ', leftDirection, '/ rightDirection : ', rightDirection);
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