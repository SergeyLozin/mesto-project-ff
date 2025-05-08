import '../pages/index.css';
import { openPopup, closePopup, initPopup } from '../components/modal.js';
import { createCard, deleteCard, cardLikeButtonHandler } from '../components/card.js';
import { enableValidation, validationConfig, clearValidation } from '../components/validate.js';
import { getInitialCards, getUserInfo, addNewCard, config, updateAvatar } from '../components/api.js';

// Инициализация пользователя
let currentUserId;

// Включение валидации форм
enableValidation(validationConfig);

// DOM элементы
const cardContainer = document.querySelector(".places__list");
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');

const formElementProfile = document.querySelector('[name="edit-profile"]');
const formElementCard = document.querySelector('[name="new-place"]');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const placeInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');

const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarForm = document.querySelector('[name="edit-avatar"]');
const avatarInput = document.querySelector('.popup__input_type_url');
const profileImage = document.querySelector('.profile__image');
const editAvatarButton = document.querySelector('.profile__edit-avatar');

// Обработчик открытия попапа аватара
editAvatarButton.addEventListener('click', () => {
  avatarInput.value = '';
  clearValidation(avatarForm, validationConfig);
  openPopup(avatarPopup);
});
initPopup(avatarPopup);

// Отправка формы аватара
function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';

  updateAvatar(avatarInput.value)
    .then(userData => {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      closePopup(avatarPopup);
    })
    .catch(err => console.error('Ошибка при обновлении аватара:', err))
    .finally(() => {
      submitButton.textContent = initialText;
    });
}

avatarForm.addEventListener('submit', handleAvatarSubmit);


// Загрузка данных пользователя и карточек
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    currentUserId = userData._id;
    
    // Установка данных профиля
    document.querySelector('.profile__title').textContent = userData.name;
    document.querySelector('.profile__description').textContent = userData.about;
    
    // Отрисовка карточек
    cards.forEach(cardData => {
      const cardElement = createCard(
        cardData, 
        deleteCard, 
        cardLikeButtonHandler, 
        imagePopupHandler,
        currentUserId
      );
      cardContainer.append(cardElement);
    });
  })
  .catch(err => {
    console.error('Ошибка при загрузке данных:', err);
  });

// Попап редактирования профиля
document.querySelector('.profile__edit-button').addEventListener('click', function() {
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
  clearValidation(formElementProfile, validationConfig);
  openPopup(profilePopup);
});
initPopup(profilePopup);

// Попап добавления карточки
document.querySelector('.profile__add-button').addEventListener('click', function() {
  formElementCard.reset();
  clearValidation(formElementCard, validationConfig);
  openPopup(cardPopup);
});
initPopup(cardPopup);

// Обработчик формы профиля
function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  document.querySelector('.profile__title').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;
  closePopup(profilePopup);
}
formElementProfile.addEventListener('submit', handleFormSubmitProfile);

// Обработчик формы новой карточки
function handleFormSubmitNewCard(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';

  addNewCard(placeInput.value, urlInput.value)
    .then(cardData => {
      const cardElement = createCard(
        cardData,
        deleteCard,
        cardLikeButtonHandler,
        imagePopupHandler,
        currentUserId
      );
      cardContainer.prepend(cardElement);
      formElementCard.reset();
      closePopup(cardPopup);
    })
    .catch(err => console.error('Ошибка при создании карточки:', err))
    .finally(() => {
      submitButton.textContent = initialText;
    });
}
formElementCard.addEventListener('submit', handleFormSubmitNewCard);

// Обработчик открытия попапа с изображением
function imagePopupHandler(cardData) {
  const popupImage = document.querySelector('.popup_type_image');
  const popupImageElement = popupImage.querySelector('.popup__image');
  const popupCaption = popupImage.querySelector('.popup__caption');
  
  popupImageElement.src = cardData.link;
  popupImageElement.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  
  openPopup(popupImage);
}
initPopup(document.querySelector('.popup_type_image'));