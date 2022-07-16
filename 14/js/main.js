import { downloadPhoto } from './photo-input.js';
import { showSuccessMessage } from './messages.js';
import { getData } from './api.js';
import { defaultFilterClickHandler,discussedFilterButtonClickHandler, randomFilterButtonClickHandler } from './filters.js';
import { showUsersPhotosThumbnails } from './thumbnails.js';
import { debounce } from './util.js';

const randomFilterButton = document.querySelector('#filter-random');
const discussedFilterButton = document.querySelector('#filter-discussed');
const defaultFilterButton = document.querySelector('#filter-default');

//подгрузка пользовательских фото с сервера
getData(showUsersPhotosThumbnails);

defaultFilterButton.addEventListener('click', debounce(defaultFilterClickHandler));
discussedFilterButton.addEventListener('click', debounce(discussedFilterButtonClickHandler));
randomFilterButton.addEventListener('click', debounce(randomFilterButtonClickHandler));

//загрузка фото нового фото на сервер
downloadPhoto(showSuccessMessage);
