import { isEscapeKey } from './util.js';

const uploadButton = document.querySelector('#upload-file');
const uploadPopup = document.querySelector('.img-upload__overlay');
const uploadCancelButton = document.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');
const descriptionFild = document.querySelector('.text__description');
const hashtagsFild = document.querySelector('.text__hashtags');

uploadButton.addEventListener('change', () => openUploadField());

uploadCancelButton.addEventListener('click', () => closeUploadField());

function isFocused () {
  return document.activeElement === descriptionFild || document.activeElement === hashtagsFild;
}

//закрытие формы редактирования по клавише esc
function addKeydownEscHandler(evt) {
  if (isEscapeKey(evt) && !isFocused()) {
    evt.preventDefault();
    closeUploadField();
  }
}

function openUploadField() {
  uploadPopup.classList.remove ('hidden');
  document.body.classList.add('modal-open');

  //добавление обработчика на эскейп
  document.addEventListener('keydown', addKeydownEscHandler);
}

function closeUploadField() {
  uploadPopup.classList.add('hidden');
  document.body.classList.remove('modal-open');

  //удаление обработчика на эскейп
  document.removeEventListener('keydown', addKeydownEscHandler);

  //очистка формы
  uploadForm.reset();
}

//валидация
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

uploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();}
});

function createHashtagsArray(value) {
  return value.toLowerCase().split(' ').filter((hashtag) => hashtag.length > 0);
}

function validateHashtagsNumber(value) {
  return createHashtagsArray(value).length <= 5;
}

pristine.addValidator(hashtagsFild, validateHashtagsNumber, 'Нельзя указать больше пяти хэш-тегов');

function validateHashtagsLength(value) {
  return value.trim().length === 0 || createHashtagsArray(value).every((hashtag) => hashtag.length >= 2 && hashtag.length <= 20);
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

