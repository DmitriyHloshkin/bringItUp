export default class Slider {
  constructor({
    wraper = null,
    sliderField = null,
    transitionDelay = 0.5,
    autoPlay = false,
    autoPlayDelay = 1000
  } = {}) {
    this.wraper = document.querySelector(wraper);
    this.sliderField = document.querySelector(sliderField);
    this.slides = [...this.sliderField.children];
    this.slideIndex = 1;
    this.transitionDelay = transitionDelay;
    this.autoPlay = autoPlay;
    this.autoPlayDelay = autoPlayDelay;
    this.idTimer = null;
  }

  changeIndex() {
    if (this.slideIndex > this.slides.length) this.slideIndex = 1;
    if (this.slideIndex === 0) this.slideIndex = this.slides.length;
  }

  beginAutoplay(callBack) {
    this.action = 'next';
    this.idTimer = setInterval(callBack, this.autoPlayDelay);
  }

  stopAutoplay() {
    this.idTimer = clearInterval(this.idTimer);
  }

  reInitSlides() {
    this.slides = [...this.sliderField.children];
  }

}