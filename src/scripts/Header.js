import { makeNode } from "./utils";

import router from "./router";

class Header {
  constructor(options = {}) {
    this.menuPosts = options.vimeoPosts;
    this.aboutMe = options.aboutMe;

    this.header = makeNode(document.body, "header", "header");

    this.initMenu();
    this.initWhosCharlie();
  }
  initMenu() {
    const menu = makeNode(this.header, "menu", "span");
    const menuButton = makeNode(menu, "menu-button");
    menuButton.classList.add("link");
    menuButton.textContent = "menu";
    const menuItems = makeNode(menu, "menu-items");

    menuButton.addEventListener("click", () => {
      menuItems.classList.toggle("open");
    });

    menuItems.addEventListener("click", () => {
      menuItems.classList.remove("open");
    });

    this.menuPosts.sort((postA, postB) => {
      if (!postA.fields.sortOrder) return 1;
      if (!postB.fields.sortOrder) return -1;
      return postA.fields.sortOrder - postB.fields.sortOrder;
    });

    this.menuPosts.forEach(post => {
      const { title, linkTitle } = post.fields;

      const menuLink = makeNode(menuItems, "link", "span");
      menuLink.textContent = title;

      menuLink.addEventListener("click", () => {
        router.pushHistoryState(linkTitle ? linkTitle : title);
      });
    });
  }
  initWhosCharlie() {
    const rightLinks = makeNode(this.header, "right-links");

    const aboutMe = makeNode(rightLinks, "link", "span");
    const { title, linkTitle } = this.aboutMe.fields;
    aboutMe.textContent = title;

    aboutMe.addEventListener("click", () => {
      router.pushHistoryState(linkTitle);
    });
  }
}

export default Header;

// ROUTER
