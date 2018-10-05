document.addEventListener("DOMContentLoaded", function() {

	const TEAM_NB = 2;
	const USERNAME = 'PaulZer';
	const USERJOB = 'Engineer';
	const IP_SERVER = '92.222.88.16';
	const SERVER_PORT = ':9090';
	
	const ws = new WebSocket('ws://'+IP_SERVER+SERVER_PORT+'?team='+TEAM_NB+'&username='+USERNAME+'&job='+USERJOB);

	var _mouseDown = 0;
	var _userMode = document.querySelector('.modeBtn.pressed').getAttribute('id').replace('Btn', '');
	console.log("_userMode", _userMode);

	ws.onopen = function(e){
		console.log(e);
	}

	ws.onmessage = function(event){
		var data = JSON.parse(event.data);
		//console.log(data);
	}

	var send = function(id, value){
		var component = id.replace('Power', '');
		console.log('COMMAND => spaceship:'+component+':power');
		console.log('COMMAND DATA : power =>', value);

		ws.send(JSON.stringify({ power: 'spaceship:'+component+':power', data: { power: value }}));
	}

	var changeListener = function(event){
		console.log(_mouseDown);
		if(!_mouseDown) return;

		var input = event.srcElement;
		console.log("input", input);

	  	send(input.id, input.value);
	  	console.log(document.querySelector('#'+input.id+'Info'));
	  	document.querySelector('#'+input.id+'Info').innerHTML = this.value+'%';

	  	var inputValues = [healthInput, shieldInput, thusterInput].map(x => parseInt(x.value));
	  	console.log("inputValues", inputValues);

	  	var sum = inputValues.reduce((a, v) => a + v);
	  	console.log(sum);
	  	if(sum !== 100){
	  		// TODO SWITCH MODE
	  	} else return;
	};

	var changeModeListener = function(event){
		var modeBtns = document.getElementsByClassName('modeBtn');
		for (var i =  0; i <= modeBtns.length - 1; i++) {
			modeBtns[i].classList.remove('pressed');
		}
		var button = event.target.classList.contains('modeBtn') ? event.target : event.target.closest('.modeBtn');
		button.classList.add('pressed');

		_userMode = button.getAttribute('id').replace('Btn', '');
	};

  	var healthInput = document.querySelector('#systemPower');
  	var shieldInput = document.querySelector('#shieldPower');
  	var thusterInput = document.querySelector('#thrusterPower');

  	[healthInput, shieldInput, thusterInput].forEach(function(el){
  		el.addEventListener('mousemove', changeListener);
  		el.onmousedown = function() { _mouseDown = 1; }
		el.onmouseup = function() { _mouseDown = 0; }
  	});

  	var stabilizePowerBtn = document.querySelector('#stabilizePower');
  	stabilizePowerBtn.addEventListener('click', function(e){
  		[healthInput, shieldInput, thusterInput].forEach(function(el){
  			if(el === healthInput) var val = 34;
  			else var val = 33;
  			el.value = val;
  			_mouseDown = 1;
  			el.dispatchEvent(new Event('mousemove'));
  			_mouseDown = 0;
  		});
  	});

  	var tankBtn = document.querySelector('#tankBtn');
  	var slasherBtn = document.querySelector('#slasherBtn');
  	var healerBtn = document.querySelector('#healerBtn');

  	[tankBtn, slasherBtn, healerBtn].forEach(function(el){
  		el.addEventListener('click', changeModeListener);
  	});
});

