
function render_images(images, data_count){
	pista = null;
	if (data_count.count == 5){
        data_count.count = -1;

        return images[5];
	}
	return images[data_count.count];
}
function render_images1(images){
	pista1 = null;
	if (count1 == 5){
		count1 = -1;
		return images[5];
	}
	return images[count1];
}
function render_meta(images,data_count){
	alert("TERMINAR");
	//alert(String(count) + " - " + String(ruta));
	pista = null;
	if (data_count.count == 8){
        data_count.count = -1;
		return images[8];
	}
	return images[data_count.count];
	
}
function render_meta1(images){
	//alert(String(count) + " - " + String(ruta));
	pista1 = null;
	if (count1 == 8){
		count1 = -1;
		return images[8];
	}
	return images[count1];
	
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

function render_car1(cars,code){
	if (code=="I"){ 
		left_c1++;
		contador1 = left_c1;
	} 
	if (code=="D"){ 
		right_c1++;
		contador1 = right_c1;
	} 
	car1 = null
	if (contador1<3){
		car1 = cars[0]
	}else{
		if (contador1<5){
			car1 = cars[1]
		}
		else{
			if (contador1<7){
				car1 = cars[2]
			}
			else{
				car1 = cars[3]
				left1 = false;
				right1 = false;
				contador1 = 0 ;
			}
		}
	}
	return car1;

}
