const editButton = document.querySelector('.profile__edit-button');
const aPopup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formElement = document.querySelector('[name="info"]');
const nameInput = aPopup.querySelector('[name="name"]');
const jobInput = aPopup.querySelector('[name="job"]');

editButton.addEventListener('click', (evt) => {
    aPopup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
})

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', (evt) => {
    aPopup.classList.remove('popup_opened');
})

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(aPopup);
}

aPopup.addEventListener('submit', handleFormSubmit); 