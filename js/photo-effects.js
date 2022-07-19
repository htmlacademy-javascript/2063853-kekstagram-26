const imagePreview = document.querySelector('.img-upload__preview img');
//эффекты
const effect = {
  none: buildEffect('none', 0, 0, 0, '', ''),
  chrome: buildEffect('chrome', 0, 1, 0.1, 'grayscale', ''),
  sepia: buildEffect('sepia', 0, 1, 0.1, 'sepia', ''),
  phobos: buildEffect('phobos', 0, 3, 0.1, 'blur', 'px'),
  marvin: buildEffect('marvin', 0, 100, 1, 'invert', '%'),
  heat: buildEffect('heat', 1, 3, 0.1, 'brightness', ''),
};
const effectNone = effect.none;
let currentEffect = effect.none;
//слайдер
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectButtonsList = document.querySelector('.effects__list');

//функция - создатель объекта для каждого эффекта
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

//применение эффекта при клике на кнопку эффекта
effectButtonsList.addEventListener('change', effectButtonChangeHandler);

function effectButtonChangeHandler (event) {
  const targetEffectButton = event.target;

  currentEffect = effect[targetEffectButton.value];

  updateSlider(currentEffect);
  applyEffectToPhotoPreview(currentEffect.max);
}

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
  applyEffectToPhotoPreview(effectLevelValue.value);
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
function applyEffectToPhotoPreview(effectValue) {
  const effectClassName = `effects__preview--${currentEffect.name}`;

  if (!imagePreview.classList.contains(effectClassName)) {
    imagePreview.className = '';
    imagePreview.classList.add(effectClassName);
  }

  if (currentEffect === effectNone) {
    imagePreview.style.filter = '';
  } else {
    imagePreview.style.filter = `${currentEffect.cssStyle}(${effectValue}${currentEffect.cssUnit})`;
  }
}

function resetEffects() {
  updateSlider(effectNone);
  imagePreview.className = '';
  imagePreview.style.filter = '';
}

export { resetEffects };
