
document.addEventListener("DOMContentLoaded", function() {

    let ok=false;

    const TEAM_NB = 3;
    const USERNAME = 'Georgette';
    const USERJOB = 'pilot';
    const IP_SERVER = '92.222.88.16';
    const SERVER_PORT = ':9090';

    const ws = new WebSocket('ws://'+IP_SERVER+SERVER_PORT+'?team='+TEAM_NB+'&username='+USERNAME+'&job='+USERJOB);

    ws.onopen = function() {
        console.log('coucou c\'est Georgette (pilote connecté au serveur');
    };

    const fctJson=(movement,direction=1,angle=1)=> {
        if(movement=="move") {
            var vit=0.99;
            return JSON.stringify({name: 'spaceship:'+movement, data: { time: 1000, power:vit} }) ;}
        else if(movement=="rotate")
            return   JSON.stringify({name: 'spaceship:'+movement, data: { angle: 20, direction:direction} });
        else if(movement=="turnto")
            return JSON.stringify({name: 'spaceship:'+movement, data: { angle: parseInt(angle)} });
        else
            return null;

    };

    const moveRocket = () => {

        //alert( "Je bouge ! ! ! ") ;

        
        ws.send(fctJson("move"));
    };

    const turnLeftRocket =() => {
       ws.send(fctJson("rotate",-1));


        //alert( "Je tourne à gauche ! ! ! ") ;

    };

    const turnRightRocket =() => {
      ws.send(fctJson("rotate",1));


        //alert( "Je tourne à droite ! ! ! ") ;

    };

    const turnToRocket =(angle) => {
       ws.send(fctJson("turnto",null,angle));

        //alert( "Je tourne à "+angle+"° ! ! ! ") ;

    };


    /////////////////////////////////////////////////////////////////////////////

    document.querySelector("#forward")
        .addEventListener('click', function (e) {

            moveRocket();
            document.querySelector("#georgette").style.animation="move 3.5s ease alternate";

        })
        ;

    document.querySelector("#turn-left")
        .addEventListener('click', function (e) {

                turnLeftRocket();
            document.querySelector("#georgette").style.animation="moveL 5s ease alternate";
            });


    document.querySelector("#turn-right")
        .addEventListener('click', function (e) {

            turnRightRocket();
            document.querySelector("#georgette").style.animation="moveR 5s ease alternate";
        });


    /////////////////////////////////////////////////////////////////////////////
   let slider = document.querySelector("#input-turn");
   let ot = document.querySelector("#ot");
    ot.innerHTML = slider.value;
    slider.oninput = function () {
        ot.innerHTML = this.value;
    };

    document.querySelector("#turn-to-a")
        .addEventListener('click', function (e) {
            document.querySelector("#turn-to").submit();

            turnToRocket(document.querySelector("#turn-to")['input-turn'].value);

            console.log("rotate("+document.querySelector("#turn-to")['input-turn'].value+"deg)");


        }) ;

    document.addEventListener('keydown', function (e) {
            let touche = e.key;
            if (touche === "z") {
                document.querySelector("#georgette").style.animation="move 3s ease alternate";
                moveRocket();
                console.log('coucou j\'appuie sur le z');
                touche = null;
            }
            if (touche === "q") {
                document.querySelector("#georgette").style.animation="moveL 3s ease alternate";
                turnLeftRocket();
            }
            if (touche === "d") {
                turnRightRocket();
                document.querySelector("#georgette").style.animation="moveR 3s ease alternate";
            }
        }
    );
});

