import Slider from './slider.js';

export default class MainSlider extends Slider {
  constructor({
    wraper,
    sliderField,
    transitionDelay,
    btnNext = null,
    btnStart = null,
    popup = null,
    autoPlayDelay,
    autoPlay
  } = {}) {
    super({
      wraper,
      transitionDelay,
      sliderField,
      autoPlayDelay,
      autoPlay
    });
    this.next = document.querySelectorAll(btnNext);
    this.start = document.querySelectorAll(btnStart);
    this.popup = document.querySelector(popup);
    this.popupTimerId = null;
    this.width = window.getComputedStyle(this.wraper).width;
    this.offset = 0;
  }

  initPopup() {
    this.popup.style.transform = 'translateY(100%)';
    this.popup.style.transition = "0.5s all";
  }

  plusSlides(n) {
    this.showSlides(this.slideIndex += n);

    try {
      clearInterval(this.popupTimerId);

      if (this.slideIndex === 3) {
        this.popupTimerId = setTimeout(() => {
          this.popup.style.transform = '';
        }, 3000);
      } else {
        this.initPopup();
      }
    } catch (e) {}
  }

  initSlider() {
    this.sliderField.style.width = 100 * this.slides.length + "%";
    this.sliderField.style.display = "flex";
    this.sliderField.style.transition = `${this.transitionDelay}s all`;
    this.wraper.style.overflow = "hidden";

    [...this.slides].forEach(slide => {
      slide.style.width = this.width;
    });

  }

  showSlides(n) {
    this.changeIndex();

    if (this.action === 'next') {
      this.offset += parseInt(this.width);
      if (this.offset === parseInt(this.width) * this.slides.length) this.offset = 0;

    } else if (this.action === 'prev') {
      this.offset -= parseInt(this.width);
      if (this.offset < 0) this.offset = parseInt(this.width) * (this.slides.length - 1);

    } else {
      this.offset = 0;
    }
    this.sliderField.style.transform = `translateX(-${this.offset}px)`;

  }

  render() {
    this.initSlider();

    try {
      this.initPopup();
    } catch (e) {}

    try {
      this.next.forEach(btn => {
        btn.addEventListener('click', e => {
          e.preventDefault();
          this.action = 'next';
          this.plusSlides(1);
        });
      });

    } catch (e) {}

    try {
      this.start.forEach(btn => {
        btn.addEventListener('click', e => {
          e.preventDefault();
          this.action = 'start';
          this.showSlides(this.slideIndex = 1);
        });

      });
    } catch (e) {}

    this.showSlides(this.slideIndex);

  }
}