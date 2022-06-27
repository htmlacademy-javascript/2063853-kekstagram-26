import { isEscapeKey } from './util.js';
import { isEnterKey } from './util.js';

const photoFull = document.querySelector('.big-picture');
//закрытие фото по клавише esc
function addKeydownEscHandler(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoFull();
  }
}
//открытие большого фото
function openPhotoFull({url, description, like, comments}) {
  photoFull.classList.remove('hidden');

  photoFull.querySelector('img').src = url;
  photoFull.querySelector('.likes-count').textContent = like;
  photoFull.querySelector('.comments-count').textContent = comments.length;
  photoFull.querySelector('.social__caption').textContent = description;

  document.body.classList.add('modal-open');
  //закрытие по нажатию эскейп
  document.addEventListener('keydown', addKeydownEscHandler);
  //для последующей работы
  photoFull.querySelector('.social__comment-count').classList.add ('hidden');
  photoFull.querySelector('.comments-loader').classList.add ('hidden');
}
//закрытие большого фото
function closePhotoFull() {
  photoFull.classList.add('hidden');
  //удаление обработчика на эскейп
  document.removeEventListener('keydown', addKeydownEscHandler);
}
photoFull.querySelector('.big-picture__cancel').addEventListener('click', closePhotoFull);
// блок комментов
//const commentsList = photoFull.querySelector('.social__comments');

export {openPhotoFull, closePhotoFull};
