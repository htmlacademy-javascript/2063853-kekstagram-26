import{ showAlert } from './util.js';

function getData (onSuccess) {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => {

      if (response.ok) {
        return response;
      }

      showAlert('Не удалось загрузить данные. Обновите страницу!');
    })
    .then((response) => response.json())
    .then((photos) => onSuccess(photos))
    .catch(() => showAlert('Не удалось загрузить данные. Обновите страницу!') );
}

function sendData(onSuccess, onFail, body) {
  fetch(
    'https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => onFail());
}

export{ getData, sendData };
