export default class Download {
  constructor({
    triggers,
  }) {
    this.btns = document.querySelectorAll(triggers);
    this.path = './files/Loan.pdf';
  }

  downloadFile(path) {
    const link = document.createElement('a');

    link.style.display = 'none';
    link.setAttribute('href', path);
    link.setAttribute('download', 'loan');

    document.documentElement.appendChild(link);
    link.click();
    document.documentElement.removeChild(link);
    
  }

  render() {
    this.btns.forEach(btn => {
      btn.addEventListener('click', () => this.downloadFile(this.path));
    });
  }
}