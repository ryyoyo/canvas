var canvas = document.getElementById('xx')
var context = canvas.getContext('2d')
var lineWidth = 5

autoSetCanvasSize(canvas)

listenToMouse(canvas)
// drawLine(100,300,200,200)

function drawCircle(x,y,radius){ //画圆圈
  	context.beginPath()
  	context.arc(x,y,radius,0,Math.PI*2)
  	context.fill()
}
function drawLine(x1,y1,x2,y2){ //画线条
  	context.beginPath();
  	context.moveTo(x1,y1);
  	context.lineWidth = lineWidth;
  	context.lineTo(x2,y2);
  	context.stroke()
  	context.closePath()
}





var eraserEnable = false
//var eraser = document.getElementById('eraser')
// eraser.onclick = function(){
//   	eraserEnable = true
//   	actions.className = 'actions x'
// }
// pen.onclick = function(){
//   	eraserEnable = false
//   	actions.className = 'actions'
// }

color_map = {'red': red, 'yellow': yellow, 'blue': blue, 'black': black}

pen.onclick = function(){
	eraserEnable = false
	pen.classList.add('active')
	eraser.classList.remove('active')
	var nowColor = pen.style.color
	color_map[nowColor].classList.add('active');
}
eraser.onclick = function(){
	eraserEnable = true
	eraser.classList.add('active')
	pen.classList.remove('active')
	color_map[nowColor].classList.remove('active')
	// yellow.classList.remove('active')
	// blue.classList.remove('active')
	// red.classList.remove('active')
}
// 清屏
clear.onclick = function(){
	context.clearRect(0,0,canvas.width,canvas.height)
}
// 保存画布
save.onclick = function(){
	var url = canvas.toDataURL('img/png')
	var a = document.createElement('a')
	document.body.appendChild(a)
	a.href = url
	a.download = 'my picture'
	a.target = '_blank'
	a.click()
}



function x(color){
	var colorB = document.getElementById(color)
	var li = document.getElementsByTagName('li')
	context.strokeStyle = color
	pen.style.color = color
	//red.classList.add('active')
	//yellow.classList.remove('active')
	//blue.classList.remove('active')
	console.log(colorB);
	for (var i = li.length - 1; i >= 0; i--) {
		li[i].classList.remove('active');
	}
	colorB.classList.add('active')
	pen.onclick()
}

black.onclick = function(){x('black')}
red.onclick = function(){x('red')}
yellow.onclick = function(){x('yellow')}
blue.onclick = function(){x('blue')}
// red.onclick = function(){
// 	context.strokeStyle = 'red'
// 	pen.style.color = 'red'
// 	red.classList.add('active')
// 	yellow.classList.remove('active')
// 	blue.classList.remove('active')
// 	pen.onclick()
// }


thin.onclick = function(){
	lineWidth = 5
}
thick.onclick = function(){
	lineWidth = 10
}


//封装
function autoSetCanvasSize(canvas){
  	setCanvasSize()

  	window.onresize = function(){
  	  	setCanvasSize()
  	}
  	function setCanvasSize(){
    	var pageWidth = document.documentElement.clientWidth
    	var pageHeight = document.documentElement.clientHeight

    	canvas.width = pageWidth
    	canvas.height = pageHeight
  }
}
// 监听鼠标
function listenToMouse(canvas){
	var using = false
	var lastPoint = {
	  	x:undefined,
	  	y:undefined
	}
  // 判断使用的设备
	if(document.body.ontouchstart !== undefined){
		//触屏
		canvas.ontouchstart = function(a){
	  		var x = a.touches[0].clientX
	  	  	var y = a.touches[0].clientY
	  	  	using = true
	  	  	if(eraserEnable){
	  	  	  context.clearRect(x-5,y-5,10,10)
	  	  	}else{
	  	  	  lastPoint = {'x':x,'y':y}
	          drawCircle(x,y,lineWidth/2.2)
	  	  	}
	  	}
  		canvas.ontouchmove = function(a){
	  		var x = a.touches[0].clientX
			var y = a.touches[0].clientY
			if(!using){return}
			if(eraserEnable){
				context.clearRect(x-5,y-5,10,10)
			}else{
			   	var newPoint = {'x':x,'y':y}
			   	drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
	      		drawCircle(x,y,lineWidth/2.2)
			   	lastPoint = newPoint
			}
		}
		canvas.ontouchend = function(){
			using = false
		}
	}else{//非触屏
  		// 按下鼠标
	  	canvas.onmousedown = function(a){
		  	var x = a.clientX
		  	var y = a.clientY
		  	using = true
		  	if(eraserEnable){
		  	  	context.clearRect(x-5,y-5,10,10)
		  	}else{
		  	  	lastPoint = {'x':x,'y':y}
	          drawCircle(x,y,lineWidth/2.2)
		  	}
	  	}
	    // 移动鼠标
	  	canvas.onmousemove = function(a){
		    var x = a.clientX
		    var y = a.clientY
		  	if(!using){return}
		  	if(eraserEnable){
		      	context.clearRect(x-5,y-5,10,10)
		  	}else{
		      	var newPoint = {'x':x,'y':y}
	          	drawCircle(x,y,lineWidth/2.2)
		      	drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
		      	lastPoint = newPoint
		  	}
		}
		// 松开鼠标
		canvas.onmouseup = function(a){
		   	using = false
		}
	}
}


