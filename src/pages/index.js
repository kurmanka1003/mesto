import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import {
  userNameInput,
  userDescriptionInput,
  popupProfileOpenButton,
  formProfile,
  formAddCard,
  formAvatar,
  popupProfileAddButton,
  validationConfig,
  popupProfileOpenAvatar,
} from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-61/",
  headers: {
    authorization: "2e363b9c-286e-4357-a8e3-4c6ff58ded65",
    "content-Type": "application/json",
  },
});

const cardSection = new Section(
  {
    renderer: createCard,
  },
  ".cards__list"
);

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__job",
  avatarSelector: ".profile__avatar",
});

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userServerData, cardsData]) => {
    userInfo.setUserInfo(userServerData);
    cardSection.renderItems(cardsData);
  })
  .catch((err) => {
    alert(err);
  });

const formProfileValidator = new FormValidator(validationConfig, formProfile);
const formAddCardValidator = new FormValidator(validationConfig, formAddCard);
const formAvatarValidator = new FormValidator(validationConfig, formAvatar);

formProfileValidator.enableValidation();
formAddCardValidator.enableValidation();
formAvatarValidator.enableValidation();

const popupWithEditForm = new PopupWithForm(
  handleEditProfileFormSubmit,
  ".popup-edit"
);
popupWithEditForm.setEventListeners();

const popupWithAddForm = new PopupWithForm(handleAddFormSubmit, ".popup-add");
popupWithAddForm.setEventListeners();

const popupWithImage = new PopupWithImage(".popup_image");
popupWithImage.setEventListeners();

const popupWithAvatarForm = new PopupWithForm(
  handleAvatarFormSubmit,
  ".popup_avatar"
);
popupWithAvatarForm.setEventListeners();

const popupWithDeleteVerification = new PopupWithConfirmation(
  handleRemoveSubmit,
  ".popup_delete"
);
popupWithDeleteVerification.setEventListeners();

function createCard(data) {
  const newCard = new Card(
    data,
    handleCardClick,
    handleLikeClick,
    handleTrashBinClick,
    ".template",
    userInfo.returnMyId()
  );

  const newCardElement = newCard.generateCard();
  return newCardElement;
}

function handleEditProfileFormSubmit(data) {
  popupWithEditForm.renderLoading(true);
  api
    .changeUserData(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupWithEditForm.closePopup();
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
      popupWithEditForm.renderLoading(false);
    });
}

function handleAddFormSubmit(data) {
  popupWithAddForm.renderLoading(true);
  api
    .addCardtoServer(data)
    .then((res) => {
      cardSection.addItem(createCard(res));
      popupWithAddForm.closePopup();
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
      popupWithAddForm.renderLoading(false);
    });
}

function handleAvatarFormSubmit(avatar) {
  popupWithAvatarForm.renderLoading(true);
  api
    .changeAvatar(avatar)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupWithAvatarForm.closePopup();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupWithAvatarForm.renderLoading(false);
    });
}

function handleRemoveSubmit(card) {
  popupWithDeleteVerification.renderLoading(true);
  api
    .deleteCard(card.cardId)
    .then(() => {
      card.removeCardFromServer();
      popupWithDeleteVerification.closePopup();
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
      popupWithDeleteVerification.renderLoading(false);
    });
}

function handleCardClick(name, link) {
  popupWithImage.openPopup(name, link);
}

function handleLikeClick(card) {
  if (card.hasMyLike) {
    api
      .deleteLikeFromCard(card.cardId)
      .then((res) => {
        card.changeMyLike(res.likes);
      })
      .catch((err) => {
        alert(err);
      });
  } else {
    api
      .addLikeToCard(card.cardId)
      .then((res) => {
        card.changeMyLike(res.likes);
      })
      .catch((err) => {
        alert(err);
      });
  }
}

function handleTrashBinClick(card) {
  popupWithDeleteVerification.openPopup(card);
}

popupProfileOpenAvatar.addEventListener("click", () => {
  formAvatarValidator.removeValidationErrors();
  popupWithAvatarForm.openPopup();
});

popupProfileOpenButton.addEventListener("click", () => {
  formProfileValidator.removeValidationErrors();
  const { name, about } = userInfo.getUserInfo();
  userNameInput.value = name;
  userDescriptionInput.value = about;
  popupWithEditForm.openPopup();
});

popupProfileAddButton.addEventListener("click", () => {
  formAddCardValidator.removeValidationErrors();
  popupWithAddForm.openPopup();
});
