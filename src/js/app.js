import { checkWebp } from './modules/gulpScripts.js';
import Slider from './modules/slider.js';
import VideoPlayer from './modules/playVideo.js';
import DifferenceCard from './modules/difference.js';


checkWebp();

window.addEventListener('DOMContentLoaded', () => {
  const pageSlider = new Slider({
    wraper: '.page',
    typeSlider: 'transition',
    delay: 0.5,
    btns: {
      next: '.next',
      prev: null,
      start: '[data-start-slider]'
    },
  });
  pageSlider.render();

  // const showupSlider = new Slider({
  //   wraper: '.showup__content-slider',
  //   typeSlider: 'transition',
  //   delay: 0.5,
  //   btns: {
  //     next: 'showup__next',
  //     prev: '.showup__prev',
  //   },
  // });
  // showupSlider.render();


  const player = new VideoPlayer({
    triggers: '.showup .play', 
    popup: '.overlay',
  });
  player.init();


  const difference = new DifferenceCard({
    btn: '.difference .plus',
    cards: '.difference .officernew .officer__card-item',
  });

  difference.render();
});

