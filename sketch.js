var mainCursor;

var countCursors;
var cursors = [];

var clr = {};

var widthSlider;
var countSlider;

var sliding = false;
var drawing = false;

function setCursorCount(num) {
	cursors = [];
	cursors.push(mainCursor);
	countCursors = num;
	for (var i = 1; i < countCursors; i++) {
		cursors.push(new Cursor(0, 0));
	}
}

function setup() {
	createCanvas(1600, 900);
	background(51);
	angleMode(DEGREES);
	mainCursor = new Cursor(mouseX, mouseY);
	clr = {
		r: 0,
		g: 0,
		b: 0
	};
	widthSlider = new Slider(40, height-80, 6, 15);
	countSlider = new Slider(width-600, height-80, 2, 10);
	setCursorCount(2);
}

function mouseDragged() {
	if (mouseY > height-100) {
		sliding = true;
		if (widthSlider.onSlider()) {
			widthSlider.move(mouseX);
		} else if (countSlider.onSlider()) {
			countSlider.move(mouseX);
			setCursorCount(floor(countSlider.getValue()));
		}
	} else {
		sliding = false;
	}
}

function setCursors() {
	deltaX = mainCursor.x - width/2;
	deltaY = mainCursor.y - height/2;
	angleInc = 360/countCursors;
	angle = degrees(Math.atan2(deltaY, deltaX));

	distance = sqrt((mainCursor.x - width/2)**2 + (mainCursor.y - height/2)**2);

	for (var i = 1; i < countCursors; i++) {
		angle += angleInc;
		var x = cos(angle)*distance + width/2;
		var y = sin(angle)*distance + height/2;
		
		cursors[i].setPos(x, y);
	}
}

function draw() {
	fill(255, 120, 0);
	noStroke();
	rect(0, height-100, width, 100);

	widthSlider.show();
	countSlider.show();
	mainCursor.setPos(mouseX, mouseY);

	if (frameCount % 5 == 0) {
		clr.r = random() * 255;
		clr.g = random() * 255;
		clr.b = random() * 255;
	}
	for (var i = 0; i < countCursors; i++) {
		cursors[i].setColor(clr);
	}

	if (mouseIsPressed && !sliding) {
		setCursors();
		for (var i = 0; i < countCursors; i++) {
			cursors[i].trail();
		}
	} else {
		for (var i = 0; i < countCursors; i++) {
			cursors[i].reset();
		}	
	}

}