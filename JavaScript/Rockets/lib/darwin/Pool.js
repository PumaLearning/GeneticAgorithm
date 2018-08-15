class Pool {
  constructor(parents) {
    this.fitSum = 0
    this.best = undefined
    this.parents = parents
    this.minSteps = Infinity
  }

  fitnessSum() {
    let bestFitness = 0
    for(let individual of this.parents) {
      this.fitSum += individual.fitness

      if(individual.fitness > bestFitness) {
        this.best = individual
        bestFitness = individual.fitness
      }
    }

    this.minSteps = this.best.brain.loop * this.best.brain.step
    console.log(minSteps)
  }

  selectParent() {
    let rand = random() * this.fitSum
    let runningSum = 0
    for(let i = 0; i < this.parents.length; i++) {
      runningSum += this.parents[i].fitness;
      if(runningSum > rand) {
        return this.parents[i];
      }
    }
  }

  gimmeBaby(daddy) {
    let baby = new Dot()
    baby.brain = daddy.brain.clone()
    return baby
  }

  
  nextGeneration() {
    let next = []
    this.fitnessSum()

    next[0] = this.gimmeBaby(this.best)
    next[0].c = color(0, 255, 0)
    
    for(let i = 1; i < this.parents.length; i++) {
      let daddy = this.selectParent()
      let child = this.gimmeBaby(daddy)
      child.brain.mutate()
      next[i] = child
    }

    return next
  }
}