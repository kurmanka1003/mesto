export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach((item) => {
      const card = this._renderer(item);
      this.addItem(card);
    });
  }

  addItem(element) {
    this._containerElement.prepend(element);
  }
}
