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

    var objetoVisibilidad=true;
    var objetoVisibilidad2=true;

    var setCompetidores = function(list){
        competidores = list
    };

    var arrancar = function() {
        if (!arranco){
            arranco = true;
            //acelerar();
            jugar();
            if (!estaAcelerando){
                estaAcelerando = true;
            }

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
        ctx.drawImage(car, 960+posicionX-largo/2 ,pista.height/2+150, largo, ancho);
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

        if (carY < 540) //solo cuando este dentro de la cancha
        {
            contexto.drawImage(car, carX, carY, largo, ancho);
        }

    };

    var colisionObjetos = function (indice, x , y, size) {

        var car = imagenCarro(indice);
        var largo = car.width*carScale;
        var pista = raceCityRoad.obtener_imagen(indice);

        console.log('posicion x: '+(960+posicionX-largo/2)+'- '+x);
        //console.log('posicion y: '+(pista.height/2+150)+'- '+y);

        var diferenciaX = Math.abs((960+posicionX-largo/2) - x);
        var diferenciaXCompetidor = Math.abs((960+competidor[0].getPosicionX()-largo/2) - x);
        var diferenciaY = Math.abs((pista.height/2+150) - y);
        console.log('diferencia x '+ diferenciaX+', size'+size);


        if(diferenciaX <= size && diferenciaY <= size && diferenciaX <= largo && diferenciaY <= size){
            ctx.font = "bold 30px sans-serif";
            ctx.fillText("+1",1600,50);
            objetoVisibilidad = false;
            competidores[0].serObjetoVisibilidad(false);
        }
    };

    var dibujarObstaculos = function(progreso){
        //ruta_completa = [["R",100],["D",10],["R",10],["I",10]]
        //Recto = progreso 19 - 599
        //Derecha = progreso 
        //Recto = progreso
        //Izquierda = progreso
        var obs = new Image();
        obs.src = "img/seta.png";
        estadoActual = raceCityRoad.pista_total[progreso][0].split("")[0];
        /*var aleatorio = Math.floor(Math.random() * (10 - 1)) + 1;
            if(aleatorio == 2){
                ctx.drawImage(obs,0,300, 100, 100);
            }*/
        if (estadoActual === "R"){
            //console.log("R: "+progreso);


            if(progreso >= 21 && progreso <= 30 && objetoVisibilidad){
                ctx.drawImage(obs,tvLargo/2,207, 20, 20);

            }else if(progreso >= 31 && progreso <=40 && objetoVisibilidad){
                ctx.drawImage(obs,tvLargo/2,227, 30, 30);

            }else if(progreso >= 41 && progreso <= 50 && objetoVisibilidad){
                ctx.drawImage(obs,tvLargo/2,247, 40, 40);


            }else if(progreso >= 51 && progreso <= 60 && objetoVisibilidad){
                ctx.drawImage(obs,tvLargo/2,267, 50, 50);
                colisionObjetos(progreso, tvLargo/2, 267, 38.5);

            }else if(progreso >= 61 && progreso <= 70 && objetoVisibilidad){
                ctx.drawImage(obs,tvLargo/2,287, 60, 60);
                colisionObjetos(progreso, tvLargo/2, 287, 58.5);

            }else if(progreso >= 71 && progreso <= 80 && objetoVisibilidad ){
                ctx.drawImage(obs,tvLargo/2,307, 70, 70);
                colisionObjetos(progreso, tvLargo/2, 307, 70);

            }else if(progreso >= 81 && progreso <= 90 && objetoVisibilidad){
                ctx.drawImage(obs,tvLargo/2,327, 80, 80);

            }else if(progreso >= 91 && progreso <= 100 && objetoVisibilidad){
                ctx.drawImage(obs,tvLargo/2,347, 90, 90);

            }else if(progreso >= 101 && progreso <= 110 && objetoVisibilidad){
                ctx.drawImage(obs,tvLargo/2,367, 100, 100);

            }else if(progreso >= 111 && progreso <= 120 && objetoVisibilidad){
                ctx.drawImage(obs,tvLargo/2,387, 110, 110);

            }else if(progreso >= 121 && progreso <= 130 && objetoVisibilidad){
                ctx.drawImage(obs,tvLargo/2,407, 120, 120);
            }

        }else if(estadoActual === "D"){
            //console.log("D: "+progreso);

            if(progreso >= 600 && progreso <= 610 && objetoVisibilidad2){
                ctx.drawImage(obs,(tvLargo/2)+200,207, 20, 20);

            }else if(progreso >= 611 && progreso <= 620 && objetoVisibilidad2){
                ctx.drawImage(obs,(tvLargo/2)+170,227, 30, 30);

            }else if(progreso >= 621 && progreso <= 630 && objetoVisibilidad2){
                ctx.drawImage(obs,(tvLargo/2)+140,247, 40, 40);
                //colisionObjetos(progreso, (tvLargo/2)+340 , 247, 38.5);

            }else if(progreso >= 631 && progreso <= 640 && objetoVisibilidad2){
                ctx.drawImage(obs,(tvLargo/2)+110,267, 50, 50);
            }else if(progreso >= 641 && progreso <= 650 && objetoVisibilidad2){
                ctx.drawImage(obs,(tvLargo/2)+140,287, 60, 60);
            }else if(progreso >= 651 && progreso <= 660 && objetoVisibilidad2){
                ctx.drawImage(obs,(tvLargo/2)+170,307, 70, 70);
            }else if(progreso >= 661 && progreso <= 670 && objetoVisibilidad2){
                ctx.drawImage(obs,(tvLargo/2)+200,327, 80, 80);
            }else if(progreso >= 671 && progreso <= 680 && objetoVisibilidad2){
                ctx.drawImage(obs,(tvLargo/2)+230,347, 90, 90);
            }


        }else if(estadoActual === "I"){
            //console.log("I: "+progreso);
            ctx.drawImage(obs,(tvLargo/2)-400,207, 20, 20);

        }
    };

    //indice: posicion de la imagen de la pista
    var dibujar = function(indice) {
        var fondo = raceCityRoadTemplate.fondo;
        // renderizo el fondo
        // TODO: calcular segun la curva
        ctx.drawImage(fondo,0,0,tvLargo,216);

        // renderizo la pista actual
        var pista = raceCityRoad.obtener_imagen(indice);
        ctx.drawImage(pista,0,217,tvLargo,(tvAncho/2)-217);

        dibujarObstaculos(indice);

        // renderizo el carro
        if (progreso < competidores[0].getPosicionY()){
            dibujarCarro(indice, pista);
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

        for (var i=0; i<competidores.length; i++){
            var diferenciaX = Math.abs(posicionX - competidores[i].getPosicionX());
            var diferenciaY =  Math.abs(progreso - competidores[i].getPosicionY());
            
            if(diferenciaX < minDistanciaChoqueX &&
                diferenciaY < minDistanciaChoqueY) {
                snd.play();

                if(progreso<=distanciaRebote){
                    progreso = distanciaRebote +1;
                }
                progreso -= distanciaRebote;
                posicionX -= 50;
                competidores[i].setPosicionX(competidores[i].getPosicionX() + 50);

                competidores[i].moverDerecha();
            }
        }
    };

    var jugar = function() {
        document.body.style.backgroundImage='none';
        // logica de la pista
        logicaDePista();

        dibujar(progreso);

        progreso++;
        ctx.font = "bold 30px sans-serif";
        ctx.fillText("Velocidad Actual: "+velocidadActual,50,50);
        if(progreso >= raceCityRoad.pista_total.length ){
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

    var setObjetoVisibilidad = function(valor){
        objetoVisibilidad = valor;
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
        getId: getId,
        serObjetoVisibilidad:setObjetoVisibilidad
    }
};
