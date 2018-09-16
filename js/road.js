 var raceCityRoadTemplate = function(){
    var curva_derecha = {
        "entrada": [],
        "centro": [],
        "salida": []
    };

    for (var i = 5; i >= 0; i--) {
        curva_derecha.entrada[i] = new Image();
        curva_derecha.entrada[i].src = "img/entrada_curva_der/entrandoalacurva"+ String(i+1)+".png";

        curva_derecha.centro[i] = new Image();
        curva_derecha.centro[i].src = "img/curva_der/Curvamovimiento"+ String(i+1)+".png";

        curva_derecha.salida[i] = new Image();
        curva_derecha.salida[i].src = "img/salida_curva_der/saliendodelacurva"+ String(i+1)+".png";
    }

    var curva_izquierda = {
        "entrada": [],
        "centro": [],
        "salida": []
    };

    for (var i = 5; i >= 0; i--) {
        curva_izquierda.entrada[i] = new Image();
	    curva_izquierda.entrada[i].src = "img/entrada_curva_izq/entrandoalacurva"+ String(i+1)+".png";;

        curva_izquierda.centro[i] = new Image();
	    curva_izquierda.centro[i].src = "img/curva_izq/Curvamovimiento"+ String(i+1)+".png";

        curva_izquierda.salida[i] = new Image();
	    curva_izquierda.salida[i].src = "img/salida_curva_izq/saliendodelacurva"+ String(i+1)+".png";
    }

    var pista_recta = {
        "entrada": [],
        "centro": [],
        "salida": []
    };

    for (var i = 5; i >= 0; i--) {
        pista_recta.centro[i] = new Image();
        pista_recta.centro[i].src = "img/pista_recta/pista"+ String(i+1)+".png";
    }

    var pista_cerrar = {
        "entrada": [],
        "centro": [],
        "salida": []
    };

    for (var i = 8; i >= 0; i--) {
        pista_cerrar.centro[i] = new Image();
        pista_cerrar.centro[i].src = "img/meta/meta_"+ String(i+1)+".png";
    }

    var fondo = new Image();
    fondo.src = "img/Fondo-prueba.png";

    return {
        fondo:fondo,
        curva_derecha: curva_derecha,
        curva_izquierda: curva_izquierda,
        pista_recta: pista_recta,
        pista_cerrar: pista_cerrar
    }
}();

var ruta_completa = [["R",200],["C",1]];

var longitud_total = 0 
for(var n=0; n< ruta_completa.length; n++) {
    if (ruta_completa[n][0] === "R"){
        longitud_total += ruta_completa[n][1]*6
    }
    if ((ruta_completa[n][0] === "D") || (ruta_completa[n][0] === "I")){
        longitud_total += ruta_completa[n][1]*18
    }
}

var longitud_objetos = Math.trunc(longitud_total/100);
var ubicacion_objetos = [];

for(var m=0; m< longitud_objetos; m++) {
    ubicacion_objetos.push(Math.trunc(Math.random() * (longitud_total)));
}

ubicacion_objetos.sort(function(a,b){return a-b});

var current_hongo = ubicacion_objetos[0]


var raceCityRoad = function(ruta_completa) {
    // ruta_completa = [["R",10],["D",10], ["R",10],["I",10]]
    var indice_derecha = "D";
    var indice_derecha_entrada = "De";
    var indice_derecha_salida = "Ds";
    var indice_izquierda = "I";
    var indice_izquierda_entrada = "Ie";
    var indice_izquierda_salida = "Is";
    var indice_recto = "R";
    var indice_cerrar = "C";
    var pista_total = [];

    for(var i=0; i< ruta_completa.length; i++) {
        if (ruta_completa[i][0] === indice_cerrar){
            console.log('cerrrar');
            for(var j=0; j<raceCityRoadTemplate.pista_cerrar.length; j++) {
                pista_total.push([ruta_completa[i][0], j]);
            }
            //break;
        }

        // frames de entrada
        if (ruta_completa[i][0] === indice_derecha || ruta_completa[i][0] === indice_izquierda){
            var indice = ruta_completa[i][0] + 'e';

            for(var j=0; j<6; j++){
                pista_total.push([indice, j])
            }
        }

        //repetir la ruta por cada ciclo
        var ciclos = ruta_completa[i][1]
        for(var j=0; j<ciclos; j++){
            var seccion_pista = [];
            switch (ruta_completa[i][0]){
                case indice_derecha:
                    seccion_pista = raceCityRoadTemplate.curva_derecha.centro;
                    break;
                case indice_izquierda:
                    seccion_pista = raceCityRoadTemplate.curva_izquierda.centro;
                    break;
                case indice_recto:
                    seccion_pista = raceCityRoadTemplate.pista_recta.centro;
                    break;
                case indice_cerrar:
                    seccion_pista = raceCityRoadTemplate.pista_cerrar.centro;
                    break;
            }

            for(var k=0; k<seccion_pista.length; k++){
                pista_total.push([ruta_completa[i][0], k])
            }
            
        }

        // frames de salida
        if (ruta_completa[i][0] === indice_derecha || ruta_completa[i][0] === indice_izquierda){
            var indice = ruta_completa[i][0] + 's';

            for(var j=0; j<6; j++){
                pista_total.push([indice, j])
            }
        }
    }

    var obtener_imagen = function(indice){
        if (indice >= pista_total.length){
            indice = pista_total.length - 1;
        }
        var tipo_pista_actual = pista_total[indice][0];
        var frame_actual = pista_total[indice][1];

        var indices = tipo_pista_actual.split('');
        var pista_actual = undefined;

        if (indices[0] === indice_derecha) {
            pista_actual = raceCityRoadTemplate.curva_derecha
        } else if (indices[0] === indice_izquierda) {
            pista_actual = raceCityRoadTemplate.curva_izquierda
        } else if (indices[0] === indice_recto) {
            pista_actual = raceCityRoadTemplate.pista_recta
        } else if (indices[0] === indice_cerrar) {
            pista_actual = raceCityRoadTemplate.pista_cerrar
        }

        if(indices.length === 2){
            if(indices[1] === "e"){
                return pista_actual.entrada[frame_actual]
            } else {
                return pista_actual.salida[frame_actual]
            }
        }
        return pista_actual.centro[frame_actual]
    };


    return {
        obtener_imagen: obtener_imagen,
        pista_total: pista_total
    }
}(ruta_completa);
