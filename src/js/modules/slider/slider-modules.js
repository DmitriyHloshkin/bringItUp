import Slider from './slider.js';

export default class ModulesSlider extends Slider {
  constructor({
    wraper,
    sliderField,
    transitionDelay,
    btnNext = null,
    btnPrev = null,
    customSelectors = {},
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
    this.prev = document.querySelectorAll(btnPrev);
    this.width = window.getComputedStyle(this.wraper).width;
    this.offset = 0;
    this.titleSlide = customSelectors.titleSlide || null;
    this.arrowSleide = customSelectors.arrowSleide || null;
  }

  initSlider() {
    this.sliderField.style.width = 100 * this.slides.length / 2 + "%";
    this.sliderField.style.display = "flex";
    this.sliderField.style.flexWrap = "wrap";
    this.sliderField.style.transition = `${this.transitionDelay}s all`;
    this.wraper.style.overflow = "hidden";

    [...this.slides].forEach(slide => {
      slide.style.width = `${parseInt(this.width) / 2 - 24}px`;
    });

  }

  showSlides(n) {
    this.changeIndex();

    if (this.action === 'next') {
      this.offset += parseInt(this.width) / 2;
      if (this.offset === (parseInt(this.width) / 2) * this.slides.length) this.offset = 0;

    } else if (this.action === 'prev') {
      this.offset -= parseInt(this.width) / 2;
      if (this.offset < 0) this.offset = (parseInt(this.width) * (this.slides.length - 2) / 2) + parseInt(this.width) / 2;

    } else {
      this.offset = 0;
    }
    this.sliderField.style.transform = `translateX(-${this.offset}px)`;

    this.customicSlide();


  }

  customicSlide() {
    [...this.slides].forEach(slide => {
      const title = slide.querySelector(this.titleSlide),
        arrovSlide = slide.querySelector(this.arrowSleide);

      if (title) {
        if (slide === [...this.slides][this.slideIndex - 1]) {
          title.style.opacity = '1';
        } else {
          title.style.opacity = '0.4';
        }
      }

      if (arrovSlide) {
        if (slide === [...this.slides][this.slideIndex - 1]) {
          arrovSlide.style.opacity = '1';
        } else {
          arrovSlide.style.opacity = '0';
        }
      }

      if (slide === [...this.slides][this.slideIndex - 1]) {
        slide.classList.add('card-active');
      } else {
        slide.classList.remove('card-active');
      }

    });
  }

  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  render() {
    this.initSlider();

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
      this.prev.forEach(btn => {
        btn.addEventListener('click', e => {
          e.preventDefault();
          this.action = 'prev';
          this.plusSlides(-1);
        });

      });
    } catch (e) {}

    this.showSlides(this.slideIndex);

  }
}