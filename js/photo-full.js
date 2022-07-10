import { isEscapeKey } from './util.js';

const fullPhotoTemplate = document.querySelector('#big-picture').content.querySelector('.big-picture');
const commentTemplate = fullPhotoTemplate.querySelector('.social__comment');

//механизм открытия полноразмерного фото
function thumbnailClickHandler(photo) {
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

//создание карточки большого фото
function createPhotoFull ({url, like, comments, description}) {
  const photoFull = fullPhotoTemplate.cloneNode(true);
  photoFull.querySelector('img').src = url;
  photoFull.querySelector('.likes-count').textContent = like;
  photoFull.querySelector('.comments-count').textContent = comments.length;
  photoFull.querySelector('.social__caption').textContent = description;

  //рисуем комменты
  const commentsList = photoFull.querySelector('.social__comments');
  commentsList.innerHTML = '';

  if (comments.length === 0) {
    commentsList.remove();//удаляем весь блок если нет комментариев
  }
  for (let i = 0; i < comments.length; i++) {
    commentsList.appendChild(createUsersComment(comments[i]));
  }

  //добавляем обработчик на кнопку закрытия фото
  photoFull.querySelector('.big-picture__cancel').addEventListener('click', () => closeButtonClickHandler(photoFull));

  return photoFull;
}

// создание комментария
function createUsersComment ({avatar, name, message}) {
  const usersComment = commentTemplate.cloneNode(true);

  const socialPicture = usersComment.querySelector('.social__picture');
  socialPicture.src = avatar;
  socialPicture.alt = name;
  socialPicture.width = '35';
  socialPicture.height = '35';

  usersComment.querySelector('.social__text').textContent = message;

  return usersComment;
}

//закрытие большого фото
function closeButtonClickHandler() {
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
    closeButtonClickHandler(photo);
  }
}

export { thumbnailClickHandler };
