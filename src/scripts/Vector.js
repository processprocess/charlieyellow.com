export class Vector {
  constructor(options = {}) {
    this.x = options.x || 0;
    this.y = options.y || 0;
  }
  set(vec) {
    this.x = vec.x;
    this.y = vec.y;
  }
  add(vec) {
    this.x += vec.x;
    this.y += vec.y;
  }
  sub(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
  }
  mult(num) {
    this.x *= num;
    this.y *= num;
  }
  div(num) {
    this.x /= num;
    this.y /= num;
  }
  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  norm() {
    const m = this.mag();
    if (m != 0) {
      this.div(m);
    }
  }
  limit(topSpeed) {
    if (this.mag() > topSpeed) {
      this.norm();
      this.mult(topSpeed);
    }
  }
  static copy() {
    return new Vector({ x: this.x, y: this.y });
  }
  static add(v1, v2) {
    return new Vector({ x: v1.x + v2.x, y: v1.y + v2.y });
  }
  static sub(v1, v2) {
    return new Vector({ x: v1.x - v2.x, y: v1.y - v2.y });
  }
  static mult(vec, num) {
    return new Vector({ x: vec.x * num, y: vec.y * num });
  }
  static div(vec, num) {
    return new Vector({ x: vec.x / num, y: vec.y / num });
  }
  static distance(v1, v2) {
    const dx = v1.x - v2.x;
    const dy = v1.y - v2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
