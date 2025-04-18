// открываем попап (добавляем класс)
function openPopup(popupElement) {
    popupElement.classList.add("popup_is-opened");
    document.addEventListener('keydown', closeByEscape);
  }

// закрываем попап (убираем класс)
function closePopup(popupElement) {
    popupElement.classList.remove("popup_is-opened");
    document.removeEventListener('keydown', closeByEscape);
  }

// закрываем попап нажатием Эскейп  
function closeByEscape(event) {
    if (event.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      if (openedPopup) closePopup(openedPopup);
    }
  }
 
// закрываем попап кликом на оверлей  
function closeByOverlay(popupElement) {
    popupElement.addEventListener('click', (event) => {
      if (event.target === popupElement) {
        closePopup(popupElement);
      }
    });
  }

// функция поведения попапов 
function initPopup(popupElement, openButton, closeButton) {
    if (!popupElement || !openButton || !closeButton) return;
    
    openButton.addEventListener('click', () => openPopup(popupElement));
    closeButton.addEventListener('click', () => closePopup(popupElement));
    closeByOverlay(popupElement);
  }
  
  export { openPopup, closePopup, initPopup, closeByOverlay };