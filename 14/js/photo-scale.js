const scaleValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');
const imagePreviewContainer = document.querySelector('.img-upload__preview');
const SCALE_INCREMENT = 25;
const SCALE_MAX = 100;
const SCALE_START = 100;
const SCALE_MIN = 0;
let currentScaleValue = 100;

//изначальные настройки
function initializeCurrentScaleValue() {
  currentScaleValue = SCALE_START;
  imagePreview.style.transform = `scale(${currentScaleValue * 0.01})`;
  imagePreviewContainer.transform = `scale(${currentScaleValue * 0.01})`;
}

function biggerButtonClickHandler () {
  if (currentScaleValue < SCALE_MAX) {
    currentScaleValue += SCALE_INCREMENT;
    scaleValue.value = `${currentScaleValue.toString()}%`;

    imagePreview.style.transform = `scale(${currentScaleValue * 0.01})`;
    //чтобы и белое поле вокруг фото увеличивалось
    imagePreviewContainer.style.transform = `scale(${currentScaleValue * 0.01})`;
  }
}

function smallerButtonClickHandler () {
  if (currentScaleValue > SCALE_MIN) {
    currentScaleValue -= SCALE_INCREMENT;
    scaleValue.value = `${currentScaleValue.toString()}%`;

    imagePreview.style.transform = `scale(${currentScaleValue * 0.01})`;
    imagePreviewContainer.style.transform = `scale(${currentScaleValue * 0.01})`;
  }
}

export { initializeCurrentScaleValue, biggerButtonClickHandler, smallerButtonClickHandler };
