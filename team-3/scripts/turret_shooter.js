
// SOCKETS //

const USERNAME_2 = 'Vinterdraken';
const USERJOB_2 = 'Gunner';

ws.onopen = function(e){
	console.log("Artilleur connecté");
}


ws.onmessage = function(event){
	var data = JSON.parse(event.data);
	//console.log(data);
}

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