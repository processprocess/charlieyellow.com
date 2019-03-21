import converter from "./showdownConverter";
const eyeOpenImage = require("../../public/eye-open.png");
const eyeClosedImage = require("../../public/eye-closed.png");
import { makeNode } from "./utils";
import router from "./router";

class Modal {
  constructor() {
    this.modalWrapper = makeNode(document.body, "modal-wrapper");
    this.modalScrim = makeNode(this.modalWrapper, "modal-scrim");
    this.modalScrollableContent = makeNode(
      this.modalWrapper,
      "modal-scrollable-content"
    );
    this.modal = makeNode(this.modalScrollableContent, "modal");

    this.closeButtonWrapper = makeNode(this.modal, "close-button-wrapper");
    this.eyeOpen = makeNode(this.closeButtonWrapper, "image", "img");
    this.eyeOpen.classList.add("open");
    this.eyeOpen.setAttribute("src", eyeOpenImage);

    this.eyeClosed = makeNode(this.closeButtonWrapper, "image", "img");
    this.eyeClosed.classList.add("closed");
    this.eyeClosed.setAttribute("src", eyeClosedImage);

    const mobileModalCloseButton = makeNode(this.modalWrapper, "mobile-close");

    const closeClone = this.closeButtonWrapper.cloneNode(true);
    mobileModalCloseButton.appendChild(closeClone);

    this.modalContent = makeNode(this.modal, "modal-content");

    this.modalScrim.addEventListener("click", () =>
      router.pushHistoryState("")
    );
    this.closeButtonWrapper.addEventListener("click", () =>
      router.pushHistoryState("")
    );
    closeClone.addEventListener("click", () => router.pushHistoryState(""));

    this.modalWrapper.style.visibility = "hidden";
    this.modalContent.innerHTML = "";
  }
  update(path) {
    const { modalOpen, fields } = router.routes[path];
    modalOpen ? this.openModal(fields) : this.closeModal();
  }
  openModal(fields) {
    this.modalWrapper.style.visibility = "visible";
    if (this.modalWrapper.scroll) this.modalWrapper.scroll(0, 0);
    this.modalContent.innerHTML = this.makeModalHTML(fields);
  }
  closeModal() {
    document.querySelector(".menu-items").classList.remove("open");
    this.modalWrapper.style.visibility = "hidden";
    this.modalContent.innerHTML = "";
  }
  makeModalHTML(fields) {
    const { vimeoId, blurb } = fields;
    let html = "";
    if (vimeoId) {
      html += `
      <div id='vimeoEmbed' class="embed embed-16-9">
        <div id='loadingGif'></div>
        <iframe onload="vimeoEmbed.removeChild(loadingGif)" src="https://player.vimeo.com/video/${vimeoId}" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
      </div>
      `;
    }

    html += `
    <div class='modal-blurb-content'>
      ${converter.makeHtml(blurb)}
    </div>
    `;

    return html;
  }
}

export default Modal;

// only display iframe if there is a vimeoLink
