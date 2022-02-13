function motion(event){
	document.getElementById('log').innerHTML += ("Accelerometer: "
	+ event.accelerationIncludingGravity.x + ", "
	+ event.accelerationIncludingGravity.y + ", "
	+ event.accelerationIncludingGravity.z
	) + '<br />';
}

if(window.DeviceMotionEvent){
	window.addEventListener("devicemotion", motion, false);
}else{
	document.getElementById('log').innerHTML = "DeviceMotionEvent is not supported";
}
