import '../styles/index.scss';
const contentful = require('contentful');
import { randomRoundInRange, makeNode, addBroswerClassNames } from './utils';
import ScrollingImages from './scrolling-images/Scrolling-Images';
import Header from './Header.js';
import Footer from './Footer.js';
import ColorChangingBackground from './ColorChangingBackground';
import setFavicon from './setFavicon';
import nameBGContainer from './nameBGContainer';
import Modal from './Modal';
import router from './router';

console.log(process);

var client = contentful.createClient({
  space: process.env.SPACE,
  accessToken: process.env.ACCESS_TOKEN
});

client.getEntries().then(entries => {
  // ADD BROWSER CLASSNAMES

  addBroswerClassNames();

  // COLOR CHANGING BACKGROUND

  new ColorChangingBackground(document.body);

  // MODAL

  const modal = new Modal();
  router.add(modal);

  // HEADER

  const vimeoPosts = entries.items.filter(
    item => item.sys.contentType.sys.id === 'vimeoPosts'
  );
  const aboutMe = entries.items.find(
    item => item.sys.contentType.sys.id === 'aboutMe'
  );
  new Header({ vimeoPosts, aboutMe });

  // BUILD ROUTES

  vimeoPosts.forEach(post => {
    const { fields } = post;
    router.routes[`/${fields.linkTitle || fields.title}`] = {
      modalOpen: true,
      fields
    };
  });

  router.routes['/'] = {
    modalOpen: false,
    fields: {}
  };

  router.routes[`/${aboutMe.fields.linkTitle}`] = {
    modalOpen: true,
    fields: aboutMe.fields
  };

  // REDIRECT ON LOAD and REDIRECT NON-EXISTING ROUTE TO HOME

  const { pathname } = router.history.location;

  if (pathname !== '/') {
    if (!router.routes[pathname]) {
      router.history.push('');
    } else {
      router.updateSubscribers(pathname);
    }
  }

  // NAME BACKGROUND

  const images = entries.items
    .find(item => item.sys.id === '3gyOwqDYd0NHK6WfbUvRyU')
    .fields.nameBackgrounds.map(item => item.fields.file.url);

  nameBGContainer(images);

  // SCROLLING IMAGES

  const scrollingImages = entries.items
    .find(item => item.sys.id === '2LgwflXOW1cbQ6a0ju2LDi')
    .fields.imagesToDisplay.map(item => item.fields.file.url);

  new ScrollingImages(document.body, scrollingImages);

  // FOOTER

  const links = entries.items.find(
    item => item.sys.id === '3u2fnwdUeyaVxdX2xgBGqa'
  ).fields;

  new Footer(links);

  // FAVICON

  setFavicon(links.favicon.fields.file.url);
});
