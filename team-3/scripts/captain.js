function qrySelect(parent, element, value){
    document.getElementById(parent).querySelector(element).innerHTML = value;
};

function setPercent(index, value) {
    var barre = document.getElementsByClassName("active")[index];
    barre.setAttribute("data-percent" , parseInt(value));
    barre.getElementsByClassName("bar")[0].style.width = value + "%";
    barre.getElementsByClassName("progress")[0].innerHTML = parseInt(value) + "%";
};

function setColor(element, color) {
    document.querySelector(element).style.color = color;
};

function addClass(el, className) {
    if (el.classList)
      el.classList.add(className)
    else if (!hasClass(el, className)) el.className += " " + className
  }
  
  function removeClass(el, className) {
    if (el.classList)
      el.classList.remove(className)
    else if (hasClass(el, className)) {
      var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
      el.className=el.className.replace(reg, ' ')
    }
  }

const TEAM_NB = 3;
const USERNAME = 'Jayster';
const USERJOB = 'Captain';
const IP_SERVER = '92.222.88.16';
const SERVER_PORT = ':9090';

const ws = new WebSocket('ws://'+IP_SERVER+SERVER_PORT+'?team='+TEAM_NB+'&username='+USERNAME+'&job='+USERJOB);

var tab = new Object;

ws.onmessage = function(evt) { 
    tab = JSON.parse(evt.data);

    var broken ="Vaisseau en bon état";
    var safeZone ="Zone sécurisée";
    var cargo ="Vaisseau occupé";

    setPercent(0 , tab['data']['life']);
    setPercent(1 , tab['data']['systemPower']*100);
    setPercent(2 , tab['data']['shieldPower']*100);
    setPercent(3 , tab['data']['thrusterPower']*100);
    var dataPercent = "100";
    var width = "100%";
    var progress = "100%";
    if (tab["data"]["reloading"]) {
        dataPercent = "0";
        width = "0%";
        progress = "0%";
    }
    setPercent(4, dataPercent);

    qrySelect("infosVaisseau","li:nth-of-type(1)","Angle : " + tab['data']["angle"]);
    qrySelect("infosVaisseau","li:nth-of-type(2)","Direction de rotation : " + tab['data']["turnDirection"]);
    qrySelect("infosVaisseau","li:nth-of-type(3)","Rotation : " + tab['data']["turnTo"]);
    qrySelect("infosVaisseau","li:nth-of-type(4)","X : " + tab['data']["x"]);
    qrySelect("infosVaisseau","li:nth-of-type(5)","Y : " + tab['data']["y"]);
    if(tab['data']['broken']) {
        broken = "Vaisseau endommagé";
        setColor("li:nth-of-type(6)", "red");
        addClass(document.getElementById("infosRow"), "blink");
    } else {
        setColor("li:nth-of-type(6)", "green");
        removeClass(document.getElementById("infosRow"), "blink");
    }
    qrySelect("infosVaisseau","li:nth-of-type(6)",broken);

    if(tab['data']['inSafeZone'] == false) {
        safeZone = "Zone non sécurisée";
        setColor("li:nth-of-type(7)", "red");
    } else {
        setColor("li:nth-of-type(7)", "green");
    }
    qrySelect("infosVaisseau","li:nth-of-type(7)",safeZone);

    if(tab['data']['cargo'] == false) {
        cargo = "Vaisseau non occupé";
        setColor("li:nth-of-type(8)", "red");
    } else {
        setColor("li:nth-of-type(8)", "green");
    }
    qrySelect("infosVaisseau","li:nth-of-type(8)",cargo);

    qrySelect("infosTourelle","li:nth-of-type(1)","Angle : " + tab['data']["turretAngle"]);
    qrySelect("infosTourelle","li:nth-of-type(2)","Direction de rotation : " + tab['data']["turretTurnDirection"]);
    qrySelect("infosTourelle","li:nth-of-type(3)","Rotation : " + tab['data']["turretTurnTo"]);
};