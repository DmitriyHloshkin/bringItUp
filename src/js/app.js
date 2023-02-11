import { checkWebp } from './modules/gulpScripts.js';
import Slider from './modules/slider.js';

checkWebp();

window.addEventListener('DOMContentLoaded', () => {
  const pageSlider = new Slider({
    wraper: '.page',
    typeSlider: 'transition',
    delay: 0.5,
    sliderField: null,
    btns: {
      next: '.next',
      prev: null,
      start: '[data-start-slider]'
    },
  });

  pageSlider.render();
});

