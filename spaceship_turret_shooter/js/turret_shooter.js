
// SOCKETS //

const TEAM_NB = 2;
const USERNAME = 'Vinterdraken';
const USERJOB = 'Gunner';

/*
const ws = new WebSocket('ws://92.222.88.16:9090?team=' + TEAM_NB + '&username='+ USERNAME +'&job='+ USERJOB);

ws.onopen = function(e){
	console.log(e);
}


ws.onmessage = function(event){
	var data = JSON.parse(event.data);
	//console.log(data);
}

var send = function(id, value){

	var component = id.replace('Power', '');
	//console.log('COMMAND => spaceship:'+component+':power');
	//console.log('COMMAND DATA : power =>', value);

	ws.send(JSON.stringify({ power: 'spaceship:'+component+':power', data: { power: value }}));
}*/

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
shooter.addEventListener('click', 
	function(event){
		shoot();
	}
);

// Shoot when you press space //
document.addEventListener('keydown', function(event){
	if(event.keyCode == 32)
		shoot();	
});

// FUNCTIONS // 
function shoot(){
	shooter.innerHTML = "RELOADING";
	shooter.setAttribute("disabled", true);

	setTimeout(
		function(){
			shooter.innerHTML = "READY TO SHOOT";
			shooter.removeAttribute("disabled");
		}, 
		5000 * (range.value / 100)
	);
}