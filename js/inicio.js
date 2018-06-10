//------------------------------------------------------------------------------------------
// SECCION VARIABLES GLOBALES
//------------------------------------------------------------------------------------------
//DATOS DE JUGADORES
var jugadores = new Array();


//------------------------------------------------------------------------------------------
// FIN SECCION VARIABLES GLOBALES
//------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------
// SECCION MENSAJES
//------------------------------------------------------------------------------------------

window.onload = function () {
    // SE DIBUJA LA PANTALLA DE ESPERANDO JUGADORES


    document.body.style.backgroundImage='none';
    $("body").css('background-image','url("img/esperando.png")');

    // MAIN CTX
    ctx = document.getElementById("auto").getContext("2d");
    ctx.font = '60px Symtext';
    ctx.fillStyle = "#fff";

    //INICIA EL CONNECT SDK
    window.connectManager = new connectsdk.ConnectManager();

    window.connectManager.on("message", function(data){

        //AGREGAR NUEVO JUGADOR
        if(data.message.accion === "conectarJugador")
        {
            if(jugadores.length === 0){
                $("body").css('background-image', 'url("img/fondotv.png")');
            }
            conectarJugador(data.message.nombre, data.message.color, data.from);


            // var mensaje = { action: "cargandoJuego", resultado: "" };
            // ENVIAR JSON AL JUGADOR PARA MOSTRAR UN TOAST QUE AUN NO SE HA CARGADO EL JUEGO
            // window.connectManager.sendMessage(data.from, mensaje);

        }
        if(data.message.accion === "enviarEvento")
        {
            // ctx = document.getElementById("auto").getContext("2d");


            // jugador1 = jugadores.find(function(c){return c.getId === data.from });
            // jugador1 = jugadores.find(function(c){return c.getId === data.from });

            if (data.message.direccion === "izquierda"){
                if(data.from === jugadores[0].getId()){
                    jugadores[0].moverIzquierda();

                }
                else{
                    jugadores[1].moverIzquierda();
                }
                // jugadores[0].getId() === data.from ? jugadores[0].moverIzquierda() : jugadores[1].moverIzquierda();
            }
            else {
                if (data.message.direccion === "derecha") {
                    if(data.from.toString() === jugadores[0].getId().toString()) {
                        jugadores[0].moverDerecha();

                    }
                    else{
                        jugadores[1].moverDerecha()
                    }
                    // jugadores[0].getId() === data.from ? jugadores[0].moverDerecha() : jugadores[1].moverDerecha();;


                }
            }
        }
    });
    window.connectManager.init();

}