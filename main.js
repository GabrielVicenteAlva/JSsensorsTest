function motion(event){
	var x = event.accelerationIncludingGravity.x
	var y = event.accelerationIncludingGravity.y
	var z = event.accelerationIncludingGravity.z
	
	// if(!(x||y||z))
		// return;
	
	document.getElementById('accX').innerHTML = 'x: '+x;
	document.getElementById('accY').innerHTML = 'y: '+y;
	document.getElementById('accZ').innerHTML = 'z: '+z;
	
	document.getElementById('accA').innerHTML = 'a: '+Math.sqrt(x*x+y*y+z*z);
}

if(window.DeviceMotionEvent){
	window.addEventListener("devicemotion", motion, false);
}else{
	document.getElementById('log').innerHTML = "DeviceMotionEvent is not supported";
}
