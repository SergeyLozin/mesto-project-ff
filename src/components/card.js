import { toggleLike } from './api.js';

export function createCard(cardData, deleteCard, cardLikeButtonHandler, imagePopupHandler, currentUserId) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = card.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  card.querySelector(".card__title").textContent = cardData.name;

  // Кнопу удаления показываем только для своих карточек)
  const deleteButton = card.querySelector(".card__delete-button");
  if (cardData.owner._id !== currentUserId) {
    deleteButton.style.display = 'none';
  } else {
    deleteButton.addEventListener("click", deleteCard);
  }

  // Лайки карточки
  const likeButton = card.querySelector('.card__like-button');
  const likeCountElement = card.querySelector('.card__like-count');
  
  // Начальное состояние лайков
  likeCountElement.textContent = cardData.likes.length;
  
  // Проверяем, есть лайк или нет
  if (cardData.likes.some(like => like._id === currentUserId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', () => {
    cardLikeButtonHandler(likeButton, cardData._id, likeCountElement);
  });

  cardImage.addEventListener('click', () => {
    imagePopupHandler(cardData);
  });

  return card;
}

// функция удаления карточек
export function deleteCard(event) {
  const card = event.target.closest(".card");
  card.remove();
}

// Обработчик лайка карточки
export function cardLikeButtonHandler(likeButton, cardId, likeCountElement) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  
  toggleLike(cardId, isLiked)
    .then(updatedCard => {
      likeButton.classList.toggle('card__like-button_is-active');
      likeCountElement.textContent = updatedCard.likes.length;
    })
    .catch(err => console.error('Ошибка при обновлении лайка:', err));
}