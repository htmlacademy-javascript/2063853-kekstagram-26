const scaleControl = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');
const SCALE_INCREMENT = 25;
const SCALE_MAX = 100;
const SCALE_START = 100;
const SCALE_MIN = 0;
let currentScaleValue = 100;

function initializeCurrentScaleValue() {
  currentScaleValue = SCALE_START;
  imagePreview.style.transform = `scale(${currentScaleValue * 0.01})`;
}

function makePhotoBigger () {

  if (currentScaleValue < SCALE_MAX) {
    currentScaleValue += SCALE_INCREMENT;
    scaleControl.value = `${currentScaleValue.toString()}%`;

    imagePreview.style.transform = `scale(${currentScaleValue * 0.01})`;
  }

}

function makePhotoSmaller () {
  if (currentScaleValue > SCALE_MIN) {
    currentScaleValue -= SCALE_INCREMENT;
    scaleControl.value = `${currentScaleValue.toString()}%`;

    imagePreview.style.transform = `scale(${currentScaleValue * 0.01})`;
  }
}

export {initializeCurrentScaleValue, makePhotoBigger, makePhotoSmaller};
