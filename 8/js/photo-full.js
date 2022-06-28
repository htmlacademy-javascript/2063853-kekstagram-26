import { isEscapeKey, makeElement } from './util.js';

// создание комментария
function getUsersComment (comment) {
  const usersComment = makeElement ('li', 'social_comment');

  const userPic = makeElement ('img', 'social_picture');
  userPic.src = comment.avatar;
  userPic.alt = comment.name;
  userPic.width = '35';
  userPic.height = '35';
  usersComment.appendChild(userPic);

  const commentsText = makeElement ('p', 'social_text', comment.message);
  usersComment.appendChild(commentsText);

  return usersComment;
}
//создание карточки большого фото
function createPhotoFull ({url, like, comments, description}) {
  const fullPhotoTemplate = document.querySelector('#big-picture').content.querySelector('.big-picture');
  const photoFull = fullPhotoTemplate.cloneNode(true);

  photoFull.querySelector('img').src = url;
  photoFull.querySelector('.likes-count').textContent = like;
  photoFull.querySelector('.comments-count').textContent = comments.length;
  photoFull.querySelector('.social__caption').textContent = description;
  //рисуем комменты
  const commentsList = photoFull.querySelector('.social__comments');
  if (comments.length === 0) {
    commentsList.remove();//удаляем весь блок если нет комментариев
  }
  for (let i = 0; i < comments.length; i++) {
    commentsList.appendChild(getUsersComment(comments[i]));
  }
  //добавляем обработчик на кнопку закрытия фото
  photoFull.querySelector('.big-picture__cancel').addEventListener('click', () => closePhotoFull(photoFull));

  return photoFull;
}
//механизм открытия полноразмерного фото
function openPhotoFull(photo) {
  const photoFull = createPhotoFull(photo); //рисуем большое фото
  //прячем счетчик и загрузчик комментов
  photoFull.querySelector('.social__comment-count').classList.add ('hidden');
  photoFull.querySelector('.comments-loader').classList.add ('hidden');
  //открытие фото
  photoFull.classList.remove('hidden');
  //чтобы контейнер с фотографиями позади не прокручивался при скролле
  document.body.classList.add('modal-open');
  //добавление обработчика по нажатию эскейп
  document.addEventListener('keydown', addKeydownEscHandler);
  document.body.appendChild(photoFull);
}
//закрытие большого фото
function closePhotoFull() {
  const photoFull = document.querySelector('.big-picture:not(.hidden)');
  if (photoFull) {
    photoFull.remove();
    document.body.classList.remove('modal-open');
    //удаление обработчика на эскейп
    document.removeEventListener('keydown', addKeydownEscHandler);
  }
}
//закрытие фото по клавише esc
function addKeydownEscHandler(evt, photo) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoFull(photo);
  }
}
export {openPhotoFull, closePhotoFull};
