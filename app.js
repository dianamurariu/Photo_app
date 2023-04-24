
import Title from "./components/title.mjs";
import PhotoGrid from "./components/photoGrid.mjs";
import DataHandler from "./components/dataHandler.mjs";
import SinglePhoto from "./components/singlePhoto.mjs";
import Router from "./components/router.mjs";

class App {
  constructor() {
    // Initialize the data property to null
    this.data = null;

    // Subscribe to the Router instance and bind the onRouteChanged method to the current instance of App
    Router.instance.subscribe(this.onRouteChanged.bind(this));
  }

  // Clean up the App by removing the main element with class 'app' from the DOM
  cleanApp() {
    const app = document.querySelector(".app");

    if(app) {
      document.querySelector("body").removeChild(app);
    }
  }

  // Called when the route changes, renders the appropriate component based on the state
  onRouteChanged(state) {
    this.render(state);
  }

  // Returns the component to be rendered based on the state
  componentToRender(state) {

    // If the state is null or the link is '/', render the PhotoGrid component
    if(state === null || state.link === '/') {
      return new PhotoGrid(this.data).render();
    }
    
    // If the link includes '/single-photo?id', render the SinglePhoto component
    if(state.link.includes("/single-photo?id")) {

      // Find the photo data for the id in the link
      const singlePhotoData = this.data.find(d => d.id === Number(state.link.split("=")[1]));

      // If the data is found, render the SinglePhoto component
      if(singlePhotoData) {
        return new SinglePhoto(singlePhotoData).render();
      }
    }

    // Otherwise, return a 'Page not found' message
    return `<h1 class="text-center">Page not found</h1>`
  }

  // Renders the App
  async render(state = null) {

    // If the data is null, fetch it from the server
    if(this.data == null) {
      this.data = await DataHandler.fetchData();
    }

    // Clean up the App
    this.cleanApp();

    // Create a new main element
    const main = document.createElement("main");
    // Create a new document fragment
    const documentFragment = document.createDocumentFragment();

    // Add the 'app' class to the main element
    main.classList.add("app");

    // Render the Title component and add it to the main element
    // Render the appropriate component based on the state and add it to the main element
    main.innerHTML = `
      ${new Title().render()}
      ${this.componentToRender(state)}
    `;
    
    // Append the main element to the document fragment
    documentFragment.appendChild(main);
    // Append the main element to the body of the document
    document.querySelector("body").appendChild(documentFragment.firstElementChild);
  }
}

// Create a new instance of App
const app = new App();
// Render the App
app.render();