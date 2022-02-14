var canvas = document.getElementById('history');
var ctx = canvas.getContext('2d');
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var pxlId = (i,j,k) => 4*(i*canvasWidth+j)+k;
var hist = Array(canvasWidth);

function motion(event){
	var x = event.accelerationIncludingGravity.x
	var y = event.accelerationIncludingGravity.y
	var z = event.accelerationIncludingGravity.z
	var a = Math.sqrt(x*x+y*y+z*z);
	
	// if(!(x||y||z))
		// return;
	
	document.getElementById('accX').innerHTML = 'x: '+x;
	document.getElementById('accY').innerHTML = 'y: '+y;
	document.getElementById('accZ').innerHTML = 'z: '+z;
	document.getElementById('accA').innerHTML = 'a: '+a;
	hist.shift();
	hist.push(a);
	
	var id = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
	var pixels = id.data;
	for(var i=0;i<canvasHeight;i++)
		for(var j=0;j<canvasWidth;j++)
			for(var k=0;k<4;k++)
				pixels[pxlId(i,j,k)] = 255;
	
	for(var i=0;i<canvasWidth;i++)
		for(var k=0;k<3;k++) {
			if(hist[i]===undefined)
				continue;
			let h = Math.round(10*hist[i]);
			if(h>=0 && h<canvasHeight)
				pixels[pxlId(canvasHeight-1-h,i,k)] = 0;
		}
			
	ctx.putImageData(id, 0, 0);
	// console.log(hist)
}

if(window.DeviceMotionEvent){
	window.addEventListener("devicemotion", motion, false);
}else{
	document.getElementById('log').innerHTML = "<br>DeviceMotionEvent is not supported";
}

function requestOrientationPermission(){
	if(!DeviceOrientationEvent.requestPermission)
		return;
	document.getElementById('log').innerHTML = 'Permission required';
    DeviceOrientationEvent.requestPermission()
        .then(response => {
            if (response == 'granted') {
                window.addEventListener('devicemotion',motion);
            }
        })
        .catch(console.error)
    }
