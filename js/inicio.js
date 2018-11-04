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
    // MAIN CTX
    var ctx = document.getElementById("auto").getContext("2d");
    ctx.font = '80px Symtext';
    ctx.fillStyle = "#fff";
    setTimeout(function(){
        ctx.fillText('ESPERANDO JUGADORES ...',460,750);
    },3000);
    //INICIA EL CONNECT SDK
    window.connectManager = new connectsdk.ConnectManager();

    window.connectManager.on("message", function(data){

        //AGREGAR NUEVO JUGADOR
        if(data.message.accion === "conectarJugador")
        {
            if(jugadores.length === 0){
                ctx.clearRect(0, 0, 1920,1080);
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
            jugadores[0].moverRecto();
            jugadores[1].moverRecto();
        }
        if(data.message.accion === "enviarAceleracion"){
            if (data.message.aceleracion === "aceleracion"){
                if(data.from.toString() === jugadores[0].getId().toString()) {
                    jugadores[0].incremento();

                }
                else{
                    jugadores[1].incremento()
                }

            }
        }
    });
    window.connectManager.init();

}