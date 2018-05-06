function Bird(IMG) {
    this.img = IMG;
    this.gravity = 1;
    this.velocity = 0;
    this.jump = 10;

    this.dead = false;
    
    this.score = 0;
    this.moment = 0;
    this.max_moment = 50000;

    this.pos = createVector(10, random(height));

    this.actions = []
    for(var i = 0; i < this.max_moment; i++) {
        this.actions.push(floor(random(2)));
    }

    this.update = function() {
        if(!this.isDead) {
            if(this.moment % 2 === 0 && this.actions[this.moment/2] === 0) {
                this.velocity = 0;
                this.pos.y -= this.jump;
            } else {
                this.velocity += this.gravity;
                this.pos.y += this.velocity;
            }
            this.score++;
            this.moment++;
            if(this.moment > this.max_moment) this.moment = 0;
            if(this.pos.y + this.img.height > height || this.pos.y < 0) this.isDead = true;
        }
    };

    this.dead = function() {
        this.isDead = true;
    }

    this.show = function() {
        if(!this.isDead) {
            push();
            translate(this.pos.x, this.pos.y)
            image(this.img, 0, 0);
            pop();
        }
    };
}