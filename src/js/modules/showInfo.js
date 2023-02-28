export default class ShowInfo {
  constructor({ 
    trigger,
    info,
  }) {
    this.triggers = document.querySelectorAll(trigger);
    this.info = info;
  }

  showInfo(btn, e) {
    e.preventDefault();
    const blockInfo = btn.closest('.module__info').querySelector(this.info);
  
    blockInfo.style.height = window.getComputedStyle(blockInfo).height === '0px' ? this.height : 0;
    
  }

  render() {
    document.querySelectorAll(this.info).forEach( infoBlock => {
      
      infoBlock.style.display = 'block';
      this.height = window.getComputedStyle(infoBlock).height;

      infoBlock.style.height = 0;
      infoBlock.style.overflow = 'hidden';
      infoBlock.style.transition = '2s all';
    });

    this.triggers.forEach( btnShow => {
      btnShow.addEventListener('click', this.showInfo.bind(this, btnShow));
    });
  }
}