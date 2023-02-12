export default class DifferenceCard {
  constructor({
    btn,
    cards,
  }) {
    this.cards = document.querySelectorAll(cards);
    this.btn = document.querySelector(btn);
    this.index = 0;
  }

  render() {
    this.cards.forEach(card => {
      card.classList.add('animate__animated', 'animate__fadeIn');
      if (card !== this.btn.closest('.officer__card-item')) {
        card.style.display = 'none';
      }

    });

    this.btn.addEventListener('click', () => {
      this.showCard(this.index++);
    });
  }

  showCard(n) {
    this.cards[n].style.display = 'flex';

    if (this.index === 3) {
      this.cards[this.cards.length - 1].style.display = 'none';
    }
  }

}