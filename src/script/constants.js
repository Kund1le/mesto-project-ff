//элементы разметки
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');
const profileTitle = content.querySelector('.profile__title');
const profileDescription = content.querySelector('.profile__description');
const profileImage = content.querySelector('.profile__image');
const popupCard = document.querySelector(".popup_type_image .popup__image");
const imageName = document.querySelector(".popup_type_image .popup__caption");


//Элементы модальных окон
const popups = {
  editName: {
    popup: document.querySelector(".popup_type_edit"),
    openButton: document.querySelector(".profile__edit-button"),
    closeButton: document.querySelector(".popup_type_edit .popup__close"), 
    submitButton: document.querySelector(".popup_type_edit .popup__button"),
  },
  addCard: {
    popup: document.querySelector(".popup_type_new-card"),
    openButton: document.querySelector(".profile__add-button"),
    closeButton: document.querySelector(".popup_type_new-card .popup__close"),
    submitButton: document.querySelector(".popup_type_new-card .popup__button"),
  },
  openCard: {
    popup: document.querySelector(".popup_type_image"),
    openButton: null,
    closeButton: document.querySelector(".popup_type_image .popup__close"),
    submitButton: null,
  },
  changeAvatar: {
    popup: document.querySelector(".popup_type_avatar"),
    openButton: document.querySelector(".logo .header__logo"),
    closeButton: document.querySelector(".popup_type_avatar .popup__close"),
    submitButton: document.querySelector(".popup_type_avatar .popup__button"),
  }
};

//Элементы форм
const avatarForm = document.forms["edit-avatar"];
const avatarLink = avatarForm.elements["link"];

const profileForm = document.forms["edit-profile"];
const nameInput = profileForm.elements["name"];
const jobInput = profileForm.elements["job-input"];
const editProfileButton = profileForm.querySelector('.popup__button');

const addCardForm = document.forms["new-place"];
const placeInput = addCardForm.elements["place-name"];
const linkInput = addCardForm.elements["link"];
const newCardButton = addCardForm.querySelector('.popup__button');

//Конфиг валидации форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

export {
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
}