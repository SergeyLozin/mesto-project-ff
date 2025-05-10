const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-37',
    headers: {
      authorization: 'd31f61de-0975-44cc-9988-d24422d9cf34',
      'Content-Type': 'application/json'
    }
  };
  
  function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  
  // Получаем карточки
  export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then(checkResponse);
  };
  
  // Получаем данные пользователя
  export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    })
    .then(checkResponse);
  };
  
  // Добавляем новую карточку
  export const addNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(checkResponse);
  };
  
  // Удаляем карточку
  export const deleteCardApi = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then(checkResponse);
  };
  
  // Лайк тогглер
  export const toggleLike = (cardId, isLiked) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: config.headers
    })
    .then(checkResponse);
  };
  
  // Обновление данных профиля
  export const updateProfileInfo = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(checkResponse);
  };
  
  // Обновление аватара
  export const updateAvatar = (avatarUrl) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: avatarUrl
      })
    })
    .then(checkResponse);
  };

  // функция лайк карточки
export function cardLikeButtonHandler(likeButton, cardId, likeCountElement) {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    const method = isLiked ? 'DELETE' : 'PUT';
  
    fetch(`https://nomoreparties.co/v1/wff-cohort-37/cards/likes/${cardId}`, {
      method: method,
      headers: {
        authorization: 'd31f61de-0975-44cc-9988-d24422d9cf34',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(updatedCard => {
      likeButton.classList.toggle('card__like-button_is-active');
      likeCountElement.textContent = updatedCard.likes.length;
    })
    .catch(err => console.error('Ошибка при обновлении лайка:', err));
  }
  
  export { config };