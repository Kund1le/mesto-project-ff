import {deleteCard, likeCardApi, unlikeCardApi} from './api.js';

//Создание карточек
function createCard(element, user, remove, like, openCard) {
  const cardOwnerId = user;
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate
    .querySelector('.places__item')
    .cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCountElement = cardElement.querySelector('.card__like-count');
  const elementId = element._id;

  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardTitle.textContent = element.name;

  likeCountElement.textContent = element.likes.length;

  cardImage.addEventListener('click', () => openCard(element));

  likeButton.addEventListener('click', (evt) => {
    like(evt, elementId, likeCountElement);
  });

  if (element.owner._id === cardOwnerId) {
    deleteButton.addEventListener('click', (evt) => {
      remove(evt, elementId);
    });
  } else {
    deleteButton.setAttribute('hidden', true);
  }

element.likes.forEach((elem) => {
    if (elem._id === cardOwnerId) {
      likeButton.classList.add('card__like-button_is-active');
    }
  });

  return cardElement;
};

//Удаление карточки
function removeCard(evt, cardId) {
  deleteCard(cardId)
    .then(() => {
      evt.target.closest('.places__item').remove();
    })
    .catch((err) => console.log(err));
};

//Обработка лайка
function toggleLike(evt, cardId, count) {
  const likeMethod = evt.target.classList.contains('card__like-button_is-active')
    ? unlikeCardApi
    : likeCardApi;
  likeMethod(cardId)
    .then((data) => {
      evt.target.classList.toggle('card__like-button_is-active');
      count.textContent = data.likes.length;
    })
    .catch((err) => console.log(err));
};

export { createCard, removeCard, toggleLike };