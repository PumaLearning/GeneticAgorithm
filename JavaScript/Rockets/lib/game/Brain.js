class Brain {
  constructor(len) {
    this.step = 0
    this.loop = 1
    this.delta = 0.5
    this.thought = []
    for(let i = 0; i < len; i++)
      this.thought.push(createVector(random() *  this.delta - this.delta / 2, random() *  this.delta - this.delta / 2))
  }

  think() {
    var move = this.thought[this.step]
    if(this.step === this.thought.length - 1) {
      this.loop++
      this.step = 0
    } else this.step++
    return createVector(move.x, move.y)
  }

  clone() {
    let _brain = new Brain(this.thought.length)
    _brain.thought = this.thought.slice()
    return _brain
  }

  mutate() {
    let ratio = 0.01
    for(let i in this.thought)
      if(random() < ratio)
        this.thought[i] = createVector(random() *  this.delta - this.delta / 2, random() *  this.delta - this.delta / 2)
  }
}