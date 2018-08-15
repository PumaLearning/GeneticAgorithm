const POPULATION_NUMBER = 200

let pool
let target
let fitnessManager
let Population = []

let timer = 0
let minSteps = Infinity

let xSpeed = 1
let onlyBest = false

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
        individual.isDead = individual.brain.loop * individual.brain.step > minSteps 
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
      minSteps = pool.minSteps
    }


    timer++
  } while(timer % xSpeed !== 0)

  if(onlyBest) {
    Population[0].show()
    Population[1].show()
  } else {
  for(let individual of Population)
    individual.show()
  }
}

function keyReleased() {
  if(key == ' ') onlyBest = !onlyBest
}