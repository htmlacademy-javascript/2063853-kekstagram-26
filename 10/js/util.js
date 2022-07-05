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
//кнопка клавиатуры esc
function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

// //кнопка клавиатуры enter
// function isEnterKey(evt) {
//   return evt.key === 'Enter';
// }
//создание элемента в Дом-дереве
// const makeElement = function (tagName, className, text) {
//   const element = document.createElement(tagName);
//   element.classList.add(className);
//   if (text) {
//     element.textContent = text;
//   }
//   return element;
// };


export {getRandomeNumber, isEscapeKey};

