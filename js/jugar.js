/**
 * Created by hudrec on 10/8/17.
 */
function correr(contexto,jugador){
    tramo = rutas[jugador.indice] ;
    const data_count = {count:jugador.count};
    if (tramo[0] == "R"){
        pista = render_images(pistas_rectas,data_count);
        jugador.count = data_count.count;
        //if (ruta > limite){
        if (jugador.ruta >= tramo[1]*5){
            jugador.ruta = 0;
            jugador.count = 0;
            jugador.indice++;
        }
    }
    else {
        if (tramo[0] == "C"){
            pista = render_meta(meta,data_count);
            jugador.count = data_count.count;
            //if (jugador.ruta >= limite){
            if (jugador.ruta >= tramo[1]*9){
                jugador.ruta = 0;
                jugador.count = 0;
                jugador.indice++;
            }

        }
        else{
            //limite = (6*speed)*(tramo[1]+2);
            if (tramo[0] == "D"){
                const x = 7*jugador.ruta;
                entrada = entrada_curva_der;
                curva = curva_der;
                salida = salida_curva_der;
                if ((mod<280) && (mod>-280)) mod -= 2;
                else FPS = 20;
                contexto.drawImage(fondo,x,0,fondo.width,fondo.height,0,0,fondo.width,window.innerHeight/5);
            }
            else{
                // contexto.drawImage(fondo,pista.width-jugador.ruta,0,fondo.width,fondo.height,0,0,fondo.width,fondo.height);
                entrada = entrada_curva_izq;
                curva = curva_izq;
                salida = salida_curva_izq;
                if ((mod<180) && (mod>-180)) mod += 2;
                else speed = 8;
            }
            if (jugador.ruta < 6)	{
                pista = render_images(entrada,data_count);
            }
            if ((jugador.ruta >= 6) && (jugador.ruta < (6*(tramo[1]+1)))){
                pista = render_images(curva,data_count);
            }
            if (jugador.ruta >= 6*(tramo[1]+1)){
                pista = render_images(salida,data_count);

            }
            jugador.count = data_count.count;
            //if (jugador.ruta >= limite){
            if ((jugador.ruta+1) == ((tramo[1]+2)*6)){
                jugador.ruta = 0;
                jugador.count = 0;
                jugador.indice++;
            }
        }
    }

    if (jugador.indice == rutas.length){
        //cancelAnimationFrame(req_id);
        //requestAnimationFrame(terminar);
        return
    }
    //dibuja la pista
    contexto.drawImage(pista,0,0,pista.width,pista.height,0,window.innerHeight/5,window.innerWidth,window.innerHeight/2-220);
    jugador.count++;
    jugador.ruta++;
    //contexto.drawImage(auto1,pista1.width/2 + mod-buffer.width/2,pista1.height-buffer.height,auto1.width*scale,auto1.height*scale);
    largo = auto1.width*scale;
    ancho = auto1.height*scale;

    if (left){

        car = render_car(cars_izq, "I");
        alert(car);
    }
    else{
        if (right) car = render_car(cars_der, "D");
        else {
            if (jugador.ruta & speed) car = auto1;
            else car = auto2;
        }
    }
    // dibuja el carro
    contexto.drawImage(car,window.innerWidth/2+mod-largo/2,pista.height/2+100,largo,ancho);
    setTimeout(correr, 1000/FPS,contexto, jugador);



}
