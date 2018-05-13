let assets;
let birds = [];
let pipes = [];

const BASE_W = 50;
const POPULATION = 1;
const FREQUENCY = 137;

function preload() {
    assets = {
        'bird': loadImage('assets/bird.png'),
        'pipeN': loadImage('assets/pipeN.png'),
        'pipeS': loadImage('assets/pipeS.png'),
        'bg': loadImage('assets/background-day.png'),
        'base': loadImage('assets/base.png')
    }
}

function setup() {
    createCanvas(500, 500);
    for(let _ = 0; _ < POPULATION; _++)
        birds.push( new Bird(assets['bird']) );
}

function draw() {
    background(21, 255, 5);
    image(assets['bg'], 0, 0, width, height);
    
    if(frameCount % FREQUENCY === 0)
    pipes.push( new Pipe(assets['pipeN'], assets['pipeS']) );
    
    for(let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].update();
        pipes[i].show();
        
        if(pipes[i].offscreen())
        pipes.splice(i, 1);
        
        for(let j = birds.length - 1; j >= 0; j--) {
            if(birds[j].hits(pipes[i]))
                birds.splice(j,1);
        }
    }
        
    for(let i = birds.length - 1; i >= 0; i--) {
        birds[i].update();
        birds[i].show();

        if(birds[i].offscreen(BASE_W))
            birds.splice(i, 1);
    }
    
    image(assets['base'], 0, height - BASE_W, width, BASE_W);
}

function keyPressed() {
    if(key == ' ')
        birds.forEach(function(bird) {
            bird.up();
        });
}