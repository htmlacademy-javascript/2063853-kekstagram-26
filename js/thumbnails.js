import { thumbnailClickHandler } from './photo-full.js';
import { defaultFilterClickHandler,discussedFilterButtonClickHandler, randomFilterButtonClickHandler } from './filters.js';
import { debounce } from './util.js';

const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailsList = document.querySelector('.pictures');
const filtersContainer = document.querySelector('.img-filters');
const randomFilterButton = document.querySelector('#filter-random');
const discussedFilterButton = document.querySelector('#filter-discussed');
const defaultFilterButton = document.querySelector('#filter-default');

const createThumbnail = ({url, likes, comments}) => {
  const thumbnail = photoTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;

  return thumbnail;
};

//на каждую миниатюру добавим обработчик события по клику и соберем их в фрагмент
const createThumbnailsFragment = (photo, thumbnailsListFragment) => {
  const thumbnail = createThumbnail(photo);

  thumbnail.addEventListener('click', () => thumbnailClickHandler(photo));

  thumbnailsListFragment.appendChild(thumbnail);
};

//функция отрисовывает миниатюры
const showUsersPhotosThumbnails = (thumbnails) => {
  thumbnailsList.querySelectorAll('.picture').forEach((thumbnail) => thumbnail.remove());

  const thumbnailsListFragment = document.createDocumentFragment();
  thumbnails.forEach((thumbnail) => createThumbnailsFragment(thumbnail, thumbnailsListFragment));
  thumbnailsList.appendChild(thumbnailsListFragment);

  if (filtersContainer.classList.contains('img-filters--inactive')) {
    //показ блока с фильтрами после загрузки всех миниатюр
    filtersContainer.classList.remove('img-filters--inactive');

    //добавить обработчики на кнопки фильтров
    defaultFilterButton.addEventListener('click', debounce(defaultFilterClickHandler));
    discussedFilterButton.addEventListener('click', debounce(discussedFilterButtonClickHandler));
    randomFilterButton.addEventListener('click', debounce(randomFilterButtonClickHandler));
  }
};

export {showUsersPhotosThumbnails};
