import { openPopup, closePopup } from "./modal";

// функция добавления карточек

export function createCard(cardData, deleteCard, cardLikeButtonHandler, imagePopupHandler) {
    const cardTemplate = document.querySelector("#card-template").content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);
  
    const cardImage = card.querySelector(".card__image"); // Получаем элемент изображения
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name; // Добавляем alt для доступности
    card.querySelector(".card__title").textContent = cardData.name;
  
    card.querySelector(".card__delete-button")
      .addEventListener("click", deleteCard);
      
    const cardLikeButton = card.querySelector('.card__like-button');
    cardLikeButtonHandler(cardLikeButton);
  
    imagePopupHandler(cardImage, cardData); // Теперь cardImage определен
  
    return card;
  }

// функция удаления карточек

export function deleteCard(event) {
    const card = event.target.closest(".card");
    card.remove();
  }

// Лайк карточки
export function cardLikeButtonHandler(cardLikeButton) {
    cardLikeButton.addEventListener('click', function(){
    cardLikeButton.classList.toggle('card__like-button_is-active'); //кликаем на иконку и класс добавляется/удаляется
  });
  }

// клик по картинке который открывает картику
export function imagePopupHandler(cardImage, cardData) {
    const popupImage = document.querySelector('.popup_type_image');
    const popupImageElement = popupImage.querySelector('.popup__image');
    const popupCaption = popupImage.querySelector('.popup__caption');
    const closeButton = popupImage.querySelector('.popup__close');
    cardImage.addEventListener('click', function(){
      popupImageElement.src = cardData.link;
      popupImageElement.alt = cardData.name;
      popupCaption.textContent = cardData.name;
      openPopup(popupImage); // открвыаем попап
      closeButton.addEventListener('click', function(){ //закрываем попап
        closePopup(popupImage);
      });
  });
  }