import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector(".site__photo");
    this._title = this._popupElement.querySelector(".site__caption");
  }

  openPopup(name, link) {
    this._image.src = link;
    this._title.textContent = name;
    this._image.alt = name;

    super.openPopup();
  }
}
