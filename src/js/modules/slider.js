/* Принимает объект параметром:
      wraper - обвертка слайдера;
      sliderField - лента слайдов для типа transition;
      typeSlider - тип слайдера (display - на свойстве display: block/none
                                taransition - лента на свойстве transition);
      delay - задержка анимаций;
      btns - объект с кнопками переключения слайдов(next - следующий слйд
                                                    prev - предыдущий
                                                    start - в начало слайдера);

      {
        wraper: '.page',
        sliderField: null,
        typeSlider: 'transition || display',
        delay: 0.5,
        btns: {
          next: '.next',
          prev: 'prev',
          start: '[data-start-slider]'
        },
      }
 */

export default class Slider {
  constructor({
    wraper,
    sliderField,
    btns,
    typeSlider = 'display'
  }) {
    this.wraper = document.querySelector(wraper);
    this.sliderField = sliderField || this.wraper;
    this.slides = [...this.wraper.children];
    this.btns = btns;
    this.slideIndex = 1;
    this.typeSlider = typeSlider;
    this.offset = 0;
    this.width = window.getComputedStyle(this.wraper).width;
    this.action = 'start';
  }

  showSlides(n) {
    switch (this.typeSlider) {
      case ('display'):
        if (n > this.slides.length) this.slideIndex = 1;
        if (n < 1) this.slideIndex = this.slides.length;

        this.slides.forEach(slide => {
          slide.style.display = 'none';
        });

        this.slides[this.slideIndex - 1].style.display = 'block';

        break;

      case ('transition'):
        if (this.action === 'next') {
          this.offset += parseInt(this.width);
          if (this.offset === parseInt(this.width) * this.slides.length) this.offset = 0;

        } else if (this.action === 'prev') {
          this.offset -= parseInt(this.width);
          if (this.offset < 0) this.offset = parseInt(this.width) * (this.slides.length - 1);

        } else {
          this.offset = 0;
        }
        this.wraper.style.transform = `translateX(-${this.offset}px)`;
        break;
    }

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

  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  initPopup() {
    this.popup.style.transform = 'translateY(100%)';
    this.popup.style.transition = "0.5s all";
  }

  render() {
    try {
      this.popup = document.querySelector('.hanson');
      this.popupTimerId = null;
      this.initPopup();
    } catch (e) {}

    const {
      next,
      prev,
      start
    } = this.btns;

    try {
      const btnNext = document.querySelectorAll(next);

      btnNext.forEach(btn => {
        btn.addEventListener('click', e => {
          e.preventDefault();
          this.action = 'next';
          this.plusSlides(1);
        });
      });

    } catch (e) {}

    try {
      const btnStart = document.querySelectorAll(start);

      btnStart.forEach(btn => {
        btn.addEventListener('click', e => {
          e.preventDefault();
          this.action = 'start';
          this.showSlides(this.slideIndex = 1);
        });

      });
    } catch (e) {}

    try {
      const btnPrev = document.querySelectorAll(prev);

      btnPrev.forEach(btn => {
        btn.addEventListener('click', e => {
          e.preventDefault();
          this.action = 'prev';
          this.showSlides(-1);
        });

      });
    } catch (e) {}

    switch (this.typeSlider) {
      case ('transition'):
        this.sliderField.style.width = 100 * this.slides.length + "%";
        this.sliderField.style.display = "flex";
        this.sliderField.style.transition = "0.5s all";

        this.wraper.style.overflow = "hidden";

        [...this.slides].forEach(slide => {
          slide.style.width = this.width;
        });
        break;
    }

    this.showSlides(this.slideIndex);

  }

}