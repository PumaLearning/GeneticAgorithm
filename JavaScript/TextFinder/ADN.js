function newChar() {
    let c = floor(random(65, 123))
    if (c === 91) c = 32 // Convertimos [ en espacios
    if (c === 92) c = 241 // Convertimos \ en ñ
    if (c === 93) c = 209 // Convertimos ] en Ñ

    return String.fromCharCode(c)
}

class ADN {
    constructor(numero_de_genes) {
        this.genes = []
        this.fitness = 0

        for(let i = 0; i < numero_de_genes; i++)
            this.genes[i] = newChar()
    }

    toString() {
        return this.genes.join('')
    }

    calcularFitness(OBJETIVO) {
        let puntuacion = 0

        for (let i = 0; i < this.genes.length; i++)
            if(this.genes[i] === OBJETIVO.charAt(i))
                puntuacion++
        this.fitness = puntuacion / this.genes.length
    }

    cruzar(compañero) {
        let hijo = new ADN(this.genes.length)

        let cromosoma_diferenciador = floor(random(this.genes.length))

        for(let i = 0; i < this.genes.length; i++) {
            if(i > cromosoma_diferenciador) hijo.genes[i] = this.genes[i]
            else hijo.genes[i] = compañero.genes[i]
        }

        return hijo
    }

    mutar(RATIO_MUTACION) {
        for (let i = 0; i < this.genes.length; i++)
            if(random(1) < RATIO_MUTACION)
                this.genes[i] = newChar()
    }
}