export default class VideoPlayer {

  constructor({
    triggers,
    popup,
    slide = null,
  }) {
    this.btns = document.querySelectorAll(triggers);
    this.popup = document.querySelector(popup);
    this.slide = slide;
    try {
      this.close = this.popup.querySelector('.close');
    } catch (error) {}
    
  }

  bindTriggers() {
    if(!this.slide) { 
      this.btns.forEach(btn => {
        btn.addEventListener('click', this.createPlayer.bind(this,btn.getAttribute('data-url'), btn));
      });
    } else {
        const dataUrl = this.slide.querySelector('.playvideo')?.getAttribute('data-url');
        this.slide.addEventListener('click', this.createPlayer.bind(this, dataUrl, this.slide));
    }
  }

  bindClose() {
    this.close.addEventListener('click', () => {
      this.popup.style.display = 'none';
      this.player.destroy();
    });
  }

  createPlayer(url, btn) {
    if(!btn.firstElementChild.classList.contains('closed')) {
      this.player = new YT.Player('frame', {
        height: '100%',
        width: '100%',
        videoId: `${url}`,
        events: {
          'onStateChange': onPlayerStateChange.bind(btn),
        }
      });
      this.bindClose();
      this.popup.style.display = 'flex';
    }

    function onPlayerStateChange(e) {
      if (e.data === 1) {
        try {
          const wrapper = this.closest('.module__video'),
                btnOpen = this.querySelector('.play__circle').cloneNode(true);

          wrapper?.querySelector('.closed').replaceWith(btnOpen);
          wrapper.querySelectorAll('.module__video-item').forEach( video => {
            video.style.opacity = '1';
            video.style.filter = 'none';
          });

        } catch (error) {}

      }
    }

  }

  appendScript() {
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    tag.async = false;

    const firstScriptTag = document.getElementsByTagName('script')[0];
    
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  init() {
    try {
      const scripts = Array.from(document.querySelectorAll('script'));
      
      if(!scripts.some( script => script.getAttribute('src') === "https://www.youtube.com/iframe_api") ? true : false) {
        this.appendScript();
      }

      this.bindTriggers();    

    } catch (error) {}
  }
}