import { makeNode } from "./utils";
import svgs from "./svgs";

class Footer {
  constructor(links) {
    const footerNode = makeNode(document.body, "footer", "footer");
    const { leftSidetitle, linkedInLink, instagramLink, emailLink } = links;

    const copyRight = makeNode(footerNode, "copyright", "div");
    copyRight.innerHTML = `© ${leftSidetitle} ${new Date().getFullYear()}`;
    copyRight.classList.add("link");

    const footerLinks = makeNode(footerNode, "footer-links", "div");

    const linkCongig = [
      {
        link: linkedInLink,
        text: "linkedIn",
        icon: svgs.linkedin
      },
      {
        link: instagramLink,
        text: "intagram",
        icon: svgs.instagram
      },
      {
        link: emailLink,
        text: "email me",
        icon: svgs.email
      }
    ];

    linkCongig.forEach(link => {
      if (link.link) {
        const linkNode = makeNode(footerLinks, "footer-link", "a");
        linkNode.classList.add("link");

        if (link.link === emailLink) {
          linkNode.setAttribute(
            "href",
            `mailto:${link.link}?subject=Hi Charlie!`
          );
        } else {
          linkNode.setAttribute("target", "_blank");
          linkNode.setAttribute("href", link.link);
        }

        const linkText = makeNode(linkNode, "footer-link-text", "div");
        linkText.textContent = link.text;

        const linkIcon = makeNode(linkNode, "footer-link-icon", "div");
        linkIcon.innerHTML = link.icon;
      }
    });
  }
}

export default Footer;
