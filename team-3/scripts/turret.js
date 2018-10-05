document.addEventListener("DOMContentLoaded", function() {
	//Constants

	const minRotation = 0;
	const maxRotation = 360;
	const minRotationSpeed = 1;
	const maxRotationSpeed = 50;
	const initialRotation = 180;
	const initialspeedRotationValue = 10;
	
	const TEAM_NB = 3;
    const USERNAME = 'Vinterdraken';
    const USERJOB = 'GUNNER';
    const IP_SERVER = '92.222.88.16';
    const SERVER_PORT = ':9090';

    const ws = new WebSocket('ws://'+IP_SERVER+SERVER_PORT+'?team='+TEAM_NB+'&username='+USERNAME+'&job='+USERJOB);

	////Websocket

	ws.onopen = function(){
		console.log('Server opened');
	}
	ws.onmessage = function(event){
		var data = JSON.parse(event.data);
		console.log('Message server : ', data);
	}

	// TURRET ROTATION

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

	// TURRET SHOOT

	// DOM Items //
	var range = document.getElementById("power_range");
	var shooter = document.getElementById("shoot_button");
	var speedText = document.getElementById('current_power');
	var reloadTimeText = document.getElementById('current_reload_time');

	// Range value & Relaod time display //
	range.addEventListener('mousemove', 
		function(event){
			var currentSpeed = event.target.value / 100;
			speedText.innerHTML = "Missile power: " + currentSpeed;
			reloadTimeText.innerHTML = "Reload time: " + (5 * currentSpeed) + "s";
		}
	);

	// When 'fire' button is clicked //
	shooter.addEventListener('click', function(event){ shoot(ws); });

	// Shoot when you press space //
	document.addEventListener('keydown', 
		function(event){
			if(event.keyCode == 32)
				shoot(ws);	
		}
	);

	// FUNCTIONS // 
	function shoot(socket){

		socket.send(JSON.stringify({name: "spaceship:turret:fire", data:{ power: (range.value / 100)}}));

		shooter.innerHTML = "RELOADING";
		shooter.setAttribute("disabled", true);
		shooter.style.backgroundColor = 'red';
		shooter.style.color = 'white';

		setTimeout(
			function(){
				shooter.innerHTML = "READY TO SHOOT";
				shooter.removeAttribute("disabled");
				shooter.style.backgroundColor = 'greenyellow';
				shooter.style.color = 'black';
			}, 
			5000 * (range.value / 100)
		);
	}
});


