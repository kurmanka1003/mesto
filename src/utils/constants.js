export {
  userName,
  userNameInput,
  userDescriptionInput,
  popupProfileOpenButton,
  formProfile,
  formAddCard,
  formAvatar,
  popupProfileAddButton,
  popupProfileOpenAvatar,
  validationConfig,
};

const popupEditForm = document.querySelector(".popup-edit");

const userName = document.querySelector(".profile__name");

const popupProfileOpenButton = document.querySelector(".profile__edit-button");
const formProfile = document.querySelector('[name="info"]');

const formAddCard = document.querySelector(".form_add-card");
const popupProfileAddButton = document.querySelector(".profile__add-button");

const userNameInput = popupEditForm.querySelector('[name="name"]');
const userDescriptionInput = popupEditForm.querySelector('[name="about"]');

const formAvatar = document.querySelector(".form_avatar");
const popupProfileOpenAvatar = document.querySelector(
  ".profile__avatar-button"
);

const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inputErrorClass: "form__input_type_error",
};
