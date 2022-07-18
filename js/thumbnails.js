import { thumbnailClickHandler } from './photo-full.js';

const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailsList = document.querySelector('.pictures');
const filtersContainer = document.querySelector('.img-filters');
let loadedImagesCounter = 0;

//функция отрисовывает миниатюры
function showUsersPhotosThumbnails(thumbnails) {
  thumbnailsList.querySelectorAll('.picture').forEach((thumbnail) => thumbnail.remove());
  resetLoadedImagesCouter();

  const thumbnailsListFragment = document.createDocumentFragment();
  thumbnails.forEach((thumbnail) => createThumbnailsFragment(thumbnail, thumbnailsListFragment));
  thumbnailsList.appendChild(thumbnailsListFragment);

  //показ блока с фильтрами после загрузки всех миниатюр
  thumbnailsList.querySelectorAll('.picture img').forEach((img) => {
    if(img.complete) {
      incrementLoadedImagesCounter(thumbnails.length);
    }
    else {
      img.addEventListener( 'load', () => incrementLoadedImagesCounter(thumbnails.length), false );
    }
  });
}

//сколько фото уже загружено
function incrementLoadedImagesCounter(totalImagesNumber) {
  loadedImagesCounter ++;
  if ( loadedImagesCounter === totalImagesNumber ) {
    filtersContainer.classList.remove('img-filters--inactive');
  }
}

function resetLoadedImagesCouter() {
  loadedImagesCounter = 0;
}

//на каждую миниатюру добавим обработчик события по клику и соберем их в фрагмент
function createThumbnailsFragment(photo, thumbnailsListFragment) {
  const thumbnail = createThumbnail(photo);

  thumbnail.addEventListener('click', () => thumbnailClickHandler(photo));

  thumbnailsListFragment.appendChild(thumbnail);
}

function createThumbnail ({url, likes, comments}) {
  const thumbnail = photoTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;

  return thumbnail;
}

export {showUsersPhotosThumbnails};
