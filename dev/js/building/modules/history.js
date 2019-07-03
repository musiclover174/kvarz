import { qs, qsAll } from './helpers';

export default class History {
  constructor(popupClass, historyContainer, colorizerClass) {
    this.hrefEls = qsAll(popupClass);
    this.popupContainerEl = qs(historyContainer);
    this.colorizerEl = qs(colorizerClass);

    if (this.hrefEls.length) this.init();
    if (this.colorizerEl) this.colorizer();
  }

  init() {
    const th = this;

    this.hrefEls.forEach((item) => {
      item.addEventListener('click', (e) => {
        const href = item.getAttribute('href');
        th.popupContainerEl.innerHTML = '<span class="history__loader"><i></i></span>';
        axios.get(href)
          .then(({ data }) => {
            th.popupContainerEl.innerHTML = data;
            window.popup.open('#history');
          })
          .catch(({ data }) => {
            th.popupContainerEl.innerHTML = data;
          });
        e.preventDefault();
      });
    });
  }

  colorizer() {
    window.addEventListener('scroll', () => {
      if (this.colorizerEl.getBoundingClientRect().top <= 0) {
        this.colorizerEl.classList.add('colorizer');
      } else {
        this.colorizerEl.classList.remove('colorizer');
      }
    });
  }
}
