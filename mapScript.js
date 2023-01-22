var mapFrame = document.getElementById("mapFrame");


var mapFrameWidth = window.innerWidth * 0.5;
mapFrame.style.width = mapFrameWidth + "px";

var mapFrameHeight = window.innerHeight * 0.8;
mapFrame.style.height = mapFrameHeight + "px";

startingLeft = document.getElementById("map").style.left;
startingTop = document.getElementById("map").style.top;

var plusButton = document.getElementById("plusButton");
var minusButton = document.getElementById("minusButton");

var zoomPicArray = new Array("map-s.gif","map-m.gif","map-l.gif",
"map-xl.gif");

var imageArray = new Array();

for(var i=0; i < zoomPicArray.length; i++) {
imageArray[i] = new Image();
imageArray[i].src = zoomPicArray[i];
}

var sizeArray = [
	{source: "map-s.gif", // zoomed out 
	width:1283, 
	height: 997},
	{source:  "map-m.gif",
	width: 2047,
	height: 1589
	},
	 {source: "map-l.gif",
	width: 3063,
	height: 2373}, 
	{ source: "map-xl.gif", // zoomed in 
	width: 4084,
	height: 3165
	}];
var sizeIndex = 1;



function handleResize() {

    var mapFrameWidth = window.innerWidth * 0.5;
    mapFrame.style.width = mapFrameWidth + "px";

    var mapFrameHeight = window.innerHeight * 0.8;
    mapFrame.style.height = mapFrameHeight + "px";
  
}


window.addEventListener("resize", handleResize);


function getFrameHeight() {
	var frame = document.getElementById("map");
	return parseInt(frame.style.height);
}

function getFrameWidth() {
	var frame = document.getElementById("map");
	return parseInt(frame.style.width);
}

function getFrameTop() {
	var frame = document.getElementById("map");
	return parseInt(frame.style.top);
}

function getFrameLeft() {
	var frame = document.getElementById("map");
	return parseInt(frame.style.left);

}


function inFrame(x,y) {

	return (x >= getFrameLeft() && x <= getFrameLeft() + getFrameWidth()
				&& y >= getFrameTop() && y <= getFrameTop() + getFrameHeight());
}

function centerMap(x, y) 
{
	var frame = document.getElementById("map")
	var diffCordsX = x - (parseInt(mapFrame.style.width) / 2);
	var diffCordsY = y - (parseInt(mapFrame.style.height) / 2);
	var newLeft = getFrameLeft()  - diffCordsX;
	var newTop = getFrameTop() - diffCordsY;
	frame.style.left = newLeft + "px";
	frame.style.top = newTop + "px";


}


function zoomOut()
{
	var mapPositionX = (parseInt(mapFrame.style.width) / 2) - getFrameLeft();
	var mapPositionY = (parseInt(mapFrame.style.height) / 2) - getFrameTop();


	var frame = document.getElementById("map")
	if (sizeIndex != 0)
	{
		sizeIndex--;
	
	
	var newPositionX = (mapPositionX * sizeArray[sizeIndex].width) / sizeArray[sizeIndex + 1].width;
	var newPositionY = (mapPositionY * sizeArray[sizeIndex].height) / sizeArray[sizeIndex + 1].height;

	frame.src = sizeArray[sizeIndex].source;
	frame.style.width =  sizeArray[sizeIndex].width + "px";
	frame.style.height =  sizeArray[sizeIndex].height + "px";
	frame.style.top = 0 + "px";
	frame.style.left = 0 + "px";
	
	centerMap(newPositionX, newPositionY);

	}

}

function zoomIn()
{

	var mapPositionX = (parseInt(mapFrame.style.width) / 2) - getFrameLeft();
	var mapPositionY = (parseInt(mapFrame.style.height) / 2) - getFrameTop();

	var frame = document.getElementById("map")
	if (sizeIndex != 3)
	{
		sizeIndex++;
	

	var newPositionX = (mapPositionX * sizeArray[sizeIndex].width) / sizeArray[sizeIndex - 1].width;
	var newPositionY = (mapPositionY * sizeArray[sizeIndex].height) / sizeArray[sizeIndex - 1].height;

	frame.src = sizeArray[sizeIndex].source;
	frame.style.width =  sizeArray[sizeIndex].width + "px";
	frame.style.height =  sizeArray[sizeIndex].height + "px";
	frame.style.top = 0 + "px";
	frame.style.left = 0 + "px";


	centerMap(newPositionX, newPositionY);
	}

}

var isDragging = false;

function handleMouseDown(evt) {
	addAmountY = (evt.clientY - getFrameTop()) ;
	addAmountX = (evt.clientX - getFrameLeft());
	
	if (inFrame(evt.clientX,evt.clientY)) {
		document.body.style.cursor = "move";
		isDragging = true;
		evt.preventDefault();
	}
}

function handleMouseUp(evt) {
	if (isDragging) {
		document.body.style.cursor = "auto";
		var frame = document.getElementById("map");
		frame.style.left = (evt.clientX - addAmountX) + "px";
		frame.style.top = (evt.clientY - addAmountY) + "px";

		isDragging = false;		
	}
}

function handleMouseMove(evt) {
	if (isDragging) {

		var frame = document.getElementById("map");
		frame.style.left = (evt.clientX - addAmountX) + "px";
		frame.style.top = (evt.clientY - addAmountY) + "px";
		evt.preventDefault();
	}
}

function handleDblClick(evt)
{

	var mapPositionX = (evt.clientX  - getFrameLeft());
	var mapPositionY = (evt.clientY - getFrameTop());

	var frame = document.getElementById("map");
	frame.style.top = 0 + "px";
	frame.style.left = 0 + "px";


	centerMap(mapPositionX,mapPositionY);


}


function scrollLeft()
{
	var frame = document.getElementById("map");
	frame.style.left = getFrameLeft() + (parseInt(mapFrame.style.width) / 2) + "px";
}

function scrollRight()
{
	var frame = document.getElementById("map");
	frame.style.left = getFrameLeft() - (parseInt(mapFrame.style.width) / 2) + "px";
}

function scrollUp()
{
	var frame = document.getElementById("map");
	frame.style.top = getFrameTop() + (parseInt(mapFrame.style.height) / 2) + "px";
}

function scrolDown()
{
	var frame = document.getElementById("map");
	frame.style.top = getFrameTop() - (parseInt(mapFrame.style.height) / 2) + "px";

}



document.addEventListener("mousedown",handleMouseDown,false); // mouse button is clicked over an elemnt
document.addEventListener("mouseup",handleMouseUp,false); // mose button is release over an elemnt 
document.addEventListener("mousemove",handleMouseMove,false); // Every mouse move over an element triggers that event.
document.getElementById("map").addEventListener("dblclick",handleDblClick);
plusButton.addEventListener("click", zoomIn);
minusButton.addEventListener("click", zoomOut);
upButton.addEventListener("click", scrollUp);
leftButton.addEventListener("click", scrollLeft);
rightButton.addEventListener("click", scrollRight);
downButton.addEventListener("click", scrolDown);




