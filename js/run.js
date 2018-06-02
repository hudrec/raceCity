/**
 * Created by user on 9/23/17.
 */

function correr(){
    //
    //req_id = requestAnimationFrame(correr);


    tramo = rutas[indice] ;
    limite = (6*speed)*(tramo[1]);
    //alert(limite);
    if (tramo[0] == "R"){
        //alert(count);

        ctx.drawImage(fondo,0,0,fondo.width,fondo.height-150,0,0,fondo.width,fondo.height-150);
        pista = render_images(pistas_rectas);
        //if (ruta > limite){
        if (ruta >= tramo[1]*5){
            ruta = 0;
            count = 0;
            indice++;
        }
    }
    else {
        if (tramo[0] == "C"){
            limite = (9*speed)*(tramo[1]);

            pista = render_meta(meta);
            //if (ruta >= limite){
            if (ruta >= tramo[1]*9){
                ruta = 0;
                count = 0;
                indice++;
            }

        }
        else{
            limite = (6*speed)*(tramo[1]+2);
            if (tramo[0] == "D"){
                ctx.drawImage(fondo,ruta,0,fondo.width,fondo.height,0,0,fondo.width,fondo.height);
                entrada = entrada_curva_der;
                curva = curva_der;
                salida = salida_curva_der;
                if ((mod<180) && (mod>-180)) mod -= 2;
                else speed = 8;
            }
            else{
                ctx.drawImage(fondo,pista.width-ruta,0,fondo.width,fondo.height,0,0,fondo.width,fondo.height);
                entrada = entrada_curva_izq;
                curva = curva_izq;
                salida = salida_curva_izq;
                if ((mod<180) && (mod>-180)) mod += 2;
                else speed = 8;
            }
            if (ruta < 6)	{
                pista = render_images(entrada);
            }
            if ((ruta >= 6) && (ruta < (6*(tramo[1]+1)))){
                pista = render_images(curva);
            }
            if (ruta >= 6*(tramo[1]+1)){
                pista = render_images(salida);

            }
            //if (ruta >= limite){
            if ((ruta+1) == ((tramo[1]+2)*6)){
                ruta = 0;
                count = 0;
                indice++;
            }
        }
    }

    if (indice == rutas.length){
        //cancelAnimationFrame(req_id);
        requestAnimationFrame(terminar);
        return
    }
    ctx.drawImage(pista,0,0);
    count++;
    ruta++;
    //ctx.drawImage(auto1,pista1.width/2 + mod-buffer.width/2,pista1.height-buffer.height,auto1.width*scale,auto1.height*scale);
    largo = auto1.width*scale;
    ancho = auto1.height*scale;

    if (left){

        car = render_car(cars_izq, "I");
        alert(car);
    }
    else{
        if (right) car = render_car(cars_der, "D");
        else {
            if (ruta & speed) car = auto1;
            else car = auto2;
        }
    }
    ctx.drawImage(car,pista1.width/2 + mod-largo/2,pista1.height-ancho,largo,ancho);

    setTimeout(correr, 1000/FPS);


}
