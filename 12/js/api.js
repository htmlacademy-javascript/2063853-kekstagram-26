import{ showAlert } from './util.js';

const DATA_SERVER = 'https://26.javascript.pages.academy/kekstagram/data';
const SEND_SERVER = 'https://26.javascript.pages.academy/kekstagram';

function getData (onSuccess) {
  fetch(DATA_SERVER)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error ('Не удалось загрузить данные. Обновите страницу!');
    })
    .then(onSuccess)
    .catch((error) => showAlert(error.message) );
}

function sendData(onSuccess, onFail, body) {
  fetch(
    SEND_SERVER,
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
