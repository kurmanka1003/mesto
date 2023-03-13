export default class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".cards__element")
      .cloneNode(true);

    return cardTemplate;
  }

  _setEventHandlers() {
    this._buttonLike.addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._buttonDelete.addEventListener("click", () => {
      this._deleteCard();
    });

    this._cardImage.addEventListener("click", () => {
      this.handleCardClick(this._cardImage, this._cardTitle);
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector(".cards__image");
    this._cardTitle = this._element.querySelector(".cards__name");
    this._buttonLike = this._element.querySelector(".cards__like-button");
    this._buttonDelete = this._element.querySelector(".cards__delete-button");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventHandlers();

    return this._element;
  }

  _handleLikeClick() {
    this._buttonLike.classList.toggle("cards__like-button_liked");
  }

  _deleteCard() {
    this._element.remove();
  }
}
