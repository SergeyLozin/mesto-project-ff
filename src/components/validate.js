export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'form__input-error_active'
  };
  
  // Показ ошибки ввода
  const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    const customMessage = inputElement.dataset.errorMessage || errorMessage; // Сообщение из data-атрибута и стандартное сообщение
    errorElement.textContent = customMessage;
    errorElement.classList.add(config.errorClass);
  };
  
  // Скрытие ошики ввода
  const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  };
  

  // Валидность
  const isValid = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
      hideInputError(formElement, inputElement, config);
    }
  };
  
  // Если инпут валидный
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  

  // Состояние кнопки тогглер
  const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(inactiveButtonClass);
    }
  };
  

  //Слушатели событий
  const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    
    toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);
    
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, config);
        toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);
      });
    });
  };
  

  // Очистка 
  export const clearValidation = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, config);
    });
    
    toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);
  };
  
  // Запуск валидации
  export const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement, config);
    });
  };