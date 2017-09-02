var FPS = 20;
var ctx;
var pista;
var count =0;
var ruta =0;
var count_a =0;
var left_c =0;
var right_c =0;
var mod =0;
var angle =0;
var x;
var x1;
var y;
var fondo = new Image();
fondo.src = "img/fondo1.png";
var cars_izq = [];
var cars_der = [];
var pistas_rectas = [];

for (var i = 5; i >= 0; i--) {
	pistas_rectas[i] = new Image();
	pistas_rectas[i].src = "img/pista_recta/pista"+ String(i+1)+".png";
}
var pista1 = pistas_rectas[0]
for (var i = 3; i >= 0; i--) {
	cars_izq[i] = new Image();
	cars_izq[i].src = "img/cars_izq/auto_iz"+ String(i+1)+".png";
}
for (var i = 3; i >= 0; i--) {
	cars_der[i] = new Image();
	cars_der[i].src = "img/cars_der/auto_de"+ String(i+1)+".png";
}
var auto1 = new Image();
auto1.src = "img/auto1.png";
var auto2 = new Image();
auto2.src = "img/auto2.png";
var road = new Image();
road.src = "img/road.PNG";
var img = new Image();
img.src = "img/car.png";
var buffer;
var left=false;
var right=false;
var curva_izq = [];
var salida_curva_izq= [];
var entrada_curva_izq= [];
var meta= [];

for (var i = 8; i >= 0; i--) {
	meta[i] = new Image();
	meta[i].src = "img/meta/meta_"+ String(i+1)+".png";
}

for (var i = 5; i >= 0; i--) {
	curva_izq[i] = new Image();
	curva_izq[i].src = "img/curva_izq/curva_movimiento_"+ String(i+1)+".png";
}


for (var i = 5; i >= 0; i--) {
	salida_curva_izq[i] = new Image();
	salida_curva_izq[i].src = "img/salida_curva_izq/salida_curva_"+ String(i+1)+".png";
}


for (var i = 5; i >= 0; i--) {
	entrada_curva_izq[i] = new Image();
	entrada_curva_izq[i].src = "img/entrada_curva_izq/entrada_curva_"+ String(i+1)+".png";;
}

var speed=2;


function inicializar(){
	count = 0;
}
var term = 0;
var alejar = 0;
function terminar(){
	term++;
	ter_id = requestAnimationFrame(terminar);
	
	if (term && 1){
		ctx.drawImage(meta[8],0,0);
		alejar = term*13;
		if (term & speed) car = auto1;
		else car = auto2;
		x = largo*(1-term/10) ;
		y = ancho*(1-term/10) ;
	}
	ctx.drawImage(car,pista1.width/2 + mod-x/2,pista1.height-y-alejar,x,y); 
	if (term > 12){
		cancelAnimationFrame(ter_id);
		ctx.drawImage(meta[8],0,0);
	}
	
	
	
}
var indice = 0;
var limite = 0;
var rutas =  [["R",20],["I",5],["R",20],["I",10],["R",10],["D",10],["C",1],]; 
var scale=0.3

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

		/*myVar = setInterval(function(){
		count + 1;
		ruta += 1;
		pista = render_images(pistas_rectas);
		ctx.drawImage(pista,0,0);
		//req_id = requestAnimationFrame(correr);
		if (ruta > (12*rutas[indice][1])){
			clearInterval(myVar);
		}
		
	},100);*/
	/*if (count < 0){
		clearInterval(myVar);
	} */
	//}
	/*for (var count = 0; count < 13; count++) {
		pista = render_images(pistas_rectas)
		alert("inicio");
		req_id = requestAnimationFrame(function(){
			alert("dentro");
			ctx.drawImage(pista,0,0);
		});
		cancelAnimationFrame(req_id);
		alert("fin");
	}*/
	/*time = new Date().getTime();
	if (startTime === null) {
        startTime = time;
	}
	var progress = time - startTime;

	/*for (var j = 0; j < pistas_rectas.length; j++){
		if (progress < 1000 ) {

			ctx.drawImage(pistas_rectas[j],0,0);
			//requestID= requestAnimationFrame(correr);
		} 
		else{
		  	cancelAnimationFrame(requestID);
		}
		requestID=requestAnimationFrame(correr);
			
	}
	/*ctx = document.getElementById("auto").getContext("2d");
	requestAnimationFrame(correr);
	for (var i = 0; i < rutas.length; i++){
		for (var j = 0; j < pistas_rectas.length; j++){
			setTimeout(function(){
			//ctx.drawImage(fondo,0,0,fondo.width,fondo.height-150,0,0,fondo.width,fondo.height-150);
				//pista = render_images(pistas_rectas);
				ctx.drawImage(pistas_rectas[j],0,0);
			}, 1000);
		}
	}*/
}

