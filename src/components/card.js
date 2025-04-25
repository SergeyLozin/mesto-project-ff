


// функция добавления карточек

export function createCard(cardData, deleteCard, cardLikeButtonHandler, imagePopupHandler) {
    const cardTemplate = document.querySelector("#card-template").content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);
  
    const cardImage = card.querySelector(".card__image"); 
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name; 
    card.querySelector(".card__title").textContent = cardData.name;
  
    card.querySelector(".card__delete-button")
      .addEventListener("click", deleteCard);
      
    const cardLikeButton = card.querySelector('.card__like-button'); // лайк карточки
    cardLikeButton.addEventListener('click', function(){
    cardLikeButtonHandler(cardLikeButton);
    });

    cardImage.addEventListener('click', function() {  //открытие попапа картинки
      imagePopupHandler(cardData); 
      });
      

    return card;
  }

// функция удаления карточек

export function deleteCard(event) {
    const card = event.target.closest(".card");
    card.remove();
  }

// функция лайк карточки
export function cardLikeButtonHandler(cardLikeButton) {
    cardLikeButton.classList.toggle('card__like-button_is-active'); //кликаем на иконку и класс добавляется/удаляется
 }



 