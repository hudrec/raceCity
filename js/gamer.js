var tvLargo = 1920;
var tvAncho = 1080;
var snd = new Audio("sound.mp3");

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

//NOMBRE COLOR
var raceCityJugador = function(ctx,idJugador,nombre, jcolor, initialPos){
    var color = jcolor;
    var id = idJugador;
    var progreso = 20;
    var posicionX = 0;
    if (initialPos) {
        posicionX = initialPos;
    }

    var carroimg = new Image();
    var jugadorimg = new Image();
    jugadorimg.src="img/choferes/jugador_"+color+".png";

    var indiceGiro = 0; //cambia de frame cuando gira (de 0 a 3)
    var giro = ""; // "derecha" / "izquierda"

    var carScale=0.7;

    //manejo de la aceleracion
    var velocidadActual = 0;
    var velocidadMinima = 20;
    var velocidadMaxima = 100;
    var velocidadIncremento = 10;
    var arranco = false;
    var estaAcelerando = false;

    //manejo de choques y colisiones
    var contadorChoque = 0;
    var penalidadChoque = 10; // nro turnos desacelerado
    var distanciaRebote = 6;
    var minDistanciaChoqueX = 130; //100
    var minDistanciaChoqueY = 6.5; //-3

    // limites de la pista
    var maximoDerecha = 400;
    var maximoIzquierda = -400;
    // bordes de desaceleracion
    var desaceleraDerecha = 300;
    var desaceleraIzquierda = -300;
    var constanteMovimiento = 8; //jala x numero cuando entra a la curva
    var constanteManejo = 8; //jala x numero cuando entra a la curva

    // competidores
    var competidores = [];

    var setCompetidores = function(list){
        competidores = list
    };

    var arrancar = function() {
        if (!arranco){
            arranco = true;
            //acelerar();
            jugar();
        }else{
            progreso += 1;
        }
    };

    var acelerar = function() {
        if (!estaAcelerando){
            estaAcelerando = true;
            jugar();
        }
    };

    var moverRecto = function() {
        giro="";
    };

    var moverDerecha = function() {
        if (arranco && (posicionX<maximoDerecha) && (posicionX>=maximoIzquierda-50)){
            posicionX += constanteMovimiento * 2.5;
            giro="derecha";
        }
    };

    var moverIzquierda = function() {
        if (arranco && (posicionX<=maximoDerecha+50) && (posicionX>maximoIzquierda)){
            posicionX -= constanteMovimiento * 2.5;
            giro="izquierda";
        }
    };

    var useKeyboard = function(){
        var _this = this;
        document.addEventListener('keydown', function(evt){
            var tecla = evt.which;
            switch (tecla){
                case 38:
                    arrancar();
                    break;
                case 37:
                    moverIzquierda();
                    break;
                case 39:
                    moverDerecha();
                    break;
            }
        });

        document.addEventListener('keyup', function(evt){
            var tecla = evt.which;
            switch (tecla){
                case 38:
                    arrancar();
                    break;
                case 37:
                case 39:
                    moverRecto();
                    break;
            }
        });
    };

    var useAlternateKeyboard = function(){
        var _this = this;
        document.addEventListener('keydown', function(evt){
            var tecla = evt.which;
            switch (tecla){
                case 87:
                    arrancar();
                    break;
                case 65:
                    moverIzquierda();
                    break;
                case 68:
                    moverDerecha();
                    break;
            }
        });

        document.addEventListener('keyup', function(evt){
            var tecla = evt.which;
            switch (tecla){
                case 87:
                    arrancar();
                    break;
                case 65:
                case 68:
                    moverRecto();
                    break;
            }
        });
    };

    var imagenCarro = function(indice) {
        var ciclosPorEtapa = 2;
        var result;
        var realIndex;
        if(giro == ""){
            if (indiceGiro < 0){
                indiceGiro++;
            } else if(indiceGiro > 0){
                indiceGiro--;
            }
        } else if(giro == "derecha"){
            if (indiceGiro < 0 || Math.abs(indiceGiro)  <= raceCityCarImages.moverDerecha.length){
                indiceGiro++;
            }
        } else if(giro == "izquierda"){
            if (indiceGiro > 0 || Math.abs(indiceGiro)  <= raceCityCarImages.moverIzquierda.length){
                indiceGiro--;
            }
        }

        if (indiceGiro > 0){
            realIndex = Math.ceil(indiceGiro/ciclosPorEtapa) + (indice % 2) - 1;
            result = raceCityCarImages.moverDerecha[realIndex];
        } else if(indiceGiro < 0){
            realIndex = Math.ceil(Math.abs(indiceGiro)/ciclosPorEtapa) + (indice % 2) - 1;
            result = raceCityCarImages.moverIzquierda[realIndex];
        } else {
            result =  raceCityCarImages.autoRecto[indice % 2];
        }
        return result;
    };

    var dibujarCarro = function(indice, pista){
        var car = imagenCarro(indice);
        var largo = car.width*carScale;
        var ancho = car.height*carScale;
        //console.log("pista height: "+(pista.height/2+150));
        //console.log("x : "+(960+posicionX-largo/2));
        //console.log("largo: "+largo);
        //console.log("ancho: "+ancho);
        let carPosX = 960+posicionX-largo/2;
        let carPosY = pista.height/2+150;
        if (carPosY < 541){
            ctx.drawImage(car, 960+posicionX-largo/2 ,pista.height/2+150, largo, ancho);
        }

        
    };

    var dibujarComoCompetidor = function(contexto, pos){
        var escala = carScale;

        var distancia = progreso - pos;

        var aumentoY = 0;

        if(Math.abs(distancia) > 15)
            return;

        if(distancia < 0){
            //escala maxima = 3;
            escala += Math.abs(distancia) * 0.1533;
            aumentoY = distancia * 10 * -1;
        } else if (distancia > 0){
            //escala = 0.3;
            escala -= distancia * 0.02667;
            aumentoY = distancia * 3.333 * -1;
        }
        //calculo mi posicion relativa
        var car = imagenCarro(progreso);

        //calcular en base a la diferencia
        var largo = car.width * escala;
        var ancho = car.height * escala;

        var pista = raceCityRoad.obtener_imagen(progreso);
        var carX = 960 + posicionX - largo/2;
        var carY = (pista.height/2) + 150 + aumentoY;

        if (carY < 280) //solo cuando este dentro de la cancha
        {
            console.log(carY);
            contexto.drawImage(car, carX, carY, largo, ancho);
        }

    }

    //indice: posicion de la imagen de la pista
    var dibujar = function(indice) {
        var fondo = raceCityRoadTemplate.fondo;
        // renderizo el fondo
        // TODO: calcular segun la curva
        ctx.drawImage(fondo,0,0,tvLargo,216);

        // renderizo la pista actual
        var pista = raceCityRoad.obtener_imagen(indice);
        ctx.drawImage(pista,0,217,tvLargo,(tvAncho/2)-217);
        ctx.font = "50px Arial";
        var mapaDistancia = raceCityRoad.pista_total.length - progreso ;
        ctx.fillText('DISTANCIA: '+ mapaDistancia,70,280);
        ctx.fillText('VELOCIDAD: '+ velocidadActual,70,370);
        
        /*var obs = new Image();
        obs.src = "img/seta.png";
        var aleatorio = Math.floor(Math.random() * (10 - 1)) + 1;
        if(aleatorio == 2){
            ctx.drawImage(obs,0,300, 100, 100);
        }*/

        // renderizo el carro
        if (progreso < competidores[0].getPosicionY()){
            console.log('indice',indice);
            dibujarCarro(indice, pista);
            if (mapaDistancia == 1){
                //DIBUJAR EL CARRO SALIENDO DE LA PISTA
            }

        }
        // renderizo a la competencia
        for (var i=0; i<competidores.length; i++){
            competidores[i].dibujarComoCompetidor(ctx, indice);
        }
        if (progreso >= competidores[0].getPosicionY()){
            dibujarCarro(indice, pista);
        }
    };

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
        } else if (arranco){
            estaAcelerando = true;
        } else {
            estaAcelerando = false;
        }

    };

    var calcularColision = function() {
        /*if (contadorChoque > 0) {
            estaAcelerando = false;
            contadorChoque--;
            return;
        }*/

        for (var i=0; i<competidores.length; i++){
            var diferenciaX = Math.abs(posicionX - competidores[i].getPosicionX());
            var diferenciaY =  Math.abs(progreso - competidores[i].getPosicionY());
            //colisión lateral
            if(diferenciaX < minDistanciaChoqueX &&
                diferenciaY < minDistanciaChoqueY) {
                snd.play();

                contadorChoque = penalidadChoque;
                console.log(progreso);
                /*if(progreso<=distanciaRebote){
                    progreso = distanciaRebote +1;
                }*/
                //progreso -= distanciaRebote;
                posicionX -= 50;
                competidores[i].setPosicionX(competidores[i].getPosicionX() + 50);

                //competidores[i].moverDerecha();
            }
        }
    };

    var jugar = function() {
        document.body.style.backgroundImage='none';
        // logica de la pista
        logicaDePista();

        dibujar(progreso);

        progreso++;
        if(progreso >= raceCityRoad.pista_total.length){
            // termino!!
            return;
        }

        //aceleracion
        if(estaAcelerando && velocidadActual < velocidadMaxima){
            velocidadActual += velocidadIncremento;
        } else if(!estaAcelerando && velocidadActual > velocidadMinima){
            velocidadActual -= velocidadIncremento;
        }

        if (velocidadActual > 0){
            setTimeout(jugar, 130 - velocidadActual);
        }
        calcularColision();
    };

    var getPosicionX = function() {
        return posicionX;
    };

    var getPosicionY = function() {
        return progreso;
    };

    var setPosicionX = function(posicion) {
        posicionX = posicion;
    }

    //ESCOGER CARRO

    var setearCarroImagen = function () {
        carroimg.src="img/autos/auto_"+color+".png";
        jugadorimg.src="img/choferes/jugador_"+color+".png";
    };

    //NUEVOS
    var setearColor = function (_color) {
        color = _color;
        setearCarroImagen();
    };

    var setearNombre = function (_nombre) {
        nombre=_nombre;
    };

    var setearContexto = function (_contexto) {
        ctx = _contexto;
    };

    var setearId = function (_id) {
        id=_id;
    };

    var getImagenJugador = function () {
        return jugadorimg;
    };

    var getNombre = function () {
        return nombre;
    };
    var getId = function () {
        return id;
    };

    return {
        dibujar: dibujar,
        dibujarComoCompetidor: dibujarComoCompetidor,
        jugar: jugar,
        moverIzquierda: moverIzquierda,
        moverDerecha: moverDerecha,

        arrancar: arrancar,
        useKeyboard: useKeyboard,
        useAlternateKeyboard: useAlternateKeyboard,
        setCompetidores: setCompetidores,
        getPosicionX: getPosicionX,
        getPosicionY: getPosicionY,
        setPosicionX: setPosicionX,
        //NUEVOS
        setearColor: setearColor,
        setearNombre: setearNombre,
        setearContexto: setearContexto,
        setearId: setearId,
        getImagenJugador: getImagenJugador,
        getNombre: getNombre,
        getId: getId
    }
};
