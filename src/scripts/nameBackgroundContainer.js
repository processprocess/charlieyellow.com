import { randomRoundInRange, makeNode } from "./utils";
import { inherits } from "util";

const nameBackgroundContainer = images => {
  function getRandomImageURL() {
    const randomImageURL = images[randomRoundInRange(0, images.length - 1)];
    const lastBackgroundURL = window.localStorage.getItem("backgroundURL");
    if (lastBackgroundURL === randomImageURL) {
      return getRandomImageURL();
    }
    window.localStorage.setItem("backgroundURL", randomImageURL);
    return randomImageURL;
  }

  const nameBackgroundContainer = makeNode(
    document.body,
    "name-background-container"
  );
  nameBackgroundContainer.classList.add("no-select");

  const animWrapperNode = makeNode(
    nameBackgroundContainer,
    "anim-wrapper-node"
  );

  const imageNode = makeNode(animWrapperNode, "name-background", "img");
  imageNode.setAttribute("src", getRandomImageURL());
  imageNode.setAttribute("draggable", "false");

  // this.initAnimation()
};

export default nameBackgroundContainer;
