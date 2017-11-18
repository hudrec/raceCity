var FPS = 30;
var ctx;
var pista;
var mod =0;
var x;
var y;
var fondo = new Image();
fondo.src = "img/Fondo-prueba.png";
var auto1 = new Image();
auto1.src = "img/Auto-1.png";
var auto2 = new Image();
auto2.src = "img/Auto-2.png";
var road = new Image();
road.src = "img/road.PNG";
var buffer;
var left=false;
var left1=false;
var right=false;
var right1=false;
var meta= [];

for (var i = 8; i >= 0; i--) {
    meta[i] = new Image();
    meta[i].src = "img/meta/meta_"+ String(i+1)+".png";
}

var speed=2;


function inicializar(){
    count = 0;
}
var term = 0;
var alejar = 0;
var x1;
var y1;
function terminar(){
    term++;
    ter_id = requestAnimationFrame(terminar);

    if (term && 1){
        ctx.drawImage(meta[8],0,0);
        alejar = term*13;
        if (term & speed) car = auto1;
        else car = auto2;
        x = largo*(1-term/10) ;
        y = ancho*(1-term/10) ;
    }
    ctx.drawImage(car,pista1.width/2 + mod-x/2,pista1.height-y-alejar,x,y); 
    if (term > 12){
        cancelAnimationFrame(ter_id);
        ctx.drawImage(meta[8],0,0);
    }



}
// var indice = 0;
var limite = 0;
var rutas =  [["R",10],["D",10], ["R",10],["I",10]];
var scale=0.7


var speed1=2;
var count1 = 0;
var mod1 =0;


window.connectManager = new connectsdk.ConnectManager();

window.connectManager.on("message", function(data){
    if (data.message.jugador){
        tecla = data.message.jugador;
        if(data.message.accion == "mover")
        {
            switch (tecla){
                case "izquierda" : 
                    mod -= 10; 
                    left = true; 
                    break;
                    //case 38 : 
                    //    cuadrado.style.top = situacionX-220+"px" ;break;
                case "derecha" :  
                    mod += 10 ;
                    right = true;
                    break;
                    //case 40 : 
                    //    cuadrado.style.top = situacionX-180+"px" ;break;
                default :alert("Se ha equivocado, debe pulsar las flechas del teclado");
            }
        }
    }
    if (data.message.jugador1){
        tecla1 = data.message.jugador1;
        if(data.message.accion1 == "mover")
        {
            switch (tecla){
                case "izquierda" : 
                    mod1 -= 10; 
                    left1 = true; 
                    break;
                    //case 38 : 
                    //    cuadrado.style.top = situacionX-220+"px" ;break;
                case "derecha" :  
                    mod1 += 10 ;
                    right1 = true;
                    break;
                    //case 40 : 
                    //    cuadrado.style.top = situacionX-180+"px" ;break;
                default :alert("Se ha equivocado, debe pulsar las flechas del teclado");
            }
        }
    }
    if (data.message.entrar == "jugador"){
        $("body").css('background-image','url("img/fondotv.png")');

        var chofer = new Image();
        chofer.src = "img/chofer1.png";
        ctx = document.getElementById("auto").getContext("2d");
        chofer.onload = function(){
            ctx.drawImage(chofer,480,140);
            ctx.font="60px Georgia";
            ctx.fillStyle = "#fff";
            ctx.fillText(data.message.name,480,500)
        };

        var iniciar = new Image();
        iniciar.src = "img/forms/iniciar.png";
        iniciar.onload = function(){
            ctx.drawImage(iniciar,900,550);
        };
        var opciones = new Image();
        opciones.src = "img/forms/opciones.png";
        opciones.onload = function(){
            ctx.drawImage(opciones,900,600);

        };



        //alert("NUEVO JUGADOR");
        //main.drawImage(chofer,500,800);
    }
    if (data.message.jugar){
        $('#auto')[0].width = window.innerWidth;
        $('#auto')[0].height = window.innerHeight/2;
        ctx = document.getElementById("auto").getContext("2d");
        ctx.drawImage(fondo,0,0,fondo.width,fondo.height,0,0,fondo.width,window.innerHeight/5);

        correr(ctx,jugador1);
        document.body.style.backgroundImage='none';
        //$("#listaJugadores").hide();

        correr();

        manejar();
    }      
});
window.connectManager.init();

var jugador1 = {ruta : 0,
    count : 0,
    indice : 0,
    name:1
};
var jugador2 = {ruta : 0,
    count : 0,
    indice : 0,
    name:2
};

function init(){
    setTimeout(function(){
        $("body").css('background-image','url("img/esperando.png")')

        $('#auto')[0].width = window.innerWidth;
        $('#auto')[0].height = window.innerHeight/2;
        ctx = document.getElementById("auto").getContext("2d");

        $('#auto1')[0].width = window.innerWidth;
        $('#auto1')[0].height = window.innerHeight/2;
        ctx1 = document.getElementById("auto1").getContext("2d");

        var nuevoJugador1 = raceCityJugador(ctx, "Ider", "rojo", 100);
        var nuevoJugador2 = raceCityJugador(ctx1, "Fredy", "rojo", -100);
        nuevoJugador1.setCompetidores([nuevoJugador2]);
        nuevoJugador2.setCompetidores([nuevoJugador1]);

        nuevoJugador1.dibujar(20);
        nuevoJugador2.dibujar(20);

        //nuevoJugador1.useKeyboard();
        //nuevoJugador1.jugar();

        //nuevoJugador2.useAlternateKeyboard();
        //nuevoJugador2.jugar();

        document.body.style.backgroundImage='none';

        //correr(ctx,jugador1);
        //correr(ctx1,jugador2);
    },3000)
}
