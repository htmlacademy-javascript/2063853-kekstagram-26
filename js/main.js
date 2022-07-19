import { downloadPhoto } from './photo-input.js';
import { showSuccessMessage } from './messages.js';
import { getData } from './api.js';
import { showUsersPhotosThumbnails } from './thumbnails.js';

//подгрузка пользовательских фото с сервера
getData(showUsersPhotosThumbnails);

//загрузка фото нового фото на сервер
downloadPhoto(showSuccessMessage);
