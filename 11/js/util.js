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

//обработка ошибок
const ALERT_SHOW_TIME = 5000;

function showAlert(message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '15px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'gold';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}


export {getRandomeNumber, isEscapeKey, showAlert};

