import { qs } from './helpers';

export default class History {
  constructor(popupClass, historyContainer, colorizerClass) {
    this.popupCl = popupClass;
    this.popupContainerEl = qs(historyContainer);
    this.colorizerEl = qs(colorizerClass);

    this.init();
    if (this.colorizerEl) this.colorizer();
  }

  handler(e, item) {
    const th = this;
    const href = item.getAttribute('href');

    this.popupContainerEl.innerHTML = '<span class="history__loader"><i></i></span>';

    axios({
      method: 'get',
      url: href,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
      .then(({ data }) => {
        th.popupContainerEl.innerHTML = data;
        window.popup.open('#history');
      })
      .catch(({ data }) => {
        th.popupContainerEl.innerHTML = data;
      });

    e.preventDefault();
  }

  init() {
    document.addEventListener('click', (e) => {
      for (let { target } = e; target && target !== this; target = target.parentNode) {
        if (target.matches(this.popupCl)) {
          this.handler.call(this, e, target);
          break;
        }
      }
    }, false);
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
