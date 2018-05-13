function Pipe(imgN, imgS) {    
    
    this.w = imgN.width;
    this.h = imgN.height;
    
    this.velocity = 2;
    
    this.gap = 120;
    this.minimum = width - this.gap - this.h;

    this.x = width;
    this.y = random(this.gap/2 + this.minimum, height - this.gap/2 - this.minimum);

    this.offscreen = function() {
        return this.x  < -this.w;
    }

    this.update = function() {
        this.x -= this.velocity;
    }

    this.show = function() {
        image(imgN, this.x, this.y - this.gap/2 - this.h, this.w, this.h);
        image(imgS, this.x, this.y + this.gap/2, this.w, this.h);
    }


}