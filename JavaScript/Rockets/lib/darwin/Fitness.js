class XYFitness {
  constructor(target) {
    this.target = target
  }

  calculateFitness(position) {
    return 1 / dist(position.x, position.y, this.target.x, this.target.y)
  }

  calculateFitnessPow(_obj, _pow) {
    return 1 / pow(dist(_obj.pos.x, _obj.pos.y, this.target.x, this.target.y), _pow)    
  }
}