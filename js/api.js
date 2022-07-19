import{ showAlert } from './util.js';

const ALLERT_MESSAGE = 'Не удалось загрузить данные. Обновите страницу!';
const DATA_SERVER = 'https://26.javascript.pages.academy/kekstagram/data';
const SEND_SERVER = 'https://26.javascript.pages.academy/kekstagram';

function getData (onSuccess) {
  fetch(DATA_SERVER)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error (ALLERT_MESSAGE);
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
