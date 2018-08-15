const xSpeed = 1
const POPULATION_NUMBER = 200

let pool
let target
let fitnessManager
let Population = []

let timer = 0

function setup() {
  createCanvas(600, 600)

  for(let i = 0; i < POPULATION_NUMBER; i++)
    Population.push(new Dot())

  target = new Target(width / 2, 40, 20)
  fitnessManager = new XYFitness(target.pos)
}

function draw() {
  background(240)
  target.show()

  do {
    for(let individual of Population) {
      if(!individual.isDead) {
        individual.update()
        individual.checkTarget(target)
        individual.stats(fitnessManager)
      }
    }

    let ko = 0
    while(ko !== POPULATION_NUMBER && Population[ko].isDead)
    ko++
    
    if(ko === POPULATION_NUMBER) {
      let pool = new Pool(Population)
      Population = pool.nextGeneration()
    }

    timer++
  } while(timer % xSpeed !== 0)

  for(let individual of Population)
    individual.show()

}