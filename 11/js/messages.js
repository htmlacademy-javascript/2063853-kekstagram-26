import { isEscapeKey } from './util.js';
import {closeUploadPopup } from './photo-input.js';

//функция срабатывает при успешной загрузке фото
function showSuccessMessage() {
  closeUploadPopup(true);

  const successMessage = createSuccessMessage();
  document.body.appendChild(successMessage);

  document.addEventListener('keydown', messageKeydownEscHandler);
  document.addEventListener('click', outOfSucceessMessageClickHandler);
}

function createSuccessMessage() {
  const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessage = successMessageTemplate.cloneNode(true);

  //добавляем обработчик на кнопку закрытия фото
  const successButtonClose = successMessage.querySelector('.success__button');
  //добавляем обработчик закрытия при клике за окном
  successButtonClose.addEventListener('click', () => buttonCloseClickHandler());

  return successMessage;
}

function buttonCloseClickHandler(){
  closeSuccessMessageWindow();
}

function closeSuccessMessageWindow() {
  const successMessage = document.querySelector('.success');
  successMessage.remove();

  //удаление обработчиков
  document.removeEventListener('keydown', messageKeydownEscHandler);
  document.removeEventListener('click', outOfSucceessMessageClickHandler);
}

function messageKeydownEscHandler(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessMessageWindow();
  }
}

function outOfSucceessMessageClickHandler(evt) {
  if(evt.target.className === 'success') {
    closeSuccessMessageWindow();
  }
}

////функция срабатывает при ошибке загрузки фото
function showErrorMessage() {
  closeUploadPopup(false);

  document.body.appendChild(createErrorMessage());

  document.addEventListener('keydown', messageErrorKeydownEscHandler);
  document.addEventListener('click', outOfErrorMessageClickHandler);
}

function createErrorMessage() {
  const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessage = errorMessageTemplate.cloneNode(true);

  //добавляем обработчик на кнопку закрытия фото
  const errorButtonClose = errorMessage.querySelector('.error__button');
  errorButtonClose.addEventListener('click', () => buttonErrorCloseClickHandler());

  return errorMessage;
}

function closeErrorMessageWindow() {
  const errorMessage = document.querySelector('.error');
  errorMessage.remove();

  //удаление обработчиков
  document.removeEventListener('keydown', messageErrorKeydownEscHandler);
  document.removeEventListener('click', outOfErrorMessageClickHandler);
}

function buttonErrorCloseClickHandler(){
  closeErrorMessageWindow();
}

function messageErrorKeydownEscHandler(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    buttonErrorCloseClickHandler();
  }
}

function outOfErrorMessageClickHandler(evt) {
  if(evt.target.className === 'error') {
    closeErrorMessageWindow();
  }
}

export{ showSuccessMessage, showErrorMessage };
