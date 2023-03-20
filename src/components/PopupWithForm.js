import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(handleFormSubmit, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector(".form");
    this._submitButton = this._form.querySelector(".form__submit");
    this._permanentText = this._submitButton.textContent;
    this._inputList = Array.from(this._form.querySelectorAll(".form__input"));
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  // setInputValues(data) {
  //   this._inputList.forEach((input) => {
  //     input.value = data[input.name];
  //   });
  // }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Сохранение...";
    } else {
      this._submitButton.textContent = this._permanentText;
    }
  }
}
