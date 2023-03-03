import FormValidator from './FormValidator.js';
import Card from './Card.js';
import { initialCards } from './cards.js';

const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup-edit');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formProfile = document.querySelector('[name="info"]');
const formAddCard = document.querySelector('.form_add-card');
const nameInput = popupProfile.querySelector('[name="name"]');
const jobInput = popupProfile.querySelector('[name="job"]');
const popupProfileAddButton = document.querySelector('.profile__add-button');

const popupSite = document.querySelector('.popup-add');
const formSite = document.querySelector('[name="photo"]');
const siteInput = popupSite.querySelector('[name="name"]');
const linkInput = popupSite.querySelector('[name="link"]');
const popupPhoto = document.querySelector('.popup-site');
const popupPhotoPic = popupPhoto.querySelector('.site__photo');
const popupCaption = popupPhoto.querySelector('.site__caption');

const popups = document.querySelectorAll('.popup');
const closeButton = document.querySelectorAll('.popup__close');

const cardsContainer = document.querySelector('.cards__list');

const settingsObject = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inputErrorClass: 'form__input_type_error',
};
const formProfileValidator = new FormValidator(settingsObject, formProfile);
const formAddCardValidator = new FormValidator(settingsObject, formAddCard);

function openPopup(popup) {
    popup.classList.add('popup_opened');
    window.addEventListener('keyup', addListenerEsc);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    window.addEventListener('keyup', addListenerEsc);
}

function openPicturePopup(link, name) {
    popupPhotoPic.src = link;
    popupPhotoPic.alt = name;
    popupCaption.textContent = name;

    openPopup(popupPhoto);
};

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfile);
}

popupProfile.addEventListener('submit', handleFormSubmit);

function createCard(cardItem) {
    const cardElement = new Card(cardItem,'.template', openPicturePopup);
    return cardElement.generateCard();
};

function addCard(evt) {
    evt.preventDefault();
    const newCardName = siteInput.value;
    const newCardLink = linkInput.value;
    const newCardAdd = createCard({
        name: newCardName,
        link: newCardLink
    })
    cardsContainer.prepend(newCardAdd);

    closePopup(popupSite);
    formSite.reset();
}

formSite.addEventListener('submit', addCard);

function addListenerEsc(evt) {
    const key = evt.key;
    if (key == "Escape") {
        closePopup(document.querySelector('.popup_opened'));
    };
};

function clearErrorForm(form, settingsObject) {
    const inputList = Array.from(form.querySelectorAll(settingsObject.inputSelector));

    for (const input of inputList) {
        hideInputError(form, input, settingsObject);
    }

    form.reset();
}

function closePopupOutside(event, popup) {
    if (event == popup) {
        closePopup(popup);
    };
}

popupProfileOpenButton.addEventListener('click', (evt) => {
    openPopup(popupProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    popupProfileSendButton.setAttribute("disabled", true)
})

popupProfileAddButton.addEventListener('click', (evt) => {
    openPopup(popupSite);
    clearErrorForm(formAddCard, settingsObject);
    popupAddCardSendButton.setAttribute("disabled", true);
})

initialCards.forEach(item => {
    const cardHtml = createCard(item);
    cardsContainer.append(cardHtml);
});

closeButton.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
  });

popups.forEach((popup) => {
    popup.addEventListener('mousedown', function (event) {
        closePopupOutside(event.target, popup);
    });
});


formProfileValidator.enableValidation();
formAddCardValidator.enableValidation();
