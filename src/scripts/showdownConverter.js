const showdown = require("showdown");

showdown.extension("targetlink", function() {
  return [
    {
      type: "html",
      regex: /(<a [^>]+?)(>.*<\/a>)/g,
      replace: '$1 target="_blank"$2'
    }
  ];
});

const converter = new showdown.Converter({ extensions: ["targetlink"] });

export default converter;
