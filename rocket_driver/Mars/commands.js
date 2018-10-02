
window.onload = function() {

    const moveRocket = () => {

        alert( "Je bouge ! ! ! ") ;
    };

    const turnLeftRocket =() => {

        alert( "Je tourne à gauche ! ! ! ") ;

    };

    const turnRightRocket =() => {

        alert( "Je tourne à droite ! ! ! ") ;

    };

    const turnToRocket =(angle) => {

        alert( "Je tourne à "+angle+"° ! ! ! ") ;

    };


    /////////////////////////////////////////////////////////////////////////////

    document.querySelector("#forward")
        .addEventListener('click', function (e) {

            moveRocket();

            document.querySelector("#georgette").style.animation="move 3.5s ease alternate";
            setTimeout(3000,function() {document.querySelector("#georgette").style.animation=""; }
            );
        });

    document.querySelector("#turn-left")
        .addEventListener('click', function (e) {

            turnLeftRocket();
            document.querySelector("#georgette").style.animation="moveL 5s ease alternate";
            setTimeout(3000,function() {document.querySelector("#georgette").style.animation=""; }
            );

        });
    document.querySelector("#turn-right")
        .addEventListener('click', function (e) {

            turnRightRocket();
            document.querySelector("#georgette").style.animation="moveR 5s ease alternate";
            setTimeout(3000,function() {document.querySelector("#georgette").style.animation=""; }
            );

        });



    document.querySelector("#turn-to-a")
        .addEventListener('click', function (e) {
            document.querySelector("#turn-to").submit();

            turnToRocket(document.querySelector("#turn-to")['input-turn'].value);

            //document.querySelector("#georgette").style.transform = "rotate("+document.querySelector("#turn-to")['input-turn'].value+"deg)";
            console.log("rotate("+document.querySelector("#turn-to")['input-turn'].value+"deg)");


        }) ;

    document.addEventListener('keydown', function (e) {
        let touche=e.key;
//console.log(touche);
        if(touche === " ") {
            document.querySelector("#georgette").style.animation="move 3s ease alternate";
            moveRocket();
            touche=null;

        }
        if(touche === "ArrowLeft") {
            document.querySelector("#georgette").style.animation="moveL 3s ease alternate";
            turnLeftRocket();
        }
        if (touche==="ArrowRight") {
            turnRightRocket();
            document.querySelector("#georgette").style.animation="moveR 3s ease alternate";

        }
        setTimeout(3000,function() {document.querySelector("#georgette").style.animation=""; }
        );
    });


    /*document.querySelector("#georgette")
        .addEventListener('click', function (e) {
            let x = Math.random()*658;
            let y = Math.random()*658;

            this.style.transform = "translate("+x+","+y+")";
            this.style.transition = "5s";

        })*/

};

