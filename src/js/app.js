import { checkWebp } from './modules/gulpScripts.js';
import Slider from './modules/slider.js';
import VideoPlayer from './modules/playVideo.js';


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

  const player = new VideoPlayer({
    triggers: '.showup .play', 
    popup: '.overlay',
  });
  player.init();
});

