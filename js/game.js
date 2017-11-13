var FPS = 30;
var ctx1;
var ctx;
var pista;
var pista1;
var left_c =0;
var left_c1 =0;
var right_c =0;
var right_c1 =0;
var mod =0;
var x;
var y;
var fondo = new Image();
fondo.src = "img/Fondo-prueba.png";
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
auto1.src = "img/Auto-1.png";
var auto2 = new Image();
auto2.src = "img/Auto-2.png";
var road = new Image();
road.src = "img/road.PNG";
var buffer;
var left=false;
var left1=false;
var right=false;
var right1=false;
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
	curva_izq[i].src = "img/curva_izq/Curvamovimiento"+ String(i+1)+".png";
}


for (var i = 5; i >= 0; i--) {
	salida_curva_izq[i] = new Image();
	salida_curva_izq[i].src = "img/salida_curva_izq/Saliendodelacurva"+ String(i+1)+".png";
}


for (var i = 5; i >= 0; i--) {
	entrada_curva_izq[i] = new Image();
	entrada_curva_izq[i].src = "img/entrada_curva_izq/Entrandoalacurva"+ String(i+1)+".png";;
}

var speed=2;


function inicializar(){
	count = 0;
}
var term = 0;
var alejar = 0;
var x1;
var y1;
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
var term1 = 0;
var alejar1 = 0;
function terminar1(){
	term1++;
	ter_id1 = requestAnimationFrame(terminar1);
	
	if (term1 && 1){
		ctx1.drawImage(meta[8],0,0);
		alejar1 = term*13;
		if (term1 & speed1) car1 = auto1;
		else car1 = auto2;
		x1 = largo*(1-term/10) ;
		y1 = ancho*(1-term/10) ;
	}
	ctx1.drawImage(car1,pista1.width/2 + mod-x/2,pista1.height-y1-alejar,x1,y1); 
	if (term1 > 12){
		cancelAnimationFrame(ter_id1);
		ctx1.drawImage(meta[8],0,0);
	}
	
	
	
}
// var indice = 0;
var limite = 0;
var rutas =  [["R",10],["D",10],["R",10]];
var scale=0.7


var speed1=2;
var count1 = 0;
var mod1 =0;


window.connectManager = new connectsdk.ConnectManager();

window.connectManager.on("message", function(data){
	if (data.message.jugador){
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
	}
	if (data.message.jugador1){
		tecla1 = data.message.jugador1;
		if(data.message.accion1 == "mover")
		{
	        switch (tecla){
	            case "izquierda" : 
	                mod1 -= 10; 
	                left1 = true; 
	                break;
	            //case 38 : 
	            //    cuadrado.style.top = situacionX-220+"px" ;break;
	            case "derecha" :  
	        		mod1 += 10 ;
	        		right1 = true;
	        		break;
	            //case 40 : 
	            //    cuadrado.style.top = situacionX-180+"px" ;break;
	        	default :alert("Se ha equivocado, debe pulsar las flechas del teclado");
	        }
	    }
	}
	if (data.message.entrar == "jugador"){
        $("body").css('background-image','url("img/fondotv.png")');

        var chofer = new Image();
        chofer.src = "img/chofer1.png";
        ctx = document.getElementById("auto").getContext("2d");
        chofer.onload = function(){
            ctx.drawImage(chofer,480,140);
            ctx.font="60px Georgia";
            ctx.fillStyle = "#fff";
            ctx.fillText(data.message.name,480,500)
        };

        var iniciar = new Image();
        iniciar.src = "img/forms/iniciar.png";
        iniciar.onload = function(){
            ctx.drawImage(iniciar,900,550);
        };
        var opciones = new Image();
        opciones.src = "img/forms/opciones.png";
        opciones.onload = function(){
            ctx.drawImage(opciones,900,600);

        };



        //alert("NUEVO JUGADOR");
		//main.drawImage(chofer,500,800);
	}
	if (data.message.jugar){
        $('#auto')[0].width = window.innerWidth;
        $('#auto1')[0].width = window.innerWidth;
        $('#auto')[0].height = window.innerHeight/2;
        $('#auto1')[0].height = window.innerHeight/2;
        ctx = document.getElementById("auto").getContext("2d");
        ctx1 = document.getElementById("auto1").getContext("2d");
        ctx.drawImage(fondo,0,0,fondo.width,fondo.height,0,0,fondo.width,window.innerHeight/5);
        ctx1.drawImage(fondo,0,0,fondo.width,fondo.height,0,0,fondo.width,window.innerHeight/5);

        correr(ctx,jugador1);
        correr(ctx1,jugador2);
        document.body.style.backgroundImage='none';
		//$("#listaJugadores").hide();

		correr();

		manejar();
	}      
});

window.connectManager.init();
var terreno = new Image();
terreno.src = "img/terreno.jpg";
//setInterval(keypress_handler, 1000);
var jugador1 = {ruta : 0,
	count : 0,
	indice : 0,
	name:1
};
var jugador2 = {ruta : 0,
    count : 0,
    indice : 0,
	name:2
};
function init(){
	/*chofer = new Image();
	chofer.src = "img/chofer1.png";*/
	//var chofer = new Image();
	//chofer.src = "img/chofer1.png";
	//main = document.getElementById("auto").getContext("2d");
    // $("#listaJugadores").hide();
    // document.body.style.backgroundImage='none';
	// ctx = document.getElementById("auto").getContext("2d");
	// ctx1 = document.getElementById("auto1").getContext("2d");
    // ctx.drawImage(fondo,0,0,fondo.width,fondo.height,0,0,fondo.width,fondo.height);
    // ctx1.drawImage(fondo,0,0,fondo.width,fondo.height,0,0,fondo.width,fondo.height);
    //
    // ctx.drawImage(terreno,0,350);
    // ctx1.drawImage(terreno,0,350);
	// ctx1.drawImage(terreno,0,0);
	//var req_id = requestAnimationFrame(correr);
	//setTimeout(function(){
        //$("#listaJugadores").show()
    	//document.body.style.backgroundImage='url("img/menu.png")';

		//main.drawImage(chofer,400,250);
        //correr();
        //manejar();

		//$("#chofer").attr("src", "img/chofer1.png");
		//ctx.drawImage(chofer,0,0);

	//},3000);
	// TEST


    // $("#listaJugadores").append('<span style="color: white;margin-left: 880px;"><h1>{data.message.name}</h1></span>');

    setTimeout(function(){
		$("body").css('background-image','url("img/esperando.png")')
        // ctx.drawImage(fondo,0,0,fondo.width,fondo.height,0,0,fondo.width,window.innerHeight/5);
		// ctx1.drawImage(fondo,0,0,fondo.width,fondo.height,0,0,fondo.width,window.innerHeight/5);

        // ctx.drawImage(fondo,0,0,fondo.width,fondo.height,0,0,fondo.width,fondo.height);
        // ctx1.drawImage(fondo,0,0,fondo.width,fondo.height,0,0,fondo.width,fondo.height);

        // correr(ctx,jugador1);
        // correr(ctx1,jugador2);

        // manejar();
    },3000)
}
