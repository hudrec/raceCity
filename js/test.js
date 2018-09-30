

//CUANDO JUEGAN
function init(){
    setTimeout(function(){
        document.body.style.backgroundImage='none';
        $("body").css('background-image','url("img/Splash.png")');

        // $('#auto')[0].width = window.innerWidth;
        // $('#auto')[0].height = window.innerHeight/2;
        ctx = document.getElementById("auto").getContext("2d");
        //
        // $('#auto1')[0].width = window.innerWidth;
        // $('#auto1')[0].height = window.innerHeight/2;
        ctx1 = document.getElementById("auto1").getContext("2d");

        var nuevoJugador1 = raceCityJugador(ctx,1, "Hugo", "azul", -150);
        var nuevoJugador2 = raceCityJugador(ctx1,2, "Hernan", "rojo", 150);
        nuevoJugador1.setCompetidores([nuevoJugador2]);
        nuevoJugador2.setCompetidores([nuevoJugador1]);

        nuevoJugador1.dibujar(19);
        nuevoJugador2.dibujar(20);

        nuevoJugador1.useAlternateKeyboard();
        nuevoJugador1.jugar();

        nuevoJugador2.useKeyboard();
        nuevoJugador2.jugar();



        //correr(ctx,jugador1);
        //correr(ctx1,jugador2);
    },3000)
}