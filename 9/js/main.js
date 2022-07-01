import { createAllPhotos } from './data.js';
import { createUsersPhoto } from './photo-create.js';
import { openPhotoFull} from './photo-full.js';
import './photo-input.js';

const usersPhotos = createAllPhotos();
const pictureListFragment = document.createDocumentFragment();
const picturesList = document.querySelector('.pictures');

usersPhotos.forEach(addThumbnailClickHandler);

//на каждую миниатюру добавим обработчик события по клику и соберем их в фрагмент
function addThumbnailClickHandler(photo) {
  const thumbnail = createUsersPhoto(photo);

  thumbnail.addEventListener('click', () => openPhotoFull(photo));

  pictureListFragment.appendChild(thumbnail);
}

picturesList.appendChild(pictureListFragment);
