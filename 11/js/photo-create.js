const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

function createUsersPhoto ({url, likes, comments}) {
  const photo = photoTemplate.cloneNode(true);
  photo.querySelector('.picture__img').src = url;
  photo.querySelector('.picture__comments').textContent = comments.length;
  photo.querySelector('.picture__likes').textContent = likes;

  return photo;
}

export {createUsersPhoto};
