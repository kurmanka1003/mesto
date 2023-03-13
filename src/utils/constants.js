export {
  popupProfileOpenButton,
  formProfile,
  formAddCard,
  popupProfileAddButton,
  validationConfig
};

const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const formProfile = document.querySelector('[name="info"]');

const formAddCard = document.querySelector('.form_add-card');
const popupProfileAddButton = document.querySelector('.profile__add-button');

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inputErrorClass: 'form__input_type_error',
};