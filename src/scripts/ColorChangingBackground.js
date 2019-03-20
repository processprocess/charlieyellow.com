import { makeNode } from "./utils";

class ColorChangingBackground {
  constructor(parentNode) {
    this.parentNode = parentNode;
    this.node = makeNode(this.parentNode, "color-changing-background");
    this.speed = 0.25;
    this.startColor = 173;
    this.init();
  }
  init() {
    let tick = this.startColor || 0;
    const update = () => {
      this.node.style.backgroundColor = `hsl(${tick}, 100%, 66%)`;
      tick += this.speed;
      requestAnimationFrame(update);
    };
    update();
  }
}

export default ColorChangingBackground;
