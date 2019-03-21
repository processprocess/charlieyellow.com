import { Vector } from "./Vector.js";

export class SpringConnection {
  constructor(options = {}) {
    this.dampening = options.dampening || 0.9;
    this.k = options.k || 0.001;
    this.springPoint = options.springPoint;
    this.spring = options.spring;
  }
  update() {
    const distance = Vector.sub(this.springPoint.pos, this.spring.pos);
    const springForce = Vector.mult(distance, this.k);

    this.spring.vel.mult(this.dampening);
    this.spring.vel.add(springForce);
  }
}
