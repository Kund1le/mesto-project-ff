const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-6",
  headers: {
    authorization: "c9801c46-d394-4dda-8d1a-846cf639870e",
    "Content-Type": "application/json",
  },
};

function checkResponse(response) {
  if (!response.ok) {
    return Promise.reject(`Ошибка: ${response.status}`);
  }
  return response.json();
}

//Запрос карточек
function getInitialCadrs() {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then((response) => checkResponse(response));
}

//запрос профиля
function profileData() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then((response) => checkResponse(response));
}

//Отправка данных профиля
function editProfile(userName, userAbout) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout,
    }),
  }).then((response) => checkResponse(response));
}

//Отправка данных аватара
function editAvatar(userAvatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: userAvatar,
    }),
  }).then((response) => checkResponse(response));
}

//Добавление карточки
function newCard(cardTitle, cardLink) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardTitle,
      link: cardLink,
    }),
  }).then((response) => checkResponse(response));
}

//Лайк карточки
function likeCardApi(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((response) => checkResponse(response));
}

//Убрать лайк
function unlikeCardApi(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((response) => checkResponse(response));
}

//Удаление карточки
function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((response) => checkResponse(response));
}

export {
  getInitialCadrs,
  profileData,
  editProfile,
  newCard,
  deleteCard,
  editAvatar,
  likeCardApi,
  unlikeCardApi,
};
