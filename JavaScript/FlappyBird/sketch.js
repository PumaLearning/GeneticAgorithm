var img_bg;
var img_bird;
var img_tuboN;
var img_tuboS;

var poblacion;
var num_tubos;
var obstaculos;

var NUM_INDIVIDUOS = 2; //50;
var ESPACIO_TUBOS = 150;
var DISTANCIA_TUBOS = 107;

var individuos_muertos;

function preload() {
    img_bg = loadImage('assets/background-day.png');
    img_bird = loadImage('assets/yellowbird-upflap.png');
    img_tuboN = loadImage('assets/pipe-greenN.png');
    img_tuboS = loadImage('assets/pipe-greenS.png');
}

function setup() {
    createCanvas(400, 400);

    individuos_muertos = 0;

    poblacion = [];
    for(var i = 0; i < NUM_INDIVIDUOS; i++)
        poblacion.push(new Bird(img_bird));

    num_tubos = round(width / (img_tuboN.width + DISTANCIA_TUBOS));
    obstaculos = [];
    for(var j = 0; j < num_tubos; j++)
        obstaculos.push(new Pipe(j, img_tuboN, img_tuboS, ESPACIO_TUBOS, DISTANCIA_TUBOS, num_tubos));
}

function draw() {
    background(244, 66, 167);
    image(img_bg,0,0,width,height);

    poblacion.forEach(function(individuo) {
        individuo.update();
        individuo.show();
    });
    
    obstaculos.forEach(function(obstaculo) {
        obstaculo.update();
        obstaculo.show();

        poblacion.forEach(function(individuo) {
            if(!individuo.isDead && obstaculo.check(individuo)) {
                individuo.dead();
                individuos_muertos++;
            }
        });
    });
}