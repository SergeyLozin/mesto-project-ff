// импорты

import '../pages/index.css';
import { initialCards } from "../components/cards.js";
import { openPopup, closePopup } from '../components/modal.js';


// функция добавления карточек
const cardContainer = document.querySelector(".places__list");

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



// значение полей Edit profile
const formElement = document.querySelector('[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// обработик формы submit
function handleFormSubmit(evt) {
  evt.preventDefault();
  
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value; 
  
}

formElement.addEventListener('submit', handleFormSubmit); 

// ДОБАВЛЯЕМ КАРТОЧКУ
// открываем попап кнопкой +


const cardAddButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card')


cardAddButton.addEventListener('click', function(){
  openPopup(addCardPopup); 
});

// закрываем попап кнопкой Х
