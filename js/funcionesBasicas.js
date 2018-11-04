function empezar(){
    //ctx.canvas.height = tvAncho/2;
    var jugador1 = jugadores[0];
    var jugador2 = jugadores[1];
    jugador1.setCompetidores([jugador2]);
    jugador2.setCompetidores([jugador1]);



    setTimeout(function(){

        try{
            jugador1.arrancar();
            jugador2.arrancar();
        }
        catch(e){
            ctx = document.getElementById("auto").getContext("2d");
            ctx.font = "bold 30px Symtext ";
            ctx.fillStyle = "#fff";
            ctx.fillText(e.message,800,520);
        }
        //},2000);

    },3000);
}

function dibujarChofer(indice){
    try{
        //var ctx = document.getElementById("auto").getContext("2d");
        var playerImage = jugadores[indice].getImagenJugador();
        playerImage.onload = function() {
            ctx.drawImage(playerImage, 960*indice + 250,100,320,300);
        };
        ctx.fillText(jugadores[indice].getNombre(),960*indice + 320,550);
    }
    catch(e){
        ctx.font = "bold 30px Symtext ";
        ctx.fillText(e.message,800,520);
    }

}

function irSalaDeEspera() {
    ctx = document.getElementById("auto").getContext("2d");

    dibujarChofer(jugadores.length - 1);
}

function conectarJugador(nombre,color, idJugador) {


    if(jugadores.length == 0){
        var ctx = document.getElementById("auto").getContext("2d");
        var jugador = new raceCityJugador(ctx,idJugador,nombre,color,100);
    }
    else{
        var ctx1 = document.getElementById("auto1").getContext("2d");
        var jugador = new raceCityJugador(ctx1,idJugador,nombre,color,-100);
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
            empezar();
            break;
        // SALA LLENA, NO PUEDE CONECTARSE
        case 2:
            var mensaje = {accion: "salallena",resultado: ""}
            window.connectManager.sendMessage(idJugador,mensaje);
            break;
    }
}


