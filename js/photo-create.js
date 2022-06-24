import {createAllPhotos} from './data.js';

const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesList = document.querySelector ('.pictures');
const pictureListFragment = document.createDocumentFragment();

const usersPhotos = createAllPhotos();
usersPhotos.forEach(({url, like, comments}) => {
  const photo = photoTemplate.cloneNode(true);
  photo.querySelector('.picture__img').setAttribute('src', url);
  photo.querySelector('.picture__comments').textContent = comments.length;
  photo.querySelector('.picture__likes').textContent = like;

  pictureListFragment.appendChild(photo);
});

picturesList.appendChild(pictureListFragment);
