import {createAllPhotos} from './data.js';
import {createUsersPhoto} from './photo-create.js';

const usersPhotos = createAllPhotos();
const pictureListFragment = document.createDocumentFragment();
const picturesList = document.querySelector ('.pictures');

usersPhotos.forEach((photo) => pictureListFragment.appendChild(createUsersPhoto(photo)));

picturesList.appendChild(pictureListFragment);
