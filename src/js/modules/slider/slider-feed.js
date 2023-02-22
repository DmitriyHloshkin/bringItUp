import Slider from './slider.js';

export default class FeedSlider extends Slider {
  constructor({
    wraper,
    sliderField,
    transitionDelay,
    btnNext = null,
    btnPrev = null,
    startAutoplayAction = null,
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
    this.slideMargin = window.getComputedStyle(this.sliderField.querySelector('.feed__item')).marginRight;
    this.slideWith = window.getComputedStyle(this.sliderField.querySelector('.feed__item:not(.feed__item-active)')).width;
    this.activSlideWith = window.getComputedStyle(this.sliderField.querySelector('.feed__item-active')).width;
    this.step = parseInt(this.slideMargin) + parseInt(this.slideWith);
    this.offset = parseInt(this.activSlideWith) - parseInt(this.slideWith) + parseInt(this.slideMargin);
    this.slidesLenght = this.slides.length;
    this.startAutoplayAction = document.querySelectorAll(startAutoplayAction);

  }

  initSlider() {

    [...this.slides.slice().reverse()].forEach(slide => {
      const clone = slide.cloneNode(true);
      clone.classList.add('clone');

      clone.classList.remove('feed__item-active');
      this.sliderField.insertBefore(clone, this.sliderField.querySelector('.feed__item'));
    });

    this.slides.forEach(slide => {
      const clone = slide.cloneNode(true);
      clone.classList.add('clone');

      clone.classList.remove('feed__item-active');
      this.sliderField.appendChild(clone);
    });

    this.reInitSlides();

    this.wraper.style.cssText = `overflow: hidden;
                                position: relative;`;

    this.sliderField.style.cssText = `display:flex;
                                    align-items: flex-start;
                                    justify-content: flex-start;
                                    width: ${this.slides.length * 100}px`;

    this.changeSlide();
  }

  changeSlide() {

    this.slides.forEach((slide, i) => {
      slide.style.cssText = `position: absolute;
                            transition: ${this.transitionDelay}s left;
                            left: 0;`;

      slide.classList.remove('feed__item-active');

      if (i > this.slidesLenght) {
        slide.style.left = `${(i - this.slidesLenght) * this.step + this.offset}px`;
      }

      if (i <= this.slidesLenght - 1) {
        slide.style.left = `${-this.step * (this.slidesLenght - i)}px`;
      }

      if (i === this.slidesLenght) {
        slide.classList.add('feed__item-active');
        slide.style.zIndex = '2';
      }

    });
  }

  plusSlides() {
    this.showSlides();
  }

  showSlides() {

    if (this.action === 'next') {
      const lastSlide = this.slides[this.slides.length - 1].cloneNode(true);
      this.sliderField.insertBefore(lastSlide, this.sliderField.querySelector('.feed__item'));
      this.slides[this.slides.length - 1].remove();
    }

    if (this.action === 'prev') {
      const lastSlide = this.slides[0].cloneNode(true);
      this.sliderField.appendChild(lastSlide);
      this.slides[0].remove();
    }

    this.reInitSlides();

    this.slides.forEach(slide => {
      slide.addEventListener('mouseenter', e => {
        if (e.target.closest('.feed__item-active')) {
          this.stopAutoplay();
        }
      });

      slide.addEventListener('mouseleave', () => {
        if (!this.idTimer) {
          this.beginAutoplay(() => {
            this.plusSlides.call(this);
          });
        }
      });
    });

    this.changeSlide();
  }

  render() {
    this.initSlider();

    try {
      this.next.forEach(btn => {
        btn.addEventListener('click', e => {
          e.preventDefault();
          this.action = 'next';
          this.stopAutoplay();
          this.plusSlides();

          this.beginAutoplay(() => {
            this.plusSlides.call(this);
          });

        });
      });

    } catch (e) {}

    try {
      this.prev.forEach(btn => {
        btn.addEventListener('click', e => {
          e.preventDefault();
          this.action = 'prev';
          this.stopAutoplay();
          this.plusSlides();

          this.beginAutoplay(() => {
            this.plusSlides.call(this);
          });

        });

      });
    } catch (e) {}

    this.startAutoplayAction.forEach((action, i) => {
      action.addEventListener('click', () => {
        if (this.startAutoplayAction[i + 1] && this.startAutoplayAction[i + 1].closest('.feed') && !this.idTimer) {
          this.beginAutoplay(() => {
            this.plusSlides.call(this, 1);
          });
        }
      });
    });

  }
}