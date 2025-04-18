// импорты

import '../pages/index.css';
import { initialCards } from "../components/cards.js";
import { openPopup, closePopup, initPopup, closeByOverlay } from '../components/modal.js';



const cardContainer = document.querySelector(".places__list");

// функция добавления карточек
function createCard(cardData, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);

  card.querySelector(".card__image").src = cardData.link;
  card.querySelector(".card__title").textContent = cardData.name;

  card
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);

  return card;
}
// функция удаления карточек
function deleteCard(event) {
  const card = event.target.closest(".card");
  card.remove();
}

initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard);
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
  
}

formElement.addEventListener('submit', handleFormSubmit); 