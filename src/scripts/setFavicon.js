const setFavicon = faviconURL => {
  var link =
    document.querySelector("link[rel*='icon']") ||
    document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = faviconURL;
  document.getElementsByTagName("head")[0].appendChild(link);
};

export default setFavicon;
