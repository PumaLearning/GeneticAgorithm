class Target {
  constructor(x, y, d) {
    this.d = d
    this.pos = createVector(x, y)
  }

  show() {
    fill(255)
    strokeWeight(1)
    ellipse(this.pos.x, this.pos.y, this.d, this.d)
    
    fill(255, 0, 0)
    ellipse(this.pos.x, this.pos.y, this.d / 2, this.d / 2)
  }
}