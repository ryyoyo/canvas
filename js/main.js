var canvas = document.getElementById('xx')
var context = canvas.getContext('2d')

autoSetCanvasSize(canvas)

listenToMouse(canvas)



function drawCircle(x,y,radius){
  	context.beginPath()
  	context.arc(x,y,radius,0,Math.PI*2)
  	context.fill()
}
function drawLine(x1,y1,x2,y2){
  	context.beginPath();
  	context.moveTo(x1,y1);
  	context.lineWidth = 5;
  	context.lineTo(x2,y2);
  	context.stroke()
  	context.closePath()
}





var eraserEnable = false
var eraser = document.getElementById('eraser')
eraser.onclick = function(){
  	eraserEnable = true
  	actions.className = 'actions x'
}
pen.onclick = function(){
  	eraserEnable = false
  	actions.className = 'actions'
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
function listenToMouse(canvas){
  	var using = false
  	var lastPoint = {
  	  	x:undefined,
  	  	y:undefined
  	}
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
  		   	lastPoint = newPoint
  		}
	}
	canvas.ontouchend = function(){
  		using = false
	}
  }else{
  	//非触屏
  	canvas.onmousedown = function(a){
  	  	var x = a.clientX
  	  	var y = a.clientY
  	  	using = true
  	  	if(eraserEnable){
  	  	  	context.clearRect(x-5,y-5,10,10)
  	  	}else{
  	  	  	lastPoint = {'x':x,'y':y}
  	  	}
  	}

  	canvas.onmousemove = function(a){
  		    var x = a.clientX
  		    var y = a.clientY
  		  	if(!using){return}
  		  	if(eraserEnable){
  		      	context.clearRect(x-5,y-5,10,10)
  		  	}else{
  		      	var newPoint = {'x':x,'y':y}
  		      	drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
  		      	lastPoint = newPoint
  		  	}
  		}
  		canvas.onmouseup = function(a){
  		   	using = false
  		}
  	}
}


