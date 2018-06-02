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
    $("body").css('background-image','url("img/Splash.png")');

    //INICIA EL CONNECT SDK
    window.connectManager = new connectsdk.ConnectManager();

    window.connectManager.on("message", function(data){

        //AGREGAR NUEVO JUGADOR
        if(data.message.accion === "conectarJugador")
        {
            $("body").css('background-image', 'url("img/fondotv.png")');
            conectarJugador(data.message.nombre, data.message.color, data.from);


            // var mensaje = { action: "cargandoJuego", resultado: "" };
            // ENVIAR JSON AL JUGADOR PARA MOSTRAR UN TOAST QUE AUN NO SE HA CARGADO EL JUEGO
            // window.connectManager.sendMessage(data.from, mensaje);

        }
    });
    window.connectManager.init();

}