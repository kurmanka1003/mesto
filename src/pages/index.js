import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

import { initialCards } from "../utils/initialCards.js";
import {
  popupProfileOpenButton,
  formProfile,
  formAddCard,
  popupProfileAddButton,
  validationConfig,
} from "../utils/constants.js";

const formProfileValidator = new FormValidator(validationConfig, formProfile);
const formAddCardValidator = new FormValidator(validationConfig, formAddCard);

formProfileValidator.enableValidation();
formAddCardValidator.enableValidation();

const cardSection = new Section(
  {
    renderer: (item) => cardSection.addItem(createCard(item)),
  },
  ".cards__list"
);

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__job",
});

const popupWithEditForm = new PopupWithForm(
  ".popup-edit",
  handleEditProfileFormSubmit
);
popupWithEditForm.setEventListeners();

const popupWithAddForm = new PopupWithForm(".popup-add", (item) => {
  cardSection.addItem(createCard(item));
  popupWithAddForm.closePopup();
});
popupWithAddForm.setEventListeners();

const popupWithImage = new PopupWithImage(".popup_image");
popupWithImage.setEventListeners();

function createCard(cardItem) {
  return new Card(cardItem, ".template", () =>
    popupWithImage.openPopup(cardItem)
  ).generateCard();
}

function handleEditProfileFormSubmit(value) {
  userInfo.setUserInfo(value.name, value.job);
  popupWithEditForm.closePopup();
}

function openEditProfile() {
  formProfileValidator.removeValidationErrors();
  const data = userInfo.getUserInfo();
  popupWithEditForm.setInputValues(data);
  popupWithEditForm.openPopup(data);
}

function openAddCardPopup() {
  formAddCardValidator.removeValidationErrors();
  popupWithAddForm.openPopup();
}

popupProfileAddButton.addEventListener("click", () => openAddCardPopup());
popupProfileOpenButton.addEventListener("click", () => openEditProfile());

cardSection.renderItems(initialCards.reverse());
