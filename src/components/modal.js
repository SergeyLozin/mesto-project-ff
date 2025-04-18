const openButton = document.querySelector(".profile__edit-button"); //кнопка редактирования профиля
const popup = document.querySelector(".popup"); // все элементы с классом попап
const closeButton = document.querySelector(".popup__close"); // кнопка закрытия попапа крестик

// Открываем попап
function openPopup(element) {
    element.classList.add("popup_is-opened"); // добавили класс открытого попапа
}

// Закрываем попап
function closePopup(element) {
    element.classList.remove("popup_is-opened"); // убрали класс открытого попапа
}

//   Oбработчики 

function popupAction() {
    openButton.addEventListener('click', function() {
        openPopup(popup); // слушатель на кнопку при нажатии на которую запускается функция и открывается попап
    });

    closeButton.addEventListener('click', function() {
        closePopup(popup); // слушатель на кнопку при нажатии на которую запускается функция и закрывается попап
    });
// Закрытие по клику мимо попапа
    popup.addEventListener('click', function(event){
        if(event.target === popup) {
            closePopup(popup);
        }
    });
// Закрытие по нажатию Ecs
    document.addEventListener('keydown', function(event){
        if(event.key === 'Escape') {
            closePopup(popup);
        }
    });
}       
     
popupAction();
  

  export { openPopup, closePopup };





    
    


