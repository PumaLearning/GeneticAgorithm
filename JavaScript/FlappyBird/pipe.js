function Pipe(i, IMG_N, IMG_S, GAP, d, n) {

    this.safeDistance = 20;

    this.posDOWN = createVector(width + ((d + IMG_N.width) *i), floor(random(height/2 - this.safeDistance, height - this.safeDistance)));
    this.posUP = createVector(this.posDOWN.x, this.posDOWN.y - GAP - IMG_N.height);

    this.velocity = 3;

    this.update = function() {
        this.posUP.x -= this.velocity;
        this.posDOWN.x -= this.velocity;

        if(this.posDOWN.x < -IMG_S.width) {
            this.posDOWN = createVector((d + IMG_S.width) * n, floor(random(height/2 - this.safeDistance, height - this.safeDistance)));
            this.posUP = createVector(this.posDOWN.x, this.posDOWN.y - GAP - IMG_N.height);
        }
    };

    this.show = function() {
        push();
        translate(this.posDOWN.x, this.posDOWN.y);
        image(IMG_S, 0, 0);
        pop();

        push();
        translate(this.posUP.x, this.posUP.y);
        image(IMG_N, 0, 0);
        pop();
        // rect(this.posDOWN.x, this.posDOWN.y, IMG_S.width, IMG_S.height);
    };

    this.check = function(bird) {
        return collideRectRect(this.posUP.x, this.posUP.y, IMG_N.width, IMG_N.height,
                        bird.pos.x, bird.pos.y, bird.img.width, bird.img.height) ||
            collideRectRect(this.posDOWN.x, this.posDOWN.y, IMG_S.width, IMG_S.height,
                        bird.pos.x, bird.pos.y, bird.img.width, bird.img.height);
    };
}