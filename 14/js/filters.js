import { getData } from './api.js';
import { showUsersPhotosThumbnails } from './thumbnails.js';
import { comparePhotos, shufflePhotos } from './util.js';

const defaultFilterButton = document.querySelector('#filter-default');
const randomFilterButton = document.querySelector('#filter-random');
const discussedFilterButton = document.querySelector('#filter-discussed');
const filters = document.querySelectorAll('.img-filters__button');
const RANDOM_PHOTOS_COUNT = 10;


function defaultFilterClickHandler() {
  removeActiveButtonClass();
  defaultFilterButton.classList.add('img-filters__button--active');
  defaultFilterButton.disabled = true;
  getData(showUsersPhotosThumbnails);
}

function discussedFilterButtonClickHandler (){
  removeActiveButtonClass();
  discussedFilterButton.classList.add('img-filters__button--active');
  discussedFilterButton.disabled = true;
  getData(showUsersPhotosRanked);
}

function randomFilterButtonClickHandler (){
  removeActiveButtonClass();
  randomFilterButton.classList.add('img-filters__button--active');
  randomFilterButton.disabled = true;
  getData(showUsersPhotosShuffle);
}

function showUsersPhotosRanked(photos) {
  const rankedPhotos = photos.slice().sort(comparePhotos);
  showUsersPhotosThumbnails(rankedPhotos);

}

function showUsersPhotosShuffle(photos) {
  const usersPhotos = photos.slice();
  const rankedPhotos = shufflePhotos(usersPhotos).slice(0, RANDOM_PHOTOS_COUNT);
  showUsersPhotosThumbnails(rankedPhotos);
}

function removeActiveButtonClass() {
  for (let i = 0; i < filters.length; i++) {

    if (filters[i].classList.contains('img-filters__button--active')||filters[i].disabled) {
      filters[i].classList.remove('img-filters__button--active');
      filters[i].disabled = false;
    }
  }
}

export { comparePhotos, defaultFilterClickHandler,discussedFilterButtonClickHandler, randomFilterButtonClickHandler };
