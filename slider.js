Slider = function(x, y, min, max) {
	this.x = x;
	this.y = y;
	this.min = min;
	this.max = max;
	this.circlex = this.x + 12;
	this.circley = this.y;
	this.d = 24;

	this.sliderimg = loadImage("textures/slider-bar-sfw.png");
	this.circleimg = loadImage("textures/slider-sfw.png");

	this.show = function() {
		image(this.sliderimg, this.x, this.y);
		image(this.circleimg, this.circlex-25, this.circley-5, 60, 60);

		coeff = floor(this.getValue());
		textSize((coeff+10)*2);
		text(this.getValue(), this.x - coeff/2 + 450, this.y + coeff + 26);
	}

	this.onSlider = function() {
		endx = this.x + 537;
		endy = this.y + 45;
		return mouseX >= this.x && mouseX <= endx &&
			   mouseY >= this.y - 7 && mouseY <= endy + 7
	}

	this.move = function(newX) {
		start = this.x + 12;
		end = this.x + 370;
		if (newX > end ) {
			this.circlex = end;
		} else if (newX < start) {
			this.circlex = start;
		} else {
			this.circlex = newX;
		}
	}

	this.getValue = function() {
		dist = this.circlex - (this.x + 12);
		fract = dist / 382;
		range = this.max-this.min;
		return round(min + range*fract);
	}
}