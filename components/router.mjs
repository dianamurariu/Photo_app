export default class Router {
  // Singleton instance
  static $instance = null;

  constructor() {
    // Array of listeners for history changes
    this.listeners = [];

    // Register listener for history changes
    window.addEventListener("popstate", this.onHistoryChange.bind(this), false);
  }

  // Add listener for history changes
  subscribe(listener) {
    this.listeners.push(listener);
  }

  // Notify all registered listeners of history changes
  notifyListeners(state) {
    this.listeners.forEach(listener => listener(state));
  }

  // Push new state to history and notify listeners
  pushHistory(state) {
    history.pushState(state, state.title, state.link);
    this.notifyListeners(state);
  }
 
  // Handle history changes by notifying listeners
  onHistoryChange(event) {
    this.notifyListeners(event.state);
  }

  // Singleton getter
  static get instance() {
    
    // Create a new Router instance if one doesn't exist
    if(Router.$instance === null) {
      Router.$instance = new Router();
    }

    return Router.$instance;
  }
}