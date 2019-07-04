import { qsAll } from './helpers';

export default class Card {
  constructor(typeCl, containerCl) {
    this.types = qsAll(typeCl);
    this.containerCl = containerCl;

    if (this.types.length) this.init();
  }

  init() {
    this.types.forEach((el) => {
      el.addEventListener('click', (e) => {
        const { type } = el.dataset;
        this.types.forEach(item => item.classList.remove('active'));
        el.classList.add('active');

        qsAll(this.containerCl).forEach((container) => {
          const data = JSON.parse(container.dataset.card);
          container.textContent = data[type];
        });
        e.preventDefault();
      });
    });
  }
}
