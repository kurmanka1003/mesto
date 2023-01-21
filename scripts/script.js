const editButtonProfile = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup-edit');
const closeButtonProfile = document.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formElement = document.querySelector('[name="info"]');
const nameInput = popupProfile.querySelector('[name="name"]');
const jobInput = popupProfile.querySelector('[name="job"]');

const addButton = document.querySelector('.profile__add-button');
const popupSite = document.querySelector('.popup-add');
const closeButtonSite = popupSite.querySelector('.popup__close');
const siteForm = document.querySelector('[name="photo"]');
const siteInput = popupSite.querySelector('[name="name"]');
const linkInput = popupSite.querySelector('[name="link"]');

const popupPhoto = document.querySelector('.popup-site');
const closeButtonPhoto = popupPhoto.querySelector('.popup__close');
const popupPhotoPic = popupPhoto.querySelector('.site__photo');
const popupCaption = popupPhoto.querySelector('.site__caption');

const cardsContainer = document.querySelector('.cards__list');
const cardsTemplate = document
    .querySelector('.template')
    .content
    .querySelector('.cards__element');

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

editButtonProfile.addEventListener('click', (evt) => {
    openPopup(popupProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
})

closeButtonProfile.addEventListener('click', (evt) => {
    closePopup(popupProfile);
})

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfile);
}

popupProfile.addEventListener('submit', handleFormSubmit); 

function deleteCard(evt) {
    evt.target.closest('.cards__element').remove();
}

function createCard({ name, link }) {
    const card = cardsTemplate.cloneNode(true);
    const cardName = card.querySelector('.cards__name');
    cardName.textContent = name;
    const cardImage = card.querySelector('.cards__image');
    cardImage.src = link;
    cardImage.alt = name;

    const likeButton = card.querySelector('.cards__like-button');
    likeButton.addEventListener('click', function (evt) {
        likeButton.classList.toggle('cards__like-button_liked');
    });

    const deleteButton = card.querySelector('.cards__delete-button');
    deleteButton.addEventListener('click', function (evt) {
        card.remove();
    });

    cardImage.addEventListener('click', function (evt) {
        openPopup(popupPhoto);
        popupPhotoPic.src = link;
        popupPhotoPic.alt = name;
        popupCaption.textContent = name;
    });

    return card;
}

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
    siteForm.reset();
}

siteForm.addEventListener('submit', addCard);

function displayCards() {
    initialCards.forEach(item => {
        const cardHtml = createCard(item);
        cardsContainer.append(cardHtml);
    });
}

displayCards();

addButton.addEventListener('click', (evt) => {
    openPopup(popupSite);
})

closeButtonSite.addEventListener('click', (evt) => {
    closePopup(popupSite);
})

closeButtonPhoto.addEventListener('click', (evt) => {
    closePopup(popupPhoto);
})