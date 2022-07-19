import { isEscapeKey } from './util.js';
import {closeUploadPopup, addDocumentFKeydownHandlerForUploadPopup,removeDocumentKeydownHandlerForUploadPopup } from './photo-input.js';

const SUCCESS_MESSAGE = 'success';
const ERROR_MESSAGE = 'error';

//функция срабатывает при успешной загрузке фото
function showSuccessMessage() {
  closeUploadPopup();

  document.body.appendChild(createMessage(SUCCESS_MESSAGE));

  document.addEventListener('keydown', documentKeydownHandler);
  document.addEventListener('click', documentClickHandler);
}

//функция срабатывает при ошибке загрузки фото
function showErrorMessage() {
  document.body.appendChild(createMessage(ERROR_MESSAGE));

  //добавила обработчики
  document.addEventListener('keydown', documentKeydownHandler);
  document.addEventListener('click', documentClickHandler);

  //удалила обработчик esc на попапе редактирования фото
  removeDocumentKeydownHandlerForUploadPopup();
}

function createMessage(message) {
  const messageTemplate = document.querySelector(`#${message}`).content.querySelector(`.${message}`);
  const messageWindow = messageTemplate.cloneNode(true);

  //добавляем обработчик на кнопку закрытия фото
  const buttonClose = messageWindow.querySelector(`.${message}__button`);
  //добавляем обработчик закрытия при клике за окном
  buttonClose.addEventListener('click', buttonCloseClickHandler);

  return messageWindow;
}

function buttonCloseClickHandler(message){
  closeMessageWindow(message);
}

function closeMessageWindow() {
  const  messageWindow = document.querySelector('.message');

  if (messageWindow.classList.contains('error')) {
    addDocumentFKeydownHandlerForUploadPopup();
  }

  messageWindow.remove();

  //удаление обработчиков
  document.removeEventListener('keydown', documentKeydownHandler);
  document.removeEventListener('click', documentClickHandler);

}

function documentKeydownHandler(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessageWindow();
  }
}

function documentClickHandler(evt) {
  if (evt.target.classList.contains('message')) {
    evt.preventDefault();
    closeMessageWindow();
  }
}

export{ showSuccessMessage, showErrorMessage };
