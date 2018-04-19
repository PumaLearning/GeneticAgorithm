let objetivo;
let modelo_len;
let num_individuos;
let generacion_actual;
let padres_reproductores;
let probabilidad_mutacion;

function newChar() {
  let c = floor(random(63, 122)); // ?, @, A, B ... w, x, y, z
  if (c === 64) c = 46; // reemplazamos @ por puntos
  if (c === 92) c = 32; // reemplazamos \ por espacios

  return String.fromCharCode(c);
}

function Individuo() {
  let DNA = '';
  for (let i = 0; i < modelo_len; i++)
    DNA += newChar();
  return DNA;
}

function Poblacion() {
  let poblacion = [];
  for (let i = 0; i < num_individuos; i++)
    poblacion[i] = Individuo();
  return poblacion;
}

function Fitness(individuo) {
  let fitness = 0;
  for(let i = 0; i < modelo_len; i++)
    if(individuo[i] === objetivo[i])
      fitness++;
  return fitness;
}

function Seleccion(population) {
  let pares_puntuados = [];
  let padres_seleccionados = [];

  for(let i = 0; i < num_individuos; i++)
     pares_puntuados[i] = [ Fitness(population[i]), population[i] ];
  pares_puntuados.sort(
    function(par1, par2) { return par2[0] - par1[0] } );
  pares_puntuados.slice(0, padres_reproductores);
  for(let i = 0; i < padres_reproductores; i++)
    padres_seleccionados[i] = pares_puntuados[i][1];
  return padres_seleccionados;
}

function Reproduccion(padres) {
  let hijos = [];

  for(let i = 0; i < num_individuos; i++) {
    let padre = "", madre = "", hijo = "";
    let punto_mezcla = floor(random(1, modelo_len - 1));

    while(padre === madre) {
      padre = padres[floor(random(0, padres_reproductores - 1))];
      madre = padres[floor(random(0, padres_reproductores - 1))];
    }

    let nuevo_hijo = padre.substring(0, punto_mezcla).concat(madre.substring(punto_mezcla, madre.length));

    // <-- Crear una funcion aqui para evitar duplicados -->

    hijos[i] = nuevo_hijo;
  }

  return hijos;
}

function Mutacion(hijos) {
  for(let i = 0; i < num_individuos; i++) {
    if(random() <= probabilidad_mutacion) {
      let gen_mutacional = floor(random(0, modelo_len));
      nuevo_gen = newChar();
      while(nuevo_gen === hijos[i].charAt(gen_mutacional))
        nuevo_gen = newChar();
      hijos[i] = hijos[i].substring(0, gen_mutacional) + nuevo_gen + hijos[i].substring(gen_mutacional + 1);
    }
  }
  return hijos;
}

function MejorIndividuo(poblacion) {
  let mejor_individuo = [ -1, "" ];

  poblacion.forEach(function(individuo) {
    let fit = Fitness(individuo);
    if(fit > mejor_individuo[0])
      mejor_individuo = [ fit, individuo ];
  });

  return mejor_individuo;
}

function setup() {
  objetivo = "Suraei";
  generacion_actual = 0;

  num_individuos = 1000;
  padres_reproductores = 3;
  probabilidad_mutacion = 0.25;
  modelo_len = objetivo.length;

  frases = createP("");
}

function draw() {
  let poblacion = Poblacion();

  while(MejorIndividuo(poblacion)[0] != modelo_len && generacion_actual < 10000) {
    generacion_actual++;
    poblacion = Mutacion(Reproduccion(Seleccion(Poblacion())))
    frases.html("<h1>Mejor coincidencia: " + MejorIndividuo(poblacion)[1] + "</h1>");
  }

  console.log("Hemos tardado " + generacion_actual + " generaciones en encontrar " + MejorIndividuo(poblacion)[1])

  noLoop();
}
