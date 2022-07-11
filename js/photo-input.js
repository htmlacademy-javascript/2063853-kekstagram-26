import { isEscapeKey, showAlert } from './util.js';
import { initializeCurrentScaleValue, biggerButtonClickHandler, smallerButtonClickHandler, resetEffects } from './photo-edit.js';
import { sendData } from './api.js';

const uploadButton = document.querySelector('#upload-file');
const uploadPopup = document.querySelector('.img-upload__overlay');
const uploadCancelButton = document.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');
const descriptionFild = document.querySelector('.text__description');
const hashtagsFild = document.querySelector('.text__hashtags');
const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const HASHTAG_MIN = 2;
const HASHTAG_MAX = 20;
const HASHTAGS_MAX = 5;

uploadButton.addEventListener('change', () => uploadButtonClickHandler());

uploadCancelButton.addEventListener('click', () => uploadCancelButtonClickHandler());


function uploadButtonClickHandler() {
  uploadPopup.classList.remove ('hidden');
  document.body.classList.add('modal-open');

  //установка масштаба и стиля фото по - умолчанию
  initializeCurrentScaleValue();
  resetEffects();

  //добавление обработчика на эскейп
  document.addEventListener('keydown', addKeydownEscHandler);
}

function closeFuckenWindow() {
  uploadPopup.classList.add('hidden');
  document.body.classList.remove('modal-open');

  //удаление обработчика на эскейп
  document.removeEventListener('keydown', addKeydownEscHandler);

  //очистка формы
  uploadForm.reset();
}

function uploadCancelButtonClickHandler() {
  closeFuckenWindow();
}

function photoUploadEscHander(evt) {
  if (isEscapeKey(evt) && ! isFocused()) {
    evt.preventDefault();
    uploadCancelButtonClickHandler();
  }
}

function succeessMessageEscHandler(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessMessageWindow();
  }
}

//закрытие формы редактирования по клавише esc
function addKeydownEscHandler(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if(! isFocused()) {
      uploadCancelButtonClickHandler();
    }
    closeSuccessMessageWindow();
  }
}

function isFocused () {
  return document.activeElement === descriptionFild || document.activeElement === hashtagsFild;
}

//изменение масштаба фото
biggerButton.addEventListener('click', biggerButtonClickHandler);

smallerButton.addEventListener('click', smallerButtonClickHandler);

//валидация
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

function createSuccessMessage() {
  const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessage = successMessageTemplate.cloneNode(true);

  const successButtonClose = successMessage.querySelector('.success__button');
  successButtonClose.addEventListener('click', () => SuccessButtonClickHandler(successMessage));

  return successMessage;
}

function SuccessButtonClickHandler(element) {
  element.remove();
}


function showSuccessMessage() {
  uploadCancelButtonClickHandler();

  const successMessage = createSuccessMessage();
  document.body.appendChild (successMessage);
  document.addEventListener('keydown', addKeydownEscHandler);
}


function downloadPhoto (onSuccess) {
  uploadForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (pristine.validate()) {
      sendData (
        () => onSuccess(),
        () => showAlert('Can not save your photo'),
        new FormData(uploadForm),
      );
    }

  });
}

function createHashtagsArray(value) {
  return value.toLowerCase().split(' ').filter((hashtag) => hashtag.length > 0);
}

function validateHashtagsNumber(value) {
  return createHashtagsArray(value).length <= HASHTAGS_MAX;
}

pristine.addValidator(hashtagsFild, validateHashtagsNumber, 'Нельзя указать больше пяти хэш-тегов');

function validateHashtagsLength(value) {
  return value.trim().length === 0 || createHashtagsArray(value).every((hashtag) => hashtag.length >= HASHTAG_MIN && hashtag.length <= HASHTAG_MAX);
}

pristine.addValidator(hashtagsFild, validateHashtagsLength, 'Длина одного хэш-тега от 2 до 20 символов, включая решётку');

function validateHashtagsUnique(value) {
  return createHashtagsArray(value).sort().every((hashtag, index, sortedHashtags) => index === 0 || hashtag !== sortedHashtags[index - 1]);
}

pristine.addValidator(hashtagsFild, validateHashtagsUnique, 'Один и тот же хэш-тег не может быть использован дважды');

function validateFirstSymbol(value) {
  return createHashtagsArray(value).every((hashtag) => hashtag.startsWith('#'));
}

pristine.addValidator(hashtagsFild, validateFirstSymbol, 'Хэш-тег начинается с символа # (решётка)');

function validateAllSymbols (value) {
  return createHashtagsArray(value).every((hashtag) => /^#?[а-яА-ЯёЁa-zA-Z0-9]+$/.test(hashtag));
}

pristine.addValidator(hashtagsFild, validateAllSymbols, 'Хэш-тег состоит из букв и чисел');

export {downloadPhoto, showSuccessMessage};
