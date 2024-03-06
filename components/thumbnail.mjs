import Router from './router.mjs';

export default class Thumbnail {
  constructor(props) {
    this.props = props;

    document.addEventListener(
      'click',
      (e) =>
        e.target &&
        e.target.classList.contains('link-button') &&
        this.onLinkClicked(e)
    );
  }

  // When a link button is clicked, prevent the default behavior of the click event (i.e., navigating to a new page) and stop the event from propagating further up the DOM tree. Then extract the "title" and "link" data from the clicked button element's dataset and pass it to the Router instance's pushHistory method to update the browser's history.
  onLinkClicked(e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    const { title, link } = e.target.dataset;
    Router.instance.pushHistory({ title, link });
  }

  render() {
    return `
      <div class="thumbnail">
        <img src="${this.props.srcThumbnail}" alt="painting">
        <div class="caption">
          <h3>${this.props.title}</h3>
          <p>${this.props.shortDesc}</p>
          <button data-title="${this.props.title}" data-link="/single-photo?id=${this.props.id}" class="btn btn-primary link-button" role="button">See more</button>
        </div>
      </div>
    `;
  }
}
