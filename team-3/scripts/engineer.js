document.addEventListener("DOMContentLoaded", function() {

	const TEAM_NB = 3;
	const USERNAME = 'PaulZer';
	const USERJOB = 'Engineer';
	const IP_SERVER = '92.222.88.16';
	const SERVER_PORT = ':9090';
	
	const ws = new WebSocket('ws://'+IP_SERVER+SERVER_PORT+'?team='+TEAM_NB+'&username='+USERNAME+'&job='+USERJOB);

	var _userMode = document.querySelector('.modeBtn.pressed').getAttribute('id').replace('Btn', '');
	console.log("_userMode", _userMode);

	var engineerSend = function(id, value){
		var component = id.replace('Power', '');
		console.log('=> spaceship:'+component+':power =>', value);

		ws.send(JSON.stringify({ 
			name: 'spaceship:'+component+':power',
			data: { power: value }}));
	}

	var changeModeListener = function(event){
		var modeBtns = document.getElementsByClassName('modeBtn');
		document.querySelector('#stabilizePower').classList.remove('pressed');
		for (var i =  0; i <= modeBtns.length - 1; i++) {
			modeBtns[i].classList.remove('pressed');
		}
		var button = event.target.classList.contains('modeBtn') ? event.target : event.target.closest('.modeBtn');
		button.classList.add('pressed');

		_userMode = button.getAttribute('role');
		engineerSend(_userMode, 0.8);
	};

  	var stabilizePowerBtn = document.querySelector('#stabilizePower');

  	stabilizePowerBtn.addEventListener('click', function(e){
  		engineerSend('shield', 0.33);
  		var modeBtns = document.getElementsByClassName('modeBtn');
		for (var i =  0; i <= modeBtns.length - 1; i++) {
			modeBtns[i].classList.remove('pressed');
		}
		this.classList.add('pressed');
  	});

  	var tankBtn = document.querySelector('#tankBtn');
  	var slasherBtn = document.querySelector('#slasherBtn');
  	var healerBtn = document.querySelector('#healerBtn');

  	[tankBtn, slasherBtn, healerBtn].forEach(function(el){
  		el.addEventListener('click', changeModeListener);
  	});
});
