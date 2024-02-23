import '../pages/index.css';
import { createCard, removeCard, toggleLike} from './card.js';
import { openModal, closeModal, closeModalOverlay} from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import {getInitialCadrs, profileData, editProfile, newCard, editAvatar} from './api.js';
import {
  content,
  placesList,
  profileTitle,
  profileDescription,
  profileImage,
  popupCard,
  imageName,
  popups,
  avatarForm,
  avatarLink,
  profileForm,
  nameInput,
  jobInput,
  editProfileButton,
  addCardForm,
  placeInput,
  linkInput,
  newCardButton,
  validationConfig
} from './constants.js';
import {handleSubmit, renderLoading} from './utils.js'

//Открытие карточки
function openImage(element) {
  openModal(popups.openCard.popup);
  popupCard.src = element.link;
  popupCard.alt = element.name;
  imageName.textContent = element.name;
}

//Отправка формы профиля
function handleEditFormSubmit(evt) {
  function makeRequest() {
    return editProfile(nameInput.value, jobInput.value)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(popups.editName.popup);
    })
  }
  handleSubmit(makeRequest, evt);
}

//Отправка формы аватара
function handleEditAvatarSubmit(evt) {
  function makeRequest() {
    return editAvatar(avatarLink.value)
    .then((data) => {
      profileImage.style = `background-image: url('${data.avatar}')`;
      closeModal(popups.changeAvatar.popup);
    })
  }
  handleSubmit(makeRequest, evt);
}

//Отправка формы новой карточки
function handleNewCardFormSubmit(evt) {
  function makeRequest() {
    return newCard(placeInput.value, linkInput.value)
    .then((data) => {
      placesList.prepend(
        createCard(data, userId, removeCard, toggleLike, openImage)
      );
      closeModal(popups.addCard.popup);
    })
  }
  handleSubmit(makeRequest, evt)
}

//Загрузка профиля и карточек на страницу
let userId;
Promise.all([getInitialCadrs(), profileData()])
  .then(([cards, data]) => {
    userId = data._id;
    cards.forEach((elem) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      profileImage.style = `background-image: url('${data.avatar}')`;
      placesList.append(
        createCard(elem, userId, removeCard, toggleLike, openImage)
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

  
profileImage.addEventListener('click', () => {
  clearValidation(popups.changeAvatar.popup, validationConfig);
  openModal(popups.changeAvatar.popup);
});

//Слушатели
popups.editName.openButton.addEventListener('click', () => {
  clearValidation(profileForm, validationConfig);
  openModal(popups.editName.popup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

popups.addCard.openButton.addEventListener('click', () => {
  clearValidation(popups.addCard.popup, validationConfig);
  openModal(popups.addCard.popup);
  addCardForm.reset();
});

Object.values(popups).forEach(({ popup, closeButton }) => {
  popup.addEventListener('mousedown', closeModalOverlay);
  closeButton.addEventListener('click', () => closeModal(popup));
});

avatarForm.addEventListener('submit', handleEditAvatarSubmit);
profileForm.addEventListener('submit', handleEditFormSubmit);
addCardForm.addEventListener('submit', handleNewCardFormSubmit);

enableValidation(validationConfig);