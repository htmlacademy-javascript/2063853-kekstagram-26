import { createUsersPhoto } from './photo-create.js';
import { thumbnailClickHandler } from './photo-full.js';
import { showSuccessMessage, downloadPhoto } from './photo-input.js';
import './photo-edit.js';
import { getData } from './api.js';

const pictureListFragment = document.createDocumentFragment();
const picturesList = document.querySelector('.pictures');

getData(showUsersPhotos);

function showUsersPhotos(photos) {
  photos.forEach(addThumbnailClickHandler);
  picturesList.appendChild(pictureListFragment);
}

//на каждую миниатюру добавим обработчик события по клику и соберем их в фрагмент
function addThumbnailClickHandler(photo) {
  const thumbnail = createUsersPhoto(photo);

  thumbnail.addEventListener('click', () => thumbnailClickHandler(photo));

  pictureListFragment.appendChild(thumbnail);
}

//загрузка фото
downloadPhoto(showSuccessMessage);
