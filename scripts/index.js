// @todo: Темплейт карточки
// @todo: DOM узлы
// @todo: Функция создания карточки
// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// Добавляем функцию для удаления карточки

function createCard(cardData, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.cloneNode(true);

  card.querySelector(".card__image").src = cardData.link;
  card.querySelector(".card__title").textContent = cardData.name;

  card
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);

  document.querySelector(".places__list").appendChild(card);

  return card;
}

function deleteCard(event) {
  const card = event.target.closest(".card");
  card.remove();
}

initialCards.forEach(function (cardData) {
  createCard(cardData, deleteCard);
});
