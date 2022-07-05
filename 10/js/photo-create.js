const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
//функция для отрисовки миниатюр
function createUsersPhoto ({url, like, comments}) {
  const photo = photoTemplate.cloneNode(true);
  photo.querySelector('.picture__img').src = url;
  photo.querySelector('.picture__comments').textContent = comments.length;
  photo.querySelector('.picture__likes').textContent = like;

  return photo;
}

export {createUsersPhoto};
