// import the Router module from "./router.mjs"
import Router from "./router.mjs";

// export a class called Title as the default export
export default class Title {

  // define the constructor method of Title
  constructor() {

    // set the heading and subHeading properties of a Title instance
    this.heading = "Diana's Painting Gallery";
    this.subHeading = "Enjoy !";

    // add an event listener for click events on the document
    // when a title-link element is clicked, call the onTitleLinkClicked method of the current instance of Title
    document.addEventListener('click', (e) => (e.target && e.target.classList.contains("title-link")) && this.onTitleLinkClicked(e));
  }

  // define the onTitleLinkClicked method of the Title class
  onTitleLinkClicked(e) {

    // prevent the default behavior of the click event
    e.preventDefault();
    // stop the propagation of the click event
    e.stopImmediatePropagation();
  
    // push a new history entry to the browser's history with a title of the current Title instance's heading property and a link of "/"
    Router.instance.pushHistory({ title: this.heading, link: "/" });
  }

  // define the render method of the Title class
  render() {

    // return a string with an HTML section element containing an h1 element with a class of "title-link" and the current Title instance's heading property,
    // and a p element with the current Title instance's subHeading property
    return `
      <section class="text-center jumbotron">
        <h1 class="title-link">${this.heading}</h1>
        <p>${this.subHeading}</p>
      </section>
   `;
  }
}