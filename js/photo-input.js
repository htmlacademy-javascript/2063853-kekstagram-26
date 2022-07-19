import { isEscapeKey, showAlert} from './util.js';
import { resetEffects } from './photo-effects.js';
import { initializeCurrentScaleValue, biggerButtonClickHandler, smallerButtonClickHandler } from './photo-scale.js';
import { sendData } from './api.js';
import { showErrorMessage } from './messages.js';

const HASHTAG_MIN = 2;
const HASHTAG_MAX = 20;
const HASHTAGS_MAX = 5;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const ALLERT_MESSAGE = 'Выберите файл с расширением jpg, jpeg или png';

const uploadButton = document.querySelector('#upload-file');
const uploadPopup = document.querySelector('.img-upload__overlay');
const uploadPopupCancelButton = document.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');
const descriptionFild = document.querySelector('.text__description');
const hashtagsFild = document.querySelector('.text__hashtags');
const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const submitButton = document.querySelector('#upload-submit');
const photoPreview = document.querySelector('.img-upload__preview img');

const errorMessage = {
  BAD_COUNT: 'Нельзя указать больше пяти хэш-тегов',
  BAD_LENGTH: 'Длина одного хэш-тега от 2 до 20 символов, включая решётку',
  BAD_REPEAT: 'Один и тот же хэш-тег не может быть использован дважды',
  BAD_VALUE: 'Хэш-тег состоит из букв и чисел',
  BAD_START: 'Хэш-тег начинается с символа # (решётка)'
};

uploadButton.addEventListener('change', () => uploadButtonClickHandler());

uploadPopupCancelButton.addEventListener('click', () => uploadPopupCancelButtonClickHandler());

function uploadButtonClickHandler() {
  uploadPopup.classList.remove ('hidden');
  document.body.classList.add('modal-open');

  choseUsersPhoto();

  //установка масштаба и стиля фото по - умолчанию
  initializeCurrentScaleValue();
  resetEffects();

  //добавление обработчика на эскейп
  addUploadPopoupKeydownEscHandler();
}

//подстановка пользовательского фото для загрузки
function choseUsersPhoto() {
  const file = uploadButton.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    photoPreview.src = URL.createObjectURL(file);
  } else {
    showAlert(ALLERT_MESSAGE);}
}

function uploadPopupCancelButtonClickHandler() {
  closeUploadPopup();
}

function closeUploadPopup() {
  uploadPopup.classList.add('hidden');
  document.body.classList.remove('modal-open');

  //очистка формы
  uploadForm.reset();

  //удаление обработчика на эскейп
  removeUploadPopoupKeydownEscHandler();
}

function addUploadPopoupKeydownEscHandler() {
  document.addEventListener('keydown', uploadPopupKeydownEscHandler);
}

function removeUploadPopoupKeydownEscHandler() {
  document.removeEventListener('keydown', uploadPopupKeydownEscHandler);
}

function uploadPopupKeydownEscHandler(evt) {
  if (isEscapeKey(evt) && !isFocused()) {
    evt.preventDefault();
    closeUploadPopup();
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

//сброс ошибок валидации
uploadForm.addEventListener('reset', () => pristine.reset());

function createHashtagsArray(value) {
  return value.toLowerCase().split(' ').filter((hashtag) => hashtag.length > 0);
}

function validateHashtagsNumber(value) {
  return createHashtagsArray(value).length <= HASHTAGS_MAX;
}

pristine.addValidator(hashtagsFild, validateHashtagsNumber, errorMessage.BAD_COUNT);

function validateHashtagsLength(value) {
  return value.trim().length === 0 || createHashtagsArray(value).every((hashtag) => hashtag.length >= HASHTAG_MIN && hashtag.length <= HASHTAG_MAX);
}

pristine.addValidator(hashtagsFild, validateHashtagsLength, errorMessage.BAD_LENGTH);

function validateHashtagsUnique(value) {
  return createHashtagsArray(value).sort().every((hashtag, index, sortedHashtags) => index === 0 || hashtag !== sortedHashtags[index - 1]);
}

pristine.addValidator(hashtagsFild, validateHashtagsUnique, errorMessage.BAD_REPEAT);

function validateFirstSymbol(value) {
  return createHashtagsArray(value).every((hashtag) => hashtag.startsWith('#'));
}

pristine.addValidator(hashtagsFild, validateFirstSymbol, errorMessage.BAD_START);

function validateAllSymbols (value) {
  return createHashtagsArray(value).every((hashtag) => /^#?[а-яА-ЯёЁa-zA-Z0-9]+$/.test(hashtag));
}

pristine.addValidator(hashtagsFild, validateAllSymbols, errorMessage.BAD_VALUE);

//загрузка фото после валидации
function downloadPhoto (onSuccess) {
  uploadForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (pristine.validate()) {
      blockSubmitButton();

      sendData (
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          showErrorMessage();
          unblockSubmitButton();
        },
        new FormData(uploadForm),
      );
    }
  });
}

//блокировка клавиши опубликовать на время обращения к серверу
function blockSubmitButton() {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикация...';
}

function unblockSubmitButton() {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
}

export { downloadPhoto, closeUploadPopup, addUploadPopoupKeydownEscHandler, removeUploadPopoupKeydownEscHandler, uploadButtonClickHandler };
