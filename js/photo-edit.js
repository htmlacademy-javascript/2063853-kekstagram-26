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

//слайдер
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level__value');

// const effectNoneButton = document.querySelector('#effect-none');
// const effectChromeButton = document.querySelector('#effect-chrome');
// const effectSepiaButton = document.querySelector('#effect-sepia');
// const effectMarvinButton = document.querySelector('#effect-marvin');
// const effectPhobosButton = document.querySelector('#effect-phobos');
// const effectHeatButton = document.querySelector('#effect-heat');

const effects = {
  'none': 'effects__preview--none',
  'chrome': 'effects__preview--chrome',
  'sepia': 'effects__preview--sepia',
  'phobos': 'effects__preview--phobos',
  'marvin': 'effects__preview--marvin',
  'heat': 'effects__preview--heat',
};

const effectButtonsList = document.querySelector('.effects__list');

effectButtonsList.addEventListener('change', (event) => {
  const targetEffectButton = event.target;

  imagePreview.className = '';
  imagePreview.classList.add(effects[targetEffectButton.value]);
});

function addNone() {
  imagePreview.className = '';
  imagePreview.classList.add('effects__preview--none');
}

// function addChrome() {
//   imagePreview.className = '';
//   imagePreview.classList.add('effects__preview--chrome');
// }

// function addSepia() {
//   imagePreview.className = '';
//   imagePreview.classList.add('effects__preview--sepia');
// }

// function addMarvin() {
//   imagePreview.className = '';
//   imagePreview.classList.add('effects__preview--marvin');

// }

// function addPhobos() {
//   imagePreview.className = '';
//   imagePreview.classList.add('effects__preview--phobos');
// }

// function addHeat() {
//   imagePreview.className = '';
//   imagePreview.classList.add('effects__preview--heat');
// }

// effectNoneButton.addEventListener('click', addNone);
// effectChromeButton.addEventListener('click', addChrome);
// effectSepiaButton.addEventListener('click', addSepia);
// effectMarvinButton.addEventListener('click', addMarvin);
// effectPhobosButton.addEventListener('click', addPhobos);
// effectHeatButton.addEventListener('click', addHeat);

effectLevel.value = 100;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', () => {
  effectLevel.value = sliderElement.noUiSlider.get();
});


export { initializeCurrentScaleValue, makePhotoBigger, makePhotoSmaller, addNone };

//  Уровень эффекта записывается в поле .effect-level__value. При изменении уровня интенсивности эффекта,
// CSS-стили картинки внутри .img-upload__preview обновляются следующим образом:
// Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
// Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
// Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
// Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
// Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;
// Для эффекта «Оригинал» CSS-стили filter удаляются.
// При выборе эффекта «Оригинал» слайдер скрывается.
// При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%):
//слайдер, CSS-стиль изображения и значение поля должны обновляться.
