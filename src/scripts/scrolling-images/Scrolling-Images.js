import {
  randomRoundInRange,
  makeNode,
  randomInRange,
  rectIntersect
} from "../utils";

const imageElements = [];

class ImageElement {
  constructor(options = {}) {
    this.options = options;
    this.parentNode = options.parentNode;
    this.images = options.images;
    this.node = makeNode(this.parentNode, "image-node-wrapper");
    this.imageNode = makeNode(this.node, "image-node", "img");
    this.imageNode.setAttribute("draggable", "false");

    this.node.style.zIndex = randomRoundInRange(0, 1);

    this.url = "";
    this.bcr = {};
    this.scale = 1;
    this.rotation = 0;
    this.vely = 0;
    this.x = 0;
    this.y = 0;

    this.imageLoaded = false;
    this.set(true);
  }

  setUniqueURL(tries = 0) {
    this.url = this.images[randomRoundInRange(0, this.images.length - 1)];

    if (tries > 30) {
      this.imageNode.setAttribute("src", `${this.url}`);
      return;
    }

    while (
      imageElements.some(el => {
        if (el === this) return;
        return el.url === this.url;
      })
    ) {
      return this.setUniqueURL(++tries);
    }

    this.imageNode.setAttribute("src", `${this.url}`);
  }

  getUniquePos(tries = 0) {
    if (tries > 30) return;
    this.x = this.getRandX();
    this.y = randomRoundInRange(0, window.innerHeight - this.height);
    while (
      imageElements.some(el => {
        if (el === this) return;
        return rectIntersect(this, el);
      })
    ) {
      return this.getUniquePos(++tries);
    }
  }

  getRandX() {
    const margin = window.innerWidth / 10;
    const maxRight = window.innerWidth - this.width - margin;
    return randomRoundInRange(margin, maxRight);
  }

  setDimensions() {
    const scaleBase = 800;
    const maxScale = 1.5;
    let scaleFactor = (window.innerWidth + window.innerHeight) / scaleBase;
    if (scaleFactor > maxScale) scaleFactor = maxScale;
    this.scale = randomInRange(0.2 * scaleFactor, 0.5 * scaleFactor);
    this.rotation = randomInRange(-30, 30);
    this.node.style.transform = `scale(${this.scale}) rotate(${
      this.rotation
    }deg)`;
    this.bcr = this.node.getBoundingClientRect();
    this.width = this.bcr.width;
    this.height = this.bcr.height;
  }

  set(firstLoad) {
    this.imageNode.style.display = "none";

    this.setUniqueURL();
    this.vely = randomInRange(-0.06, -0.3);

    this.imageNode.addEventListener("load", () => {
      this.imageLoaded = true;
      this.imageNode.style.display = "block";
      this.setDimensions();

      if (!firstLoad) {
        this.y = window.innerHeight + this.height / 2;
        this.x = this.getRandX();
      } else {
        if (this.options.x && this.options.y) {
          this.x = this.options.x - this.width / 2;
          this.y = this.options.y - this.height / 2;
        } else {
          this.getUniquePos();
        }
      }

      this.popIn();

      this.transformNode();
    });
  }

  update() {
    if (!this.imageLoaded) return; // if image is not loaded yet

    this.y += this.vely;

    if (this.y < -this.height) this.set();

    this.transformNode();
  }

  transformNode() {
    this.node.style.transform = `translate(${this.x}px,${this.y}px) 
    scale(${this.scale})
    rotate(${this.rotation}deg)`;
  }

  popIn() {
    requestAnimationFrame(() => {
      this.imageNode.classList.add("pop-in");
    });
  }

  destroy() {
    this.parentNode.removeChild(this.node);
  }
}

// SCROLLING IMAGES

class ScrollingImages {
  constructor(parentNode, images) {
    this.parentNode = parentNode;
    this.images = images;

    this.imageNode = makeNode(this.parentNode, "image-scroller");
    this.imageNode.classList.add("no-select");

    this.userTouch = false;

    this.init();

    window.addEventListener("resize", () => {
      this.init();
    });

    this.parentNode.addEventListener("touchstart", e => {
      this.userTouch = true;
      const x = e.touches[0].pageX;
      const y = e.touches[0].pageY;
      this.makeImageElement(x, y);
    });

    this.parentNode.addEventListener("click", e => {
      if (this.userTouch) return;
      const x = e.pageX;
      const y = e.pageY;
      this.makeImageElement(x, y);
    });
  }
  calcNumElements() {
    const scaleFactor = 150;
    const minElements = 10;
    let numElements = Math.round(
      (window.innerWidth + window.innerHeight) / scaleFactor
    );
    if (numElements < minElements) {
      numElements = minElements;
    }
    return numElements;
  }
  makeImageElement(x, y) {
    const imageElement = new ImageElement({
      parentNode: this.imageNode,
      images: this.images,
      x,
      y
    });

    imageElements.push(imageElement);
  }
  init() {
    while (imageElements.length > 0) imageElements.pop().destroy();
    cancelAnimationFrame(this.raf);

    const numElements = this.calcNumElements();

    for (let i = 0; i < numElements; i++) {
      setTimeout(() => {
        this.makeImageElement();
      }, 50 * i);
    }
    this.update();
  }
  update() {
    const updatefunc = () => {
      this.raf = requestAnimationFrame(updatefunc);
      imageElements.forEach(imageElement => {
        imageElement.update();
      });
    };
    updatefunc();
  }
}

export default ScrollingImages;
