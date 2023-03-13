export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach((item) => {
      return this._renderer(item)
    })
  }

  addItem(element) {
    this._containerElement.prepend(element);
  }
}