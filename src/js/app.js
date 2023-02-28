import { checkWebp } from './modules/gulpScripts.js';
import MainSlider from './modules/slider/slider-main.js';
import ModulesSlider from './modules/slider/slider-modules.js';
import ExploreSlider from './modules/slider/slider-explore.js';
import FeedSlider from './modules/slider/slider-feed.js';
import VideoPlayer from './modules/playVideo.js';
import DifferenceCard from './modules/difference.js';
import Forms from './modules/forms.js';
import ShowInfo from './modules/showInfo.js';
import Download from './modules/download.js';


window.addEventListener('DOMContentLoaded', () => {
  checkWebp();

  // sliders
  new MainSlider({
    wraper: 'body',
    sliderField: '.page',
    transitionDelay: 1,
    btnNext: '.next',
    btnStart: '[data-start-slider]',
    popup: '.hanson',
  }).render();

  new ModulesSlider({
    wraper: '.showup__content-slider',
    sliderField: '.showup__content-slider-field',
    transitionDelay: 1,
    btnNext: '.showup__next',
    btnPrev: '.showup__prev',
    customSelectors: {
      arrowSleide: '.card__controls-arrow',
      titleSlide: '.card__title',
    },
  }).render();

  new ExploreSlider({
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
  }).render();

  new FeedSlider({
    wraper: '.feed .feed__slider',
    sliderField: '.feed .feed__slider__field',
    transitionDelay: 1,
    btnNext: '.feed .slick-next',
    btnPrev: '.feed .slick-prev',
    startAutoplayAction: '.next',
    autoPlayDelay: 3000, 
    autoPlay: true,
  }).render();

  new MainSlider({
    wraper: 'body',
    sliderField: '.moduleapp',
    transitionDelay: 1,
    btnNext: '.next',
    btnPrev: '.prev',
    btnStart: '[data-start-slider]',
  }).render();

  // players
  new VideoPlayer({
    triggers: '.showup .play', 
    popup: '.overlay',
  }).init();

  new VideoPlayer({
    triggers: '.schedule .play', 
    popup: '.overlay',
  }).init();

  new VideoPlayer({
    triggers: '.module .play', 
    popup: '.overlay',
  }).init();

  // different cards
  new DifferenceCard({
    btn: '.difference .officernew .plus',
    cards: '.difference .officernew .officer__card-item',
  }).render();

  new DifferenceCard({
    btn: '.difference .officerold .plus',
    cards: '.difference .officerold .officer__card-item',
  }).render();

  // forms
  new Forms({
    form: '.join form',
    btnSend: 'button.btn',
    postOptions: {
      url: 'https://jsonplaceholder.typicode.com/posts',
      dataType: 'json',
      method: 'POST',
      headers: {},
    },
  }).init();

  new Forms({
    form: '.schedule form',
    btnSend: 'button.btn',
    postOptions: {
      url: 'https://jsonplaceholder.typicode.com/posts',
      dataType: 'json',
      method: 'POST',
      headers: {},
    },
  }).init();

  // show info
  new ShowInfo({
    trigger: '.module__info-show .plus',
    info: '.msg',
  }).render();

  // download
  new Download({
    triggers: '.module .download',
  }).render();

});

