import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector(".site__photo");
    this._title = this._popupElement.querySelector(".site__caption");
  }

  openPopup(item) {
    this._image.src = item.link;
    this._title.textContent = item.name;
    this._image.alt = item.name;

    super.openPopup();
  }
}