import '../pages/index.css';
import { openPopup, closePopup, initPopup } from '../components/modal.js';
import { createCard, deleteCard, cardLikeButtonHandler } from '../components/card.js';
import { enableValidation, validationConfig, clearValidation } from '../components/validate.js';
import { getInitialCards, getUserInfo, addNewCard, config, updateAvatar, updateProfileInfo } from '../components/api.js';

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

// Отправка формы аватара
function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  const avatarUrl = formData.get("avatar").trim();

  if (!avatarUrl) {
    alert("Введите ссылку на аватар!");
    return;
  }
  if (!avatarUrl.startsWith("http")) {
    alert("URL должен начинаться с http:// или https://");
    return;
  }

  const submitButton = evt.submitter;
  submitButton.textContent = "Сохранение...";

  updateAvatar(avatarUrl)
    .then((userData) => {
      profileImage.style.backgroundImage = `url('${userData.avatar}')`;
      closePopup(avatarPopup);
    })
    .catch((err) => {
      alert("Сервер отклонил URL. Попробуйте другую ссылку.");
    })
    .finally(() => {
      submitButton.textContent = "Сохранить";
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
     alert('Ошибка при загрузке');
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
  
  openPopup(cardPopup);
});
initPopup(cardPopup);

// Обработчик формы профиля
function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  
  const newName = nameInput.value;
  const newDescription = jobInput.value;

  updateProfileInfo(newName, newDescription)
    .then(userData => {
      document.querySelector('.profile__title').textContent = userData.name;
      document.querySelector('.profile__description').textContent = userData.about;
      closePopup(profilePopup);
    })
    .catch(err => {
      alert('Не удалось обновить профиль. Попробуйте ещё раз.');
    })
    .finally(() => {
      submitButton.textContent = initialText;
    });
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
      clearValidation(formElementCard, validationConfig);
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