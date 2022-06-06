function GetNumberIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (max <= min || max < 0 || min < 0) {
    throw new Error('Введите корректный диапазон');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
GetNumberIntInclusive(-10, 20);
// использовала https://developer.mozilla.org/ru/

function checkCommentLength(comment, maxLength) {
  if (comment.length <= maxLength) {
    return true;
  }
  return false;
}
checkCommentLength('Ваш комментарий проходит под ограничение', 140);
