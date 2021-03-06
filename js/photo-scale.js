const SCALE_INCREMENT = 25;
const SCALE_MAX = 100;
const SCALE_START = 100;
const SCALE_MIN = 25;
const SCALE_TRANSFORMER = 0.01;

let currentScaleValue = 100;
const scaleValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

//изначальные настройки
const initializeCurrentScaleValue = () => {
  currentScaleValue = SCALE_START;
  imagePreview.style.transform = `scale(${currentScaleValue * SCALE_TRANSFORMER})`;
};

const biggerButtonClickHandler = () => {
  if (currentScaleValue < SCALE_MAX) {
    currentScaleValue += SCALE_INCREMENT;
    scaleValue.value = `${currentScaleValue.toString()}%`;

    imagePreview.style.transform = `scale(${currentScaleValue * SCALE_TRANSFORMER})`;
  }
};

const smallerButtonClickHandler = () => {
  if (currentScaleValue > SCALE_MIN) {
    currentScaleValue -= SCALE_INCREMENT;
    scaleValue.value = `${currentScaleValue.toString()}%`;

    imagePreview.style.transform = `scale(${currentScaleValue * SCALE_TRANSFORMER})`;
  }
};

export { initializeCurrentScaleValue, biggerButtonClickHandler, smallerButtonClickHandler };
