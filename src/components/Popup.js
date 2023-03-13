export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  openPopup() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keyup", this._handleEscClose);
  }

  closePopup() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  _handleEscClose(evt) {
    const key = evt.key;
    if (key === "Escape") {
      this.closePopup();
    }
  }

  _handleCloseByClick(evt) {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close")
    ) {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      this._handleCloseByClick(evt);
    });
  }
}
