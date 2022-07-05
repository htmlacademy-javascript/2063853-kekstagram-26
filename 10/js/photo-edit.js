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
const NONE_EFFECT = buildEffect('none', 0, 0, 0, '', '');
const EFFECTS = [
  NONE_EFFECT,
  buildEffect('chrome', 0, 1, 0.1, 'grayscale', ''),
  buildEffect('sepia', 0, 1, 0.1, 'sepia', ''),
  buildEffect('phobos', 0, 3, 0.1, 'blur', 'px'),
  buildEffect('marvin', 0, 100, 1, 'invert', '%'),
  buildEffect('heat', 1, 3, 0.1, 'brightness', ''),
];
let currentEffect = NONE_EFFECT;

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
  for (let i = 0; i < EFFECTS.length; i ++) {
    if (EFFECTS[i].name === targetEffectButton.value) {
      currentEffect = EFFECTS[i];
    }
  }
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
function updateSlider(effect) {
  if (effect.name === 'none') {
    sliderElement.classList.add('hidden');
  } else {
    sliderElement.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: effect.min,
        max: effect.max
      },
      start: effect.max,
      step: effect.step
    });
  }
}

//применение эффекта на фото
function applyEffectToPhotoPreview(effect) {
  imagePreview.className = '';
  imagePreview.classList.add(`effects__preview--${effect.name}`);
}

//изменение насыщенности эффекта
function updatePhotoPreviewFilter(effectValue) {
  imagePreview.style.filter = `${currentEffect.cssStyle}(${effectValue}${currentEffect.cssUnit})`;
}

function resetEffects() {
  updateSlider(NONE_EFFECT);
  applyEffectToPhotoPreview(NONE_EFFECT);
}

export { initializeCurrentScaleValue, makePhotoBigger, makePhotoSmaller, resetEffects };
