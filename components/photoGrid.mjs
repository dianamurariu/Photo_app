import Thumbnail from "./thumbnail.mjs";

export default class PhotoGrid {
  constructor(data) {

    // Initialize data property with the data parameter
    this.data = data;
    // Initialize thumbnails property as an empty array
    this.thumbnails = [];
    // Initialize _nume property as an empty string
    this._nume = "";
  }

  // Define a getter method named thumbnailMarkup
  get thumbnailMarkup() {

    // Initialize a local variable named thumbnailsHTML as an empty string
    let thumbnailsHTML = "";
    // Iterate over each thumbnail in the thumbnails array and add the HTML for the thumbnail to the thumbnailsHTML string
    this.thumbnails.forEach(thumbnail => thumbnailsHTML += `<div class="col-md-4 col-xs-6">${thumbnail.render()}</div>`);

    // Return the thumbnailsHTML string
    return thumbnailsHTML;
  }

  // Define a method named componentWillRender
  componentWillRender() {

    // Check if the thumbnails array already contains thumbnails
    if(this.thumbnails.length > 0) {
      // If it does, do nothing and return
      return;
    }

    // If the thumbnails array is empty, iterate over each data item and create a new thumbnail using the Thumbnail class. Then add each thumbnail to the thumbnails array.
    this.data.forEach(thumbnail => this.thumbnails.push(new Thumbnail(thumbnail)));
  }

  // Define a method named render
  render() {

    // Call the componentWillRender method to ensure that the thumbnails array is populated
    this.componentWillRender();

    // Return an HTML string containing the markup for the photo grid, including the thumbnails
    return `
      <div class="container">
            ${this.thumbnailMarkup}
        <div>
      <div> 
    `
  }
}