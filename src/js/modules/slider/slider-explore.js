import ModulesSlider from './slider-modules.js';

export default class ExploreSlider extends ModulesSlider {
  constructor({
    wraper,
    sliderField,
    transitionDelay,
    customSelectors = {},
    autoPlayDelay,
    autoPlay,
    btnNext,
    btnPrev,
    startAutoplayAction
  } = {}) {
    super({
      wraper,
      sliderField,
      transitionDelay,
      customSelectors,
      autoPlayDelay,
      autoPlay
    });
    this.next = document.querySelectorAll(btnNext);
    this.prev = document.querySelectorAll(btnPrev);
    this.startAutoplayAction = document.querySelectorAll(startAutoplayAction);
  }

  initSlider() {
    this.sliderField.style.cssText = `width: ${100 * this.slides.length / 2}%;
                                      display: flex;
                                      flex-wrap: wrap;
                                      transition: ${this.transitionDelay}s all;`;

    this.wraper.style.cssText = `overflow: hidden;
                                      transform: translateX(-144px);
                                      width: ${100 * this.slides.length / 2}%`;

    [...this.slides].forEach(slide => {
      slide.style.width = `${parseInt(this.width) / 2 - 24}px`;
      slide.classList.remove('card-active');

      slide.addEventListener('mouseenter', () => this.stopAutoplay());

      slide.addEventListener('mouseleave', () => {
        if (!this.idTimer) {
          this.beginAutoplay(() => {
            this.plusSlides.call(this, 1);
          });
        }
      });

    });

  }

  render() {
    try {
      this.initSlider();
      this.showSlides(this.slideIndex);
  
      try {
        this.next.forEach(btn => {
          btn.addEventListener('click', e => {
            e.preventDefault();
            this.action = 'next';
            this.stopAutoplay();
            this.plusSlides(1);
  
            this.beginAutoplay(() => {
              this.plusSlides.call(this, 1);
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
            this.plusSlides(-1);
  
            this.beginAutoplay(() => {
              this.plusSlides.call(this, 1);
            });
          });
  
        });
      } catch (e) {}
  
      this.startAutoplayAction.forEach((action, i) => {
        action.addEventListener('click', () => {
          if (this.startAutoplayAction[i + 1] && this.startAutoplayAction[i + 1].closest('.modules') && !this.idTimer) {
            this.beginAutoplay(() => {
              this.plusSlides.call(this, 1);
            });
          }
        });
      });
    } catch (error) {
      
    }


  }
}