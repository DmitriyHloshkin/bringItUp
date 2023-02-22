import { checkWebp } from './modules/gulpScripts.js';
import MainSlider from './modules/slider/slider-main.js';
import ModulesSlider from './modules/slider/slider-modules.js';
import ExploreSlider from './modules/slider/slider-explore.js';
import FeedSlider from './modules/slider/slider-feed.js';
import VideoPlayer from './modules/playVideo.js';
import DifferenceCard from './modules/difference.js';


window.addEventListener('DOMContentLoaded', () => {
  checkWebp();
  const mainSlider = new MainSlider({
    wraper: 'body',
    sliderField: '.page',
    transitionDelay: 1,
    btnNext: '.next',
    btnStart: '[data-start-slider]',
    popup: '.hanson',
  });
  mainSlider.render();

  const showSlider = new ModulesSlider({
    wraper: '.showup__content-slider',
    sliderField: '.showup__content-slider-field',
    transitionDelay: 1,
    btnNext: '.showup__next',
    btnPrev: '.showup__prev',
    customSelectors: {
      arrowSleide: '.card__controls-arrow',
      titleSlide: '.card__title',
    },
  });
  showSlider.render();

  const modulesSlider = new ExploreSlider({
    wraper: '.modules__slider-container',
    sliderField: '.modules__content-slider',
    transitionDelay: 1,
    btnNext: '.modules__info-btns .slick-next',
    btnPrev: '.modules__info-btns .slick-prev',
    startAutoplayAction: '.next',
    autoPlayDelay: 3000, 
    autoPlay: true,
    customSelectors: {
      arrowSleide: '.card__controls-arrow',
      titleSlide: '.card__title',
    },
  }); 
  modulesSlider.render();

  const feedSlider = new FeedSlider({
    wraper: '.feed .feed__slider',
    sliderField: '.feed .feed__slider__field',
    transitionDelay: 1,
    btnNext: '.feed .slick-next',
    btnPrev: '.feed .slick-prev',
    startAutoplayAction: '.next',
    autoPlayDelay: 3000, 
    autoPlay: true,
  }); 
  feedSlider.render();

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

