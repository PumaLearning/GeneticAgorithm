function Bird(img) {
    this.x = 50;
    this.y = width/2; // random(img.height, height - img.height);

    this.gravity = 0.5;
    this.velocity = 0;
    this.impulse = -15;
    
    this.up = function() {
        this.velocity += this.impulse;
        this.y += this.velocity;
    }

    this.hits = function(pipe) {
        return collideRectRect(this.x, this.y, img.width, img.height,
                pipe.x, pipe.y - pipe.gap/2 - pipe.h, pipe.w, pipe.h) ||
            collideRectRect(this.x, this.y, img.width, img.height,
                pipe.x, pipe.y + pipe.gap/2, pipe.w, pipe.h);
    }

    this.offscreen = function(BASE_W) {
        return this.y + img.height > height - BASE_W  || this.y + img.height < 0;
    }

    this.update = function() {
        this.velocity += this.gravity;
        this.y += this.velocity;
    }

    this.show = function() {
        image(img, this.x, this.y);
    }
}