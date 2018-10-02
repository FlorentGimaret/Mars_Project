document.addEventListener("DOMContentLoaded", function() {

	var _mouseDown = 0;
	document.body.on_mouseDown = function() { _mouseDown = 1; }
	document.body.onmouseup = function() { _mouseDown = 0; }

	var _userMode = document.querySelector('.modeBtn.pressed').getAttribute('id').replace('Btn', '');
	console.log("_userMode", _userMode);

	const TEAM_NB = 2;
	const USERNAME = 'PaulZer';
	const USERJOB = 'Engineer';

	const ws = new WebSocket('ws://92.222.88.16:9090?team='+TEAM_NB+'&username='+USERNAME+'&job='+USERJOB);

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
	}

	var changeListener = function(input){
		if(!_mouseDown) return;
	  	send(this.id, this.value);
	  	console.log(document.querySelector('#'+this.id+'Info'));
	  	document.querySelector('#'+this.id+'Info').innerHTML = this.value+'%';

	  	var inputValues = [healthInput, shieldInput, thusterInput].map(x => parseInt(x.value));
	  	console.log("inputValues", inputValues);

	  	var sum = inputValues.reduce((a, v) => a + v);
	  	console.log(sum);
	  	if(sum !== 100){
	  		// TODO SWITCH MODE
	  	} else return;
	};

	var changeModeListener = function(button){
		document.getElementsByClassName('modeBtn').forEach(function(el){
			el.classList.remove('pressed');
		});

		button.classList.add('pressed');

		_userMode = button.getAttribute('id').replace('Btn', '');
		console.log("_userMode", _userMode);
	};

  	var healthInput = document.querySelector('#systemPower');
  	var shieldInput = document.querySelector('#shieldPower');
  	var thusterInput = document.querySelector('#thrusterPower');

  	[healthInput, shieldInput, thusterInput].forEach(function(el){
  		el.addEventListener('mousemove', changeListener);
  	});

  	var stabilizePowerBtn = document.querySelector('#stabilizePower');
  	stabilizePowerBtn.addEventListener('click', function(e){
  		[healthInput, shieldInput, thusterInput].forEach(function(el){
  			if(el === healthInput) var val = 34;
  			else var val = 33;
  			el.value = val;
  			el.dispatchEvent(new Event('change'));
  		});
  	});

  	var tankBtn = document.querySelector('#tankBtn');
  	var slasherBtn = document.querySelector('#slasherBtn');
  	var healerBtn = document.querySelector('#healerBtn');

  	[tankBtn, slasherBtn, healerBtn].forEach(function(el){
  		el.addEventListener('click', changeModeListener);
  	});
});

