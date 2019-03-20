import { createBrowserHistory } from "history";
import { inherits } from "util";

class Router {
  constructor() {
    this.history = createBrowserHistory({
      basename: "", // The base URL of the app (see below)
      forceRefresh: false, // Set true to force full page refreshes
      keyLength: 6, // The length of location.key
      // A function to use to confirm navigation with the user (see below)
      getUserConfirmation: (message, callback) =>
        callback(window.confirm(message))
    });
    this.subscribers = [];
    this.routes = {};
    this.addEventListeners();
  }
  add(node) {
    this.subscribers.push(node);
  }
  addEventListeners() {
    this.history.listen(location => {
      this.updateSubscribers(location.pathname);
    });
  }
  updateSubscribers(path) {
    if (!this.routes[path]) return;
    this.subscribers.forEach(subscriber => {
      subscriber.update(path);
    });
  }
  pushHistoryState(path) {
    if (!this.routes[`/${path}`]) return;
    this.history.push(`/${path}`);
  }
}

const router = new Router();

export default router;
