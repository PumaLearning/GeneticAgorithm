class Dot {

  constructor() {
    this.d = 10
    this.c = color(255, 255, 255, 50)

    this.fitness = 0

    this.isDead = false
    this.targetReached = false
    this.brain = new Brain(400)

    this.pos = createVector(width/2, height - 20)
    this.vel = createVector()
    this.acc = createVector()
  }

  checkBounds() {
    if(this.pos.x > width - this.d / 2 || this.pos.x < this.d / 2 ||
      this.pos.y > height - this.d / 2 || this.pos.y < this.d / 2)
      this.isDead = true
  }

  checkTarget(target) {
    if(dist(this.pos.x, this.pos.y, target.pos.x, target.pos.y) <= this.d / 2 + target.d / 4)
      this.isDead = this.targetReached = true
  }

  update() {
    this.acc = this.brain.think()
    this.vel.add(this.acc)
    this.pos.add(this.vel)

    this.acc.mult(0)

    this.checkBounds()
  }

  stats(fitnessManager) {
    if(this.targetReached) 1 / pow(this.brain.step * this.brain.loop, 2)    
    else this.fitness = fitnessManager.calculateFitnessPow(this, 2)
  }

  show() {
    fill(this.c)
    ellipse(this.pos.x, this.pos.y, this.d, this.d)
  }
}