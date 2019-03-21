import { randomRoundInRange, makeNode } from "./utils";

const nameBGContainer = images => {
  function getRandomImageURL() {
    const randomImageURL = images[randomRoundInRange(0, images.length - 1)];
    const lastBackgroundURL = window.localStorage.getItem("backgroundURL");
    if (lastBackgroundURL === randomImageURL) {
      return getRandomImageURL();
    }
    window.localStorage.setItem("backgroundURL", randomImageURL);
    return randomImageURL;
  }

  const nameBGContainer = makeNode(document.body, "name-bg-container");
  nameBGContainer.classList.add("no-select");

  const imageNode = makeNode(nameBGContainer, "name-background", "img");
  imageNode.setAttribute("src", getRandomImageURL());
  imageNode.setAttribute("draggable", "false");
};

export default nameBGContainer;
