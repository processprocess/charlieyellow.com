export function makeNode(parentNode, className = " ", nodeType = "div") {
  const node = document.createElement(nodeType);
  node.classList.add(className);
  parentNode.appendChild(node);
  return node;
}

export function randomRoundInRange(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

export function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

export function rangeIntersect(min0, max0, min1, max1) {
  return (
    Math.max(min0, max0) >= Math.min(min1, max1) &&
    Math.min(min0, max0) <= Math.max(min1, max1)
  );
}

export function rectIntersect(r0, r1) {
  return (
    rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) &&
    rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height)
  );
}

export function addBroswerClassNames() {
  var isiPad = navigator.userAgent.match(/iPad/i) != null;
  if (isiPad) document.body.classList.add("iPad");
}
