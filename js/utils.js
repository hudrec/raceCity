
function render_images(images){
	//alert(String(count) + " - " + String(ruta));
	pista = null;
	/*switch(true){
		case count < speed*1:
			pista = images[0];
			//mod += 1;
			break;
		case count >= speed*1 && count < speed*2 :
			pista = images[1];
			//mod += 1;
			break;
		case count >= speed*2 && count < speed*3:
			pista = images[2];
			//mod += 1;
			break;
		case count >= speed*3 && count < speed*4:
			pista = images[3];
			//mod += 1;
			break;
		case count >= speed*4 && count < speed*5:
			pista = images[4];
			//mod += 1;
			break;
		case count >= speed*5 && count < speed*6:
			pista = images[5];
			break;
		case count >= speed*6:
			pista = images[5];
			count = 0;
			break;
		default:
			break;
	}*/
	if (count == 5){
		count = -1;
		return images[5];
	}
	return images[count];
}
function render_meta(images){
	//alert(String(count) + " - " + String(ruta));
	pista = null;
	/*switch(true){
		case count < speed*1:
			pista = images[0];
			break;
		case count >= speed*1 && count < speed*2 :
			pista = images[1];
			break;
		case count >= speed*2 && count < speed*3:
			pista = images[2];
			break;
		case count >= speed*3 && count < speed*4:
			pista = images[3];
			break;
		case count >= speed*4 && count < speed*5:
			pista = images[4];
			break;
		case count >= speed*5 && count < speed*6:
			pista = images[5];
			break;
		case count >= speed*6 && count < speed*7:
			pista = images[6];
			break;
		case count >= speed*7 && count < speed*8:
			pista = images[7];
			break;
		case count >= speed*8 && count < speed*9:
			pista = images[8];
			break;
		case count >= speed*9:
			pista = images[8];
			count = 0;
			break;
		default:
			break;
	}*/
	if (count == 8){
		count = -1;
		return images[8];
	}
	return images[count];
	/*for (var i = 0; i < images.length; i++) {
		ctx.drawImage(images[i],0,0);
		ctx.drawImage(images[i],0,0);
		ctx.drawImage(images[i],0,0);
		ctx.drawImage(images[i],0,0);
	}*/
	//return pista;
}

function render_car(cars,code){
	if (code=="I"){ 
		left_c++;
		contador = left_c;
	} 
	if (code=="D"){ 
		right_c++;
		contador = right_c;
	} 
	car = null
	if (contador<3){
		car = cars[0]
	}else{
		if (contador<5){
			car = cars[1]
		}
		else{
			if (contador<7){
				car = cars[2]
			}
			else{
				car = cars[3]
				left = false;
				right = false;
				contador = 0 ;
			}
		}
	}
	return car;

}
