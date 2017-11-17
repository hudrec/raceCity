var curva_der = [];
var curvas_der = [];
var salida_curva_der= [];
var entrada_curva_der= [];
var s_curva_der_img= [];
var e_curva_der_img= [];


for (var i = 5; i >= 0; i--) {
	curva_der[i] = new Image();
	curva_der[i].src = "img/curva_der/Curvamovimiento"+ String(i+1)+".png";
}


for (var i = 5; i >= 0; i--) {
	salida_curva_der[i] = new Image();
	salida_curva_der[i].src = "img/salida_curva_der/Saliendodelacurva"+ String(i+1)+".png";
}

for (var i = 5; i >= 0; i--) {
	entrada_curva_der[i] = new Image();
	entrada_curva_der[i].src = "img/entrada_curva_der/Entrandoalacurva"+ String(i+1)+".png";
}