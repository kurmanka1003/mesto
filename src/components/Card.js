export default class Card {
  constructor(
    cardData,
    handleCardClick,
    handleLikeClick,
    handleTrashBinClick,
    templateSelector,
    userId
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleTrashBinClick = handleTrashBinClick;
    this._ownerId = cardData.owner._id;
    this.cardId = cardData._id;
    this._likes = cardData.likes;
    this._myId = userId;
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
      this._handleLikeClick(this, this.hasMyLike);
    });

    this._buttonDelete.addEventListener("click", () => {
      this._handleTrashBinClick(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector(".cards__image");
    this._cardTitle = this._element.querySelector(".cards__name");
    this._buttonLike = this._element.querySelector(".cards__like-button");
    this._buttonDelete = this._element.querySelector(".cards__delete-button");
    this._likeCounter = this._element.querySelector(".cards__like-counter");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._likeCounter.textContent = this._likes.length;
    // this.hasMyLike = this._likes.some((like) => like._id === this._myId);

    if (this._ownerId != this._myId) {
      this._buttonDelete.remove();
    }

    if (this._likes.some((like) => like._id === this._myId)) {
      this._buttonLike.classList.add("cards__like-button_liked");
    }

    this._setEventHandlers();

    return this._element;
  }

  changeMyLike(newLikes) {
    this._likes = newLikes;

    this._buttonLike.classList.add("cards__like-button_liked");
    this._likeCounter.textContent = newLikes.length;

    this.hasMyLike = this._likes.some((like) => like._id === this._myId);
    if (this.hasMyLike) {
      this._buttonLike.classList.add("cards__like-button_liked");
    } else {
      this._buttonLike.classList.remove("cards__like-button_liked");
    }
  }

  removeCardFromServer() {
    this._element.remove();
    this._element = null;
  }
}
