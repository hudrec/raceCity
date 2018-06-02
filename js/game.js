var FPS = 30;
var ctx;



var fondo = new Image();
fondo.src = "img/Fondo-prueba.png";

//NI IDEA
var term = 0;
var alejar = 0;


var road = new Image();
road.src = "img/road.PNG";
var buffer;


//DIBUJAR META
var meta= [];

for (var i = 8; i >= 0; i--) {
    meta[i] = new Image();
    meta[i].src = "img/meta/meta_"+ String(i+1)+".png";
}

//POSICIONES DE LOS VEHICULOS?
var x;
var y;
var x1;
var y1;


var jugador1 = new raceCityJugador();
var jugador2 = new raceCityJugador();
var jugadores = new Array();


function reiniciar() {
    //REINICIAR PARTIDA
}

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
var scale=0.7;


/*data
    from
    message
        jugador
            nombre
            color
        accion
        direccion*/

//DATOS JUGADORES


var jugadores = new Array();
//INICIO DEL JUEGO
var contenidoCargado = false;
var salallena = false;
var iniciarJuego=false;



window.connectManager = new connectsdk.ConnectManager();
// MESSAGE: DEBE TENER NOMBRE Y COLOR
// OTRO OBJETO ID
window.connectManager.on("message", function(data){
    if(data.message.accion === "conectarJugador"){
        if(!salallena){
            var auxJugador = data.message.jugador;
            conectarJugador(auxJugador.nombre,auxJugador.color);
        }else{
            var mensaje = {error:"salallena"};
            window.connectManager.sendMessage(data.from,mensaje);
        }
    }
    
    if(data.message.accion == "mover") {
        switch (data.message.direccion) {
            case "izquierda":
                jugadores[data.message.id].left = true;
                jugadores[data.message.id].mod -= 10;
                break;

            case "derecha":
                jugadores[data.message.id].right = true;
                jugadores[data.message.id].mod += 10;
                break;

            default: alert("Se ha equivocado, debe pulsar las flechas del teclado");
        }
    }

    //TO DO: DIBUJAR 2 PILOTOS LISTOS PARA JUGAR
    if (data.message.entrar == "jugador"){

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

//CUANDO JUEGAN
function init(){
    setTimeout(function(){
        document.body.style.backgroundImage='none';
        $("body").css('background-image','url("img/Splash.png")');

        // $('#auto')[0].width = window.innerWidth;
        // $('#auto')[0].height = window.innerHeight/2;
        // ctx = document.getElementById("auto").getContext("2d");
        //
        // $('#auto1')[0].width = window.innerWidth;
        // $('#auto1')[0].height = window.innerHeight/2;
        // ctx1 = document.getElementById("auto1").getContext("2d");
        //
        // var nuevoJugador1 = raceCityJugador(ctx, "Ider", "rojo", 50);
        // var nuevoJugador2 = raceCityJugador(ctx1, "Fredy", "rojo", -50);
        // nuevoJugador1.setCompetidores([nuevoJugador2]);
        // nuevoJugador2.setCompetidores([nuevoJugador1]);
        //
        // nuevoJugador1.dibujar(19);
        // nuevoJugador2.dibujar(20);
        //
        // nuevoJugador1.useKeyboard();
        // nuevoJugador1.jugar();
        //
        // nuevoJugador2.useAlternateKeyboard();
        // nuevoJugador2.jugar();



        //correr(ctx,jugador1);
        //correr(ctx1,jugador2);
    },3000)
}

function conectarJugador(nombre,color) {

    var jugador = new raceCityJugador();
    jugador.setearNombre(nombre);
    jugador.setearColor(color);

    switch (jugadores.count){
        //ES EL PRIMER JUGADOR
        case 0:
            jugador.setearId(0);
            salallena=false;
            jugadores.push(jugador);
            var message = {accion:"conexionExitosa",resultado:"esperarOtroJugador"}
            window.connectManager.sendMessage(data.from,message)
            break;
        // ES EL SEGUNDO JUGADOR
        case 1:
            jugador.setearId(1);
            jugadores.push(jugador);
            salallena=true;
            var message = {accion:"conexionExitosa",resultado:""};
            window.connectManager.sendMessage(data.from,message);
            irSalaDeEspera();
            break;
        // SALA LLENA, NO PUEDE CONECTARSE
        case 2:
            var mensaje = {accion: "salallena",resultado: ""}
            window.connectManager.sendMessage(pcodigo,mensaje);
            break;
    }
}

function irSalaDeEspera() {
    document.body.style.backgroundImage='none';
    ctx = document.getElementById("auto").getContext("2d");

    for (i = 0; i < jugadores.length; i++) {
        jugadores[i].getImagenJugador().onload = function () {
            ctx.drawImage(chofer, 480 * (i + 1), 140);
            ctx.font = "60px Georgia";
            ctx.fillStyle = "#fff";
            ctx.fillText(jugadores[i].getNombre(), 480 * (i + 1), 500)
        };

        //BOTON INICIAR
        var iniciar = new Image();
        iniciar.src = "img/forms/iniciar.png";
        iniciar.onload = function () {
            ctx.drawImage(iniciar, 900, 550);
        };

        //BOTON OPCIONES
        var opciones = new Image();
        opciones.src = "img/forms/opciones.png";
        opciones.onload = function () {
            ctx.drawImage(opciones, 900, 600);
        };
    }
}