import { createAllPhotos } from './data.js';
import { createUsersPhoto } from './photo-create.js';
import { openPhotoFull} from './photo-full.js';

const usersPhotos = createAllPhotos();
const pictureListFragment = document.createDocumentFragment();
const picturesList = document.querySelector('.pictures');
//на каждую миниатюру добавим обработчик события по клику и соберем их в фрагмент
function addThumbnailClickHandler(photo) {
  const thumbnail = createUsersPhoto(photo);
  thumbnail.addEventListener('click', () => openPhotoFull(photo));
  pictureListFragment.appendChild(thumbnail);
}

usersPhotos.forEach(addThumbnailClickHandler);

picturesList.appendChild(pictureListFragment);
