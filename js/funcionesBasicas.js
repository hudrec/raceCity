function empezar(){
    ctx.canvas.height = tvAncho/2;
    //document.getElementById("auto").style.height = "540px";
    // ctx = document.getElementById("auto").getContext("2d");
    //context.clearRect(0, 0, canvas.width, canvas.height);
    var jugador1 = jugadores[0];
    var jugador2 = jugadores[1];
    jugador1.setCompetidores([jugador2]);
    jugador2.setCompetidores([jugador1]);
    
        
        
    setTimeout(function(){
        ctx.clearRect(0, 0, tvLargo,tvAncho/2);
        //jugador1.dibujar(0);
        jugador1.jugar();
        jugador2.jugar();
        setTimeout(function(){
            jugador1.arrancar();
            jugador2.arrancar();
        },2000);
    },2000);

    //jugador2.arrancar();
    
    

    //correr(jugadore[1]);
}

function dibujarChofer(indice){
    // ctx.fillText('dibujar jugador',320,500);
    var playerImage = jugadores[indice].getImagenJugador();
    playerImage.onload = function() {
        // ctx.fillText('load imagen',320,400);
        ctx.drawImage(playerImage, 960*indice + 250,40,320,300);
    };
    ctx.fillText(jugadores[indice].getNombre(),960*indice + 320,500);
    // ctx.fillText(ctx.canvas.height + ' - ' + ctx.canvas.width,960*indice + 320,500);

}

function irSalaDeEspera() {
    var ctx = document.getElementById("auto").getContext("2d");
    dibujarChofer(jugadores.length - 1);

    if(jugadores.length > 1){
        //BOTON INICIAR
        var iniciar = new Image();
        iniciar.src = "img/forms/iniciar.png";
        iniciar.onload = function () {
            ctx.drawImage(iniciar, 720, 710,480,100);
        };
    
        //BOTON OPCIONES
        var opciones = new Image();
        opciones.src = "img/forms/opciones.png";
        opciones.onload = function () {
            ctx.drawImage(opciones, 720, 850,480,100);
        };
    }
    
}

function conectarJugador(nombre,color, idJugador) {
    var ctx = document.getElementById("auto").getContext("2d");
    var ctx1 = document.getElementById("auto1").getContext("2d");
    var jugador = null;
    if(jugadores.length == 0){
        try {
            jugador = raceCityJugador(ctx, idJugador, nombre, color, 100);
        }
        catch (e) {
            ctx.fillText(e.message,320,600);

        }
    }
    else{
        try {
            jugador = raceCityJugador(ctx1, idJugador, nombre, color, 100);
        }
        catch (e) {
            ctx.fillText(e.message,520,600);

        }

    }
    

    switch (jugadores.length){
        //ES EL PRIMER JUGADOR
        case 0:
            jugadores.push(jugador);
            irSalaDeEspera();
            break;
        // ES EL SEGUNDO JUGADOR
        case 1:
            jugadores.push(jugador);
            irSalaDeEspera();
            //empezar();
            break;
        // SALA LLENA, NO PUEDE CONECTARSE
        case 2:
            var mensaje = {accion: "salallena",resultado: ""}
            window.connectManager.sendMessage(idJugador,mensaje);
            break;
    }
}


