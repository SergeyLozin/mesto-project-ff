// импорты

import '../pages/index.css';
import { initialCards } from "../components/cards.js";
import { openPopup, closePopup, initPopup, closeByOverlay } from '../components/modal.js';



const cardContainer = document.querySelector(".places__list");

// функция добавления карточек
function createCard(cardData, deleteCard, cardLikeButtonHandler, imagePopupHandler) {
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
function deleteCard(event) {
  const card = event.target.closest(".card");
  card.remove();
}

initialCards.forEach(function(cardData) {
  const cardElement = createCard(cardData, deleteCard, cardLikeButtonHandler, imagePopupHandler);
  cardContainer.append(cardElement);
});



// попап EDIT PROFILE
const profilePopup = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = profilePopup.querySelector('.popup__close');
initPopup(profilePopup, profileEditButton, profileCloseButton);

// попап добавления НОВОЙ карточки
const cardPopup = document.querySelector('.popup_type_new-card');
const cardAddButton = document.querySelector('.profile__add-button');
const cardCloseButton = cardPopup.querySelector('.popup__close');
initPopup(cardPopup, cardAddButton, cardCloseButton);


// обработик формы submit

const formElement = document.querySelector('[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

function handleFormSubmit(evt) {
  evt.preventDefault();
  // значение полей Edit profile

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value; 
  closePopup(profilePopup);
}

formElement.addEventListener('submit', handleFormSubmit); 

// lобавление новой карточки через попап меню

const formElementCard = document.querySelector('[name="new-place"]'); // ищем форму
const placeInput = document.querySelector('.popup__input_type_card-name'); // ищем поле ввода названия карточки
const urlInput = document.querySelector('.popup__input_type_url'); // ищем поле ввода ссылки на картинку

function handleFormSubmitNewCard(evt) { //обработчик формы
  evt.preventDefault();
  const newCardObject = { // новый обьект с значениями полей ввода
    name: placeInput.value, // название региона
    link: urlInput.value // ссылка
  };
  const cardElement = createCard(newCardObject, deleteCard, cardLikeButtonHandler, imagePopupHandler); 
  cardContainer.prepend(cardElement); // добавляем в начало
  formElementCard.reset();
  closePopup(cardPopup); // закрываем попап
}

formElementCard.addEventListener('submit', handleFormSubmitNewCard);

// Лайк карточки
function cardLikeButtonHandler(cardLikeButton) {
  cardLikeButton.addEventListener('click', function(){
  cardLikeButton.classList.toggle('card__like-button_is-active'); //кликаем на иконку и класс добавляется/удаляется
});
}

// клик по картинке который открывает картику
function imagePopupHandler(cardImage, cardData) {
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