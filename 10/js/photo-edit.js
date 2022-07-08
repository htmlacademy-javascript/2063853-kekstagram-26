const scaleValue = document.querySelector('.scale__control--value');
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
    scaleValue.value = `${currentScaleValue.toString()}%`;

    imagePreview.style.transform = `scale(${currentScaleValue * 0.01})`;
  }
}

function makePhotoSmaller () {
  if (currentScaleValue > SCALE_MIN) {
    currentScaleValue -= SCALE_INCREMENT;
    scaleValue.value = `${currentScaleValue.toString()}%`;

    imagePreview.style.transform = `scale(${currentScaleValue * 0.01})`;
  }
}

//эффекты
const effect = {
  none: buildEffect('none', 0, 0, 0, '', ''),
  chrome: buildEffect('chrome', 0, 1, 0.1, 'grayscale', ''),
  sepia: buildEffect('sepia', 0, 1, 0.1, 'sepia', ''),
  phobos: buildEffect('phobos', 0, 3, 0.1, 'blur', 'px'),
  marvin: buildEffect('marvin', 0, 100, 1, 'invert', '%'),
  heat: buildEffect('heat', 1, 3, 0.1, 'brightness', ''),
};
const EFFECT_NONE = effect.none;
let currentEffect = effect.none;

//функция - создатель объекта для эффекта
function buildEffect(name, min, max, step, cssStyle, cssUnit) {
  return {
    name: name,
    min: min,
    max: max,
    step: step,
    cssStyle: cssStyle,
    cssUnit: cssUnit
  };
}

//слайдер
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectButtonsList = document.querySelector('.effects__list');

//применение эффекта при клике на кнопку эффекта
effectButtonsList.addEventListener('change', (event) => {
  const targetEffectButton = event.target;

  currentEffect = effect[targetEffectButton.value];

  updateSlider(currentEffect);
  applyEffectToPhotoPreview(currentEffect);
  effectLevelValue.value = currentEffect.max;
  updatePhotoPreviewFilter(currentEffect.max);
});

//создание слайдера
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

//запись значение на слайдере в скрытое поле для отправки на сервер + изменение насыщеннности эф-та
sliderElement.noUiSlider.on('update', () => {
  effectLevelValue.value = sliderElement.noUiSlider.get();
  updatePhotoPreviewFilter(effectLevelValue.value);
});

//обновление слайдера в зависимости от выбранного эффекта
function updateSlider(filter) {
  if (filter.name === 'none') {
    sliderElement.classList.add('hidden');
  } else {
    sliderElement.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: filter.min,
        max: filter.max
      },
      start: filter.max,
      step: filter.step
    });
  }
}

//применение эффекта на фото
function applyEffectToPhotoPreview(filter) {
  imagePreview.className = '';
  imagePreview.classList.add(`effects__preview--${filter.name}`);
  if (filter === EFFECT_NONE) {
    imagePreview.style.filter = '';
  }
}

//изменение насыщенности эффекта
function updatePhotoPreviewFilter(effectValue) {
  imagePreview.style.filter = `${currentEffect.cssStyle}(${effectValue}${currentEffect.cssUnit})`;
}

function resetEffects() {
  updateSlider(EFFECT_NONE);
  applyEffectToPhotoPreview(EFFECT_NONE);
}

export { initializeCurrentScaleValue, makePhotoBigger, makePhotoSmaller, resetEffects };
