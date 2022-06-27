const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
//функция - отрисовыватель фото по шаблону
function createUsersPhoto ({id, url, like, comments}) {
  const photo = photoTemplate.cloneNode(true);
  photo.setAttribute('data-photo-id', id);
  photo.querySelector('.picture__img').src = url;
  photo.querySelector('.picture__comments').textContent = comments.length;
  photo.querySelector('.picture__likes').textContent = like;
  return photo;
}

export {createUsersPhoto};
