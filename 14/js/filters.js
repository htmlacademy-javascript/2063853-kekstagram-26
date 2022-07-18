import { getData } from './api.js';
import { showUsersPhotosThumbnails } from './thumbnails.js';
import { comparePhotos, shufflePhotos } from './util.js';

const defaultFilterButton = document.querySelector('#filter-default');
const randomFilterButton = document.querySelector('#filter-random');
const discussedFilterButton = document.querySelector('#filter-discussed');
const filters = document.querySelectorAll('.img-filters__button');
const RANDOM_PHOTOS_COUNT = 10;


function defaultFilterClickHandler() {
  initializeFilter(defaultFilterButton);
  getData(showUsersPhotosThumbnails);
}

function discussedFilterButtonClickHandler() {
  initializeFilter(discussedFilterButton);
  getData(showUsersPhotosRanked);
}

function randomFilterButtonClickHandler() {
  initializeFilter(randomFilterButton);
  getData(showUsersPhotosShuffle);
}

function initializeFilter(filterButton) {
  removeActiveButtonClass();
  filterButton.classList.add('img-filters__button--active');
}

function removeActiveButtonClass() {
  for (let i = 0; i < filters.length; i++) {

    if (filters[i].classList.contains('img-filters__button--active')) {
      filters[i].classList.remove('img-filters__button--active');
    }
  }
}

function showUsersPhotosRanked(photos) {
  const rankedPhotos = photos.slice().sort(comparePhotos);
  showUsersPhotosThumbnails(rankedPhotos);
}

function showUsersPhotosShuffle(photos) {
  const usersPhotos = photos.slice();
  const randomePhotos = shufflePhotos(usersPhotos).slice(0, RANDOM_PHOTOS_COUNT);
  showUsersPhotosThumbnails(randomePhotos);
}

export { comparePhotos, defaultFilterClickHandler, discussedFilterButtonClickHandler, randomFilterButtonClickHandler };
