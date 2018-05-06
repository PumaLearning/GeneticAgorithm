const OBJETIVO = "Pizza con piña"

const RATIO_MUTACION = 0.01
const POBLACION_TOTAL = 147

let DOMs
let poblacion
let generacion

function setup() {

    
    let DOM_Objetivo = createP(">> Objetivo: " + OBJETIVO)
    DOM_Objetivo.class('objetivo')
    DOM_Objetivo.position(30,20)
    this.DOMs = []
    let y = 0
    let rows = 7
    for(let x = 0; x < POBLACION_TOTAL; x++) {
        if( x % rows === 0) y += 35
        this.DOMs[x] = createP('')
        this.DOMs[x].position((x % rows) * 200 + 20, y + 100)
    }
    
    this.poblacion = []
    this.generacion = 0

    for(let i = 0; i < POBLACION_TOTAL; i++)
        this.poblacion[i] = new ADN(OBJETIVO.length)
}

function draw() {

    this.generacion++
    // FITNESS
    this.poblacion.forEach(individuo => individuo.calcularFitness(OBJETIVO));

    // SELECCION
    let padres = []
    for(let i = 0; i < this.poblacion.length; i++) {
        let probabilidad_de_ligar = floor(this.poblacion[i].fitness * 100)
        for(let j = 0; j < probabilidad_de_ligar; j++)
            padres.push(this.poblacion[i])
    }
    // REPRODUCCION
    for(let i = 0; i < POBLACION_TOTAL; i++) {
        let padre = padres[ floor(random(padres.length)) ]
        let madre = padres[ floor(random(padres.length)) ]
        let hijo = padre.cruzar(madre)
        // MUTACION
        hijo.mutar(RATIO_MUTACION)
        this.poblacion[i] = this.poblacion[i].fitness !== 1 ? hijo : this.poblacion[i]
    }
    
    for(let i = 0; i < this.poblacion.length; i++)
        this.DOMs[i].html(this.poblacion[i].toString())
}