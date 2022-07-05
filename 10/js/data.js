import { getRandomeNumber } from './util.js';

const DESCRIPTIONS = [
  'Сфоткал любимую,пока она спит',
  'Это я сегодня',
  'Это я вчера',
  'Лежу - грущу',
  'КЛИКБЕЙТНЫЙ ЗАГОЛОВОК',
  'На прогулке с пацанами',
  'Смотрите, какая красота',
  'Свобода, равенство, братство',
  'Как говорил мой дед, я твой дед',
  'Слабоумие и отвага',
  'Вроде и не рыжий, а души нет',
  'Фантазия закончилась',
  'ХОБА',
  'Никто, абсолютно никто',
  'Работа не волк, никто кроме волка не волк',
  'Вкусно. И точка.',
  'Вот вам фото моего завтрака',
  'Котеночек проснулся голодный и злой',
  'Удивительно красивые цветы',
  'Удивительно красивый пейзаж',
  'Удивительно красивый кот',
  'Удивительно красивый объект',
  'Не знаю, что написать',
  'Ставьте лайки, подписывайтесь на мою страницу',
  'Ставь лайк, чтобы разблокировать хорошее настроение',
  'Мое первое фото, не судите строго',
];
const NAMES = [
  'Лена',
  'Сергей',
  'Маргарита',
  'Федор',
  'Михаил',
  'Франсуа',
  'Алина',
  'Анжелика',
  'Ольга',
  'Жан',
  'Егор',
  'Ника',
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const LIKE_MIN = 15;
const LIKE_MAX = 200;
const AVATAR_MIN = 1;
const AVATAR_MAX = 6;
const NUMBER_OF_PHOTOS = 25;
const NUMBER_OF_COMMENTS = 14;

function randomComment() {
  return {
    id: getRandomeNumber (1, 1000000),
    avatar: `img/avatar-${getRandomeNumber(AVATAR_MIN, AVATAR_MAX)}.svg`,
    message: MESSAGES[getRandomeNumber(0, MESSAGES.length - 1)],
    name: NAMES[getRandomeNumber(0, NAMES.length - 1)],
  };
}

//функция-генератор комментариев
function getComments() {
  const comments = [];

  for (let i = 0; i < NUMBER_OF_COMMENTS; i++) {
    comments.push(randomComment());
  }

  return comments.slice(0, getRandomeNumber(0, NUMBER_OF_COMMENTS - 1));
}
//функция - генератор фотографий
function getNewPhoto(id) {
  return {
    id: id,
    url: `photos/${id}.jpg`, //привязать url фото к id//
    description: DESCRIPTIONS[getRandomeNumber (0, DESCRIPTIONS.length -1)],
    like: getRandomeNumber(LIKE_MIN,LIKE_MAX),
    comments: getComments(),
  };
}
//функция - создатель массива из нужного нам количества фото
function createAllPhotos() {
  const allPhotos = [];

  for (let i = 1; i <= NUMBER_OF_PHOTOS; i++) {
    allPhotos.push(getNewPhoto(i));
  }

  return allPhotos;
}

export {createAllPhotos};
