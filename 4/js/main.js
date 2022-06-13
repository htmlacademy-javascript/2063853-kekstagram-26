
const DESCRIPTION = [
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


function getRandomeNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (max <= min || max < 0 || min < 0) {
    throw new Error('Entre the correct value range');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getComment() {
  return {
    id: getRandomeNumber (1, 1000000),
    avatar: `img/avatar-${getRandomeNumber(1, 6)}.svg`,
    message: MESSAGES[getRandomeNumber(0, MESSAGES.length)],
    name: NAMES[getRandomeNumber(0,NAMES.length)],
  };
}

function createNewPhoto(id) {
  return {
    id: id,
    url: `photos/${id}.jpg`, //решила, что логично привязать url фото к id//
    description: DESCRIPTION[getRandomeNumber (0, DESCRIPTION.length -1)],
    likes: getRandomeNumber(15,200),
    comments: getComment(),
  };
}

function createAllPhotos() {
  const result = [];
  for (let i=1; i<= 25; i++) {
    result.push(createNewPhoto(i));
  }
  return result;
}

createAllPhotos();


/* на будущее

function checkCommentLength(comment, maxLength) {
  return comment.length <= maxLength;
}

checkCommentLength('Comment test', 140);

*/