function draw() {
	ctx = document.getElementById("auto").getContext("2d");
	requestAnimationFrame(draw);	
	var pista;
	count += 1;
	ruta+=1;
	if ((ruta < 90) || (ruta > 232)){
		ctx.drawImage(fondo,0,0,fondo.width,fondo.height-150,0,0,fondo.width,fondo.height-150);
		
		pista = render_images(pistas_rectas);


	}
	else{
		if (ruta > 161){
			mod -=3;

			if ($.inArray(ruta,[162,222]) > -1){
				inicializar();
			}
			if (ruta < 222){
				if (ruta > 173){
					pista = render_images(curva_der);
					
				}else{
					pista = render_images(entrada_curva_der);
				}
			}
			else{
				pista = render_images(salida_curva_der);
			}  
			if ((mod<180) && (mod>-180)){
				mod -= 2;
				speed = 2;
			}
			else{
				if(mod < 450){mod -= 1};
				speed = 8;
			}
			fondo_count = ruta-161;
			ctx.drawImage(fondo,fondo_count,0,fondo.width,fondo.height,0,0,fondo.width-fondo_count,fondo.height);
			ctx.drawImage(fondo,0,0,fondo_count,fondo.height,fondo.width-fondo_count,0,fondo.width,fondo.height);
		}
		else {
			if ($.inArray(ruta,[90,150]) > -1){
				inicializar();
			}
			mod += 3;
			if (ruta < 150){
				if (ruta > 101){
					pista = render_images(curva_izq);
					
				}else{
					pista = render_images(entrada_curva_izq);
				}
			}
			else{
				pista = render_images(salida_curva_izq);
			}  
			if ((mod<180) && (mod>-180)){
				mod += 2;
				speed = 2;
			}
			else{
				if(mod < 450){mod += 1};
				speed = 8;
			}
			fondo_count = ruta-90;
			ctx.drawImage(fondo,0,0,fondo.width-fondo_count,fondo.height,fondo_count,0,fondo.width-fondo_count,fondo.height);
			ctx.drawImage(fondo,fondo.width-fondo_count,0,fondo.width,fondo.height,0,0,800,fondo.height);
		}
	}

	
	ctx.drawImage(pista,0,0);
	
	buffer = document.createElement('canvas');
	scale=0.3
	buffer.width = auto1.width*scale;
	buffer.height = auto1.height*scale;
	if (left){
		left_c+=1;
		if (left_c<3){
			ctx.drawImage(auto_iz1,pista1.width/2 + mod-buffer.width/2,pista1.height-buffer.height,auto1.width*scale,auto1.height*scale);
		}else{
			if (left_c<5){
				ctx.drawImage(auto_iz2,pista1.width/2 + mod-buffer.width/2,pista1.height-buffer.height,auto1.width*scale,auto1.height*scale);
			}
			else{
				if (left_c<7){
					ctx.drawImage(auto_iz3,pista1.width/2 + mod-buffer.width/2,pista1.height-buffer.height,auto1.width*scale,auto1.height*scale);
				}
				else{
					ctx.drawImage(auto_iz4,pista1.width/2 + mod-buffer.width/2,pista1.height-buffer.height,auto1.width*scale,auto1.height*scale);
					left = false;
					left_c = 0 ;
				}
			}
		}
	}
	else{
		if (count_a < speed*1){
			ctx.drawImage(auto1,pista1.width/2 + mod-buffer.width/2,pista1.height-buffer.height,auto1.width*scale,auto1.height*scale);
			count_a += 1;	
		}
		else{

			if (count_a < speed*2){
				count_a += 1;
				ctx.drawImage(auto2,pista1.width/2 + mod-buffer.width/2,pista1.height-buffer.height+3,auto1.width*scale,auto1.height*scale);

			}
			else{
				ctx.drawImage(auto1,pista1.width/2 + mod-buffer.width/2,pista1.height-buffer.height,auto1.width*scale,auto1.height*scale);
				count_a =0;
			}
		}
	}
	
	//ctx.drawImage(buffer,pista1.width/2 + mod-buffer.width/2,pista1.height-buffer.height);
	
	
}

window.connectManager = new connectsdk.ConnectManager();

window.connectManager.on("message", function(data){
	tecla = data.message.jugador;
	if(data.message.accion == "mover")
	{
        switch (tecla){
            case "izquierda" : 
                mod -= 10; 
                left = true; 
                break;
            //case 38 : 
            //    cuadrado.style.top = situacionX-220+"px" ;break;
            case "derecha" :  
        		mod += 10 ;
        		right = true;
        		break;
            //case 40 : 
            //    cuadrado.style.top = situacionX-180+"px" ;break;
        	default :alert("Se ha equivocado, debe pulsar las flechas del teclado");
        }
    }
});

window.connectManager.init();


//setInterval(keypress_handler, 1000);
function init(){
	/*chofer = new Image();
	chofer.src = "img/chofer1.png";*/
	ctx = document.getElementById("auto").getContext("2d");
	//var req_id = requestAnimationFrame(correr);
	setTimeout(function(){
		document.body.style.backgroundImage='none';
		correr();
		//$("#chofer").attr("src", "img/chofer1.png");
		//ctx.drawImage(chofer,0,0);

	},3000)
}
