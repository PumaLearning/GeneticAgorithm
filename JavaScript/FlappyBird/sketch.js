var img_bg;
var img_bird;
var img_tuboN;
var img_tuboS;

var poblacion;
var num_tubos;
var max_score;
var obstaculos;

var NUM_INDIVIDUOS = 80; //50;
var ESPACIO_TUBOS = 150;
var DISTANCIA_TUBOS = 107;

var individuos_muertos;

var TUBOS_ESTATICOS = [ 220, 253, 254, 200, 248, 308, 250, 276, 300, 300, 222, 265, 185, 315, 212 ];
// TUBOS_ESTATICOS = [];

function preload() {
    img_bg = loadImage('assets/background-day.png');
    img_bird = loadImage('assets/yellowbird-upflap.png');
    img_tuboN = loadImage('assets/pipe-greenN.png');
    img_tuboS = loadImage('assets/pipe-greenS.png');
}

function setup() {
    createCanvas(400, 400);

    max_score = 0;
    individuos_muertos = 0;

    poblacion = [];
    for(var i = 0; i < NUM_INDIVIDUOS; i++)
        poblacion.push(new Bird(img_bird));

    num_tubos = round(width / (img_tuboN.width + DISTANCIA_TUBOS));
    obstaculos = [];
    for(var j = 0; j < num_tubos; j++)
        obstaculos.push(new Pipe(j, img_tuboN, img_tuboS, ESPACIO_TUBOS, DISTANCIA_TUBOS, num_tubos, TUBOS_ESTATICOS));
}

function draw() {
    background(244, 66, 167);
    image(img_bg,0,0,width,height);

    individuos_muertos = 0;
    obstaculos.forEach(function(obstaculo) {
        obstaculo.update();
        obstaculo.show();

        poblacion.forEach(function(individuo) {
            if(!individuo.isDead && obstaculo.check(individuo)) individuo.dead();
        });
    });
    
    poblacion.forEach(function(individuo) {
        if(individuo.isDead) individuos_muertos++;
        else {
            individuo.update();
            individuo.show();
            if(individuo.score > max_score) max_score = individuo.score;
        }
    });

    if(individuos_muertos === NUM_INDIVIDUOS) {
        var padres = [];
        poblacion.forEach(function(individuo) {
            var fitness = individuo.score / max_score * 100;
            for (var _ = 0; _ < fitness; _++) padres.push(individuo);
        });

        poblacion = [];
        for(var i = 0; i < NUM_INDIVIDUOS; i++) {
            var padre = padres[floor(random(padres.length))];
            var madre = padres[floor(random(padres.length))];
            poblacion.push(padre.aparearse(madre));
        }

        obstaculos = [];
        for(var j = 0; j < num_tubos; j++)
            obstaculos.push(new Pipe(j, img_tuboN, img_tuboS, ESPACIO_TUBOS, DISTANCIA_TUBOS, num_tubos, TUBOS_ESTATICOS));

        max_score = 0;
    }
    
}