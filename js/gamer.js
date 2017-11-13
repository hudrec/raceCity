var raceCityCarImages = function(){
    var moverIzquierda = [];
    for (var i = 3; i >= 0; i--) {
        moverIzquierda[i] = new Image();
        moverIzquierda[i].src = "img/cars_izq/auto_iz"+ String(i+1)+".png";
    }

    var moverDerecha = [];
    for (var i = 3; i >= 0; i--) {
        moverDerecha[i] = new Image();
        moverDerecha[i].src = "img/cars_der/auto_de"+ String(i+1)+".png";
    }

    var autoRecto = [];
    autoRecto[0] = new Image();
    autoRecto[0].src = "img/Auto-1.png";
    autoRecto[1] = new Image();
    autoRecto[1].src = "img/Auto-2.png";


    return {
        autoRecto: autoRecto,
        moverIzquierda: moverIzquierda,
        moverDerecha: moverDerecha
    }
}();

var raceCityJugador = function(ctx, nombre, color, competidores){
    var ctx = ctx;

    var progreso = 0;
    var posicionX = 0;
    var posicionY;

    var indiceGiro = 0; //cambia de frame cuando gira (de 0 a 3)
    var giro = ""; // "derecha" / "izquierda"

    var carScale=0.7

    //manejo de la aceleracion
    var velocidadActual = 0;
    var velocidadMaxima = 100;
    var velocidadIncremento = 10;
    var estaAcelerando = true;

    // limites de la pista
    var maximoDerecha = 400;
    var maximoIzquierda = -400;
    // bordes de desaceleracion
    var desaceleraDerecha = 300;
    var desaceleraIzquierda = -300;
    var constanteMovimiento = 8; //jala x numero cuando entra a la curva
    var constanteManejo = 8; //jala x numero cuando entra a la curva

    var moverDerecha = function() {
    }
    var moverIzquierda = function() {
    }

    var imagenCarro = function(indice) {
        if(giro == ""){
            return raceCityCarImages.autoRecto[indice % 2];
        }
    }

    var dibujarCarro = function(indice, pista){
        var car = imagenCarro(indice);
        var largo = car.width*carScale;
        var ancho = car.height*carScale;

        ctx.drawImage(car, window.innerWidth/2+posicionX-largo/2 ,pista.height/2+150, largo, ancho);
    }

    var dibujar = function(indice) {
        var fondo = raceCityRoadTemplate.fondo;
        // renderiso el fondo
        // TODO: calcular segun la curva
        ctx.drawImage(fondo,0,0,fondo.width,fondo.height,0,0,fondo.width,window.innerHeight/5);

        // renderiso la pista actual
        var pista = raceCityRoad.obtener_imagen(indice);
        ctx.drawImage(pista,0,0,pista.width,pista.height,0,window.innerHeight/5,window.innerWidth,window.innerHeight/2-220);

        // renderiso el carro
        dibujarCarro(indice, pista);
    }

    var logicaDePista = function() {
        estadoActual = raceCityRoad.pista_total[progreso][0].split("")[0];

        // jala el carro en las curvas
        if (estadoActual === "D"){
            if ((posicionX<=maximoDerecha) && (posicionX>maximoIzquierda))
                posicionX -= constanteMovimiento;

        } else if (estadoActual === "I"){
            if ((posicionX<maximoDerecha) && (posicionX>=maximoIzquierda))
                posicionX += constanteMovimiento;
        }

        if ((posicionX>desaceleraDerecha) || (posicionX<desaceleraIzquierda)){
            estaAcelerando = false;
        }

    }

    var jugar = function() {
        // logica de la pista
        logicaDePista()

        dibujar(progreso)

        progreso++;
        if(progreso >= raceCityRoad.pista_total.length){
            // termino!!
            return;
        }

        //aceleracion
        if(estaAcelerando && velocidadActual < velocidadMaxima){
            velocidadActual += velocidadIncremento;
        } else if(!estaAcelerando && velocidadActual > 0){
            velocidadActual -= velocidadIncremento;
        }

        if (velocidadActual > 0){
            setTimeout(jugar, 130 - velocidadActual);
        }
    }

    return {
        dibujar: dibujar,
        jugar: jugar
    }
}
