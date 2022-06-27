import { isEscapeKey, makeElement } from './util.js';


const photoFull = document.querySelector('.big-picture');
//закрытие фото по клавише esc
function addKeydownEscHandler(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoFull();
  }
}
//открытие большого фото
function openPhotoFull({url, like, comments, description}) {
  photoFull.querySelector('img').src = url;
  photoFull.querySelector('.likes-count').textContent = like;
  photoFull.querySelector('.comments-count').textContent = comments.length;
  photoFull.querySelector('.social__caption').textContent = description;
  document.body.classList.add('modal-open');

  //для последующей работы
  photoFull.querySelector('.social__comment-count').classList.add ('hidden');
  photoFull.querySelector('.comments-loader').classList.add ('hidden');
  //рисуем комменты
  const commentsBlock = photoFull.querySelector('.social__comments-box');
  commentsBlock.innerHTML = '';

  const commentsList = makeElement('ul', 'social__comments');
  for (let i = 0; i < comments.length; i++) {
    commentsList.appendChild(GetUsersComment(comments[i]));
  }
  if (comments.length > 0) {
    commentsBlock.appendChild(commentsList);
  }
  //открытие фото
  photoFull.classList.remove('hidden');
  //закрытие по нажатию эскейп
  document.addEventListener('keydown', addKeydownEscHandler);
}
//закрытие большого фото
function closePhotoFull() {
  photoFull.classList.add('hidden');
  //удаление обработчика на эскейп
  document.removeEventListener('keydown', addKeydownEscHandler);
}

// блок комментов
function GetUsersComment (comment) {
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

export {openPhotoFull, closePhotoFull, photoFull}; ///экспорт на мейн клоз????
