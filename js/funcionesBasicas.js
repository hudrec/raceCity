function empezar(){
    
    //document.getElementById("auto").style.height = "540px";
    ctx = document.getElementById("auto").getContext("2d");
    ctx1 = document.getElementById("auto1").getContext("2d");
    
    //context.clearRect(0, 0, canvas.width, canvas.height);
    var jugador1 = jugadores[0];
    var jugador2 = jugadores[1];
    jugador1.setCompetidores([jugador2]);
    jugador2.setCompetidores([jugador1]);
    
        
        
    setTimeout(function(){
        ctx.clearRect(0, 0, 1920, 1080);
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
    //ctx = document.getElementById("auto").getContext("2d");

    var playerImage = jugadores[indice].getImagenJugador();
    playerImage.onload = function() {
        ctx.drawImage(playerImage, 960*indice + 250,40,320,300);
    };

    ctx.fillText(jugadores[indice].getNombre(),960*indice + 320,500);

}

function irSalaDeEspera() {
    ctx = document.getElementById("auto").getContext("2d");
    dibujarChofer(jugadores.length - 1);

    if(jugadores.length<2){
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
    ctx = document.getElementById("auto").getContext("2d");
    ctx.font = '60px Symtext';
    ctx.fillStyle = "#fff";
    ctx1 = document.getElementById("auto1").getContext("2d");
    if(jugadores.length == 0){
        var jugador = new raceCityJugador(ctx,idJugador,nombre,color,100);
    }
    else{
        var jugador = new raceCityJugador(ctx1,idJugador,nombre,color,-100);
    }
    
    //jugador.setearColor(color);

    switch (jugadores.length){
        //ES EL PRIMER JUGADOR
        case 0:
            // salallena=false;
            jugadores.push(jugador);
            //var message = {accion:"conexionExitosa",resultado:"esperarOtroJugador"}
            //window.connectManager.sendMessage(data.from,message)
            irSalaDeEspera();
            
            break;
        // ES EL SEGUNDO JUGADOR
        case 1:
            jugadores.push(jugador);
            // salallena=true;
            //var message = {accion:"conexionExitosa",resultado:""};
            //window.connectManager.sendMessage(data.from,message);
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


