export default class Card {
    constructor(item, templateSelector, openPicturePopup) {
        this._name = item.name;
        this._link = item.link;
        this._openPicturePopup = openPicturePopup;
        this._templateSelector = templateSelector;
    };

    _getTemplate() {
        const cardTemplate = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.cards__element')
            .cloneNode(true);

        return cardTemplate;
    };

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._likeCard();
        });

        this._deleteButton.addEventListener('click', () => {
            this._deleteCard();
        });

        this._cardImage.addEventListener('click', () => {
            this._openPicturePopup(this._link, this._name)
        });
    };

    generateCard() {
        this._element = this._getTemplate();

        this._cardImage = this._element.querySelector('.cards__image');
        this._cardTitle = this._element.querySelector('.cards__name');
        this._likeButton = this._element.querySelector('.cards__like-button');
        this._deleteButton = this._element.querySelector('.cards__delete-button');

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardTitle.textContent = this._name;

        this._setEventListeners();

        return this._element;
    };

    _likeCard() {
        this._likeButton.classList.toggle('cards__like-button_liked');
    };

    _deleteCard() {
        this._element.remove();
    };
}