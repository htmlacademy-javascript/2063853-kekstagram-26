import { isEscapeKey } from './util.js';

const fullPhotoTemplate = document.querySelector('#big-picture').content.querySelector('.big-picture');
const commentTemplate = fullPhotoTemplate.querySelector('.social__comment');
//const commentsCount = document.querySelector('.social__comment-count');
//const commentsLoaderButton = document.querySelector('.social__comments-loader');
const COMMENTS_INCREMENT = 5;

//механизм открытия полноразмерного фото
function thumbnailClickHandler(photo) {
  const photoFull = createPhotoFull(photo); //рисуем большое фото

  //открытие фото
  photoFull.classList.remove('hidden');

  //чтобы контейнер с фотографиями позади не прокручивался при скролле
  document.body.classList.add('modal-open');

  //добавление обработчика по нажатию эскейп
  document.addEventListener('keydown', keydownEscHandler);

  document.body.appendChild(photoFull);
}

//создание карточки большого фото
function createPhotoFull ({url, like, comments, description}) {
  const photoFull = fullPhotoTemplate.cloneNode(true);
  photoFull.querySelector('img').src = url;
  photoFull.querySelector('.likes-count').textContent = like;
  photoFull.querySelector('.social__caption').textContent = description;

  //выводим комментарии
  const commentsList = photoFull.querySelector('.social__comments');
  const commentsLoaderButton = photoFull.querySelector('.social__comments-loader');

  let shownCommentsNum = Math.min(COMMENTS_INCREMENT, comments.length);
  photoFull.querySelector('.comments-count-shown').textContent = shownCommentsNum;
  photoFull.querySelector('.comments-count').textContent = comments.length;

  commentsList.innerHTML = '';//удалить комментарии, которые были в разметке

  if (comments.length === 0) {
    commentsList.remove();//удаляем весь блок если нет комментариев
  }

  for (let i = 0; i < shownCommentsNum; i++) {
    commentsList.appendChild(createUsersComment(comments[i]));
  }

  if (comments.length <= COMMENTS_INCREMENT) {
    commentsLoaderButton.classList.add ('hidden');
  }

  //добавляем обработчик на кнопку подгрузки комментариев
  commentsLoaderButton.addEventListener('click', () => {
    for (let i = shownCommentsNum; i < Math.min(shownCommentsNum + COMMENTS_INCREMENT, comments.length); i++) {
      commentsList.appendChild(createUsersComment(comments[i]));
    }
    shownCommentsNum = Math.min(shownCommentsNum + COMMENTS_INCREMENT, comments.length);

    photoFull.querySelector('.comments-count-shown').textContent = shownCommentsNum;//записать количество показанных комментов в счетчик

    if (shownCommentsNum === comments.length) {
      commentsLoaderButton.classList.add ('hidden');
    }
  });

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
    document.removeEventListener('keydown', keydownEscHandler);
  }
}

//закрытие фото по клавише esc
function keydownEscHandler(evt, photo) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeButtonClickHandler(photo);
  }
}

export { thumbnailClickHandler };
