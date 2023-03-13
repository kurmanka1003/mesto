import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector(".site__photo");
    this._title = this._popupElement.querySelector(".site__caption");
  }

  openPopup(cardData) {
    this._image.src = cardData.link;
    this._title.textContent = cardData.name;
    this._image.alt = cardData.name;

    super.openPopup();
  }
}