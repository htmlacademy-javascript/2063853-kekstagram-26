export {getRandomeNumber};

//функция - генератор случайного числа в диапазоне от min до max (включительно)
function getRandomeNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (max <= min || max < 0 || min < 0) {
    throw new Error('Entre the correct value range');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomeNumber ();
