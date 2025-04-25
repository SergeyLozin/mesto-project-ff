// импорты

import '../pages/index.css';
import { initialCards } from "../components/cards.js";
import { openPopup, closePopup, initPopup, setCloseByOverlayListener } from '../components/modal.js';
import { createCard, deleteCard, cardLikeButtonHandler } from '../components/card.js';

const cardContainer = document.querySelector(".places__list");

initialCards.forEach(function(cardData) {
  const cardElement = createCard(cardData, deleteCard, cardLikeButtonHandler, imagePopupHandler);
  cardContainer.append(cardElement);
});



// попап EDIT PROFILE
const profilePopup = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', function(){
  openPopup(profilePopup);
})
initPopup(profilePopup);

// попап добавления НОВОЙ карточки
const cardPopup = document.querySelector('.popup_type_new-card');
const cardAddButton = document.querySelector('.profile__add-button');
cardAddButton.addEventListener('click', function(){
  openPopup(cardPopup);
})
initPopup(cardPopup);


// обработик формы submit

const formElementProfile = document.querySelector('[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  // значение полей Edit profile

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value; 
  closePopup(profilePopup);
}

formElementProfile.addEventListener('submit', handleFormSubmitProfile); 

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

// клик по картинке который открывает картику
function imagePopupHandler(cardData) {
  const popupImage = document.querySelector('.popup_type_image');
  const popupImageElement = popupImage.querySelector('.popup__image');
  const popupCaption = popupImage.querySelector('.popup__caption');
    popupImageElement.src = cardData.link;
    popupImageElement.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openPopup(popupImage); // открвыаем попап
    initPopup(popupImage);    
}

