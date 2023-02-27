export default class DifferenceCard {
  constructor({
    btn,
    cards,
  }) {
    this.cards = document.querySelectorAll(cards);
    this.btn = document.querySelector(btn);
    this.cardSelector = cards;
    this.index = 0;
  }

  render() {
    try {
      this.cards.forEach(card => {
        card.classList.add('animate__animated', 'animate__fadeIn');
        if (card !== this.btn.closest(this.cardSelector)) {
          card.style.display = 'none';
        }
  
      });
  
      this.btn.addEventListener('click', () => {
        this.showCard(this.index++);
      });
    } catch (error) {}

  }

  showCard(n) {
    this.cards[n].style.display = 'flex';

    if (this.index === this.cards.length - 1) {
      this.cards[this.cards.length - 1].style.display = 'none';
    }
  }

}