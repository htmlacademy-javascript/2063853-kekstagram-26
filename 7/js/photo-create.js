export {createUsersPhoto};

const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
//функция - отрисовыватель фото по шаблону
function createUsersPhoto ({url, like, comments}) {
  const photo = photoTemplate.cloneNode(true);
  photo.querySelector('.picture__img').setAttribute('src', url);
  photo.querySelector('.picture__comments').textContent = comments.length;
  photo.querySelector('.picture__likes').textContent = like;
  return photo;
}

