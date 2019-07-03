import { qsAll } from './helpers';

export default class Types {
  constructor(typesClass, hoverClass = null, tableClass = null) {
    this.typesClass = typesClass;
    this.hoverClass = hoverClass;
    this.tableClass = tableClass;

    this.typesElems = qsAll(`${this.typesClass} .swiper-slide`).length;

    if (this.typesElems) this.init();
    if (hoverClass) this.hoverType();
  }

  init() {
    const typesCarousel = new Swiper(this.typesClass, {
      speed: 800,
      slidesPerView: 'auto',
      loopedSlydes: this.typesElems,
      spaceBetween: 50,
      loop: true,
      breakpoints: {
        900: {
          spaceBetween: 20,
        },
        1400: {
          spaceBetween: 32,
        },
      },
    });

    qsAll(`${this.typesClass} .swiper-slide`).forEach((item) => {
      item.addEventListener('click', () => {
        if (item.classList.contains('swiper-slide-prev')) typesCarousel.slidePrev(800);
        if (item.previousElementSibling.classList.contains('swiper-slide-next')) typesCarousel.slideNext(800);
      });
    });
  }

  hoverType() {
    const t = this;

    qsAll(this.hoverClass).forEach((item) => {
      item.addEventListener('mouseenter', () => {
        const { type, orientation } = item.dataset;

        if (orientation === 'vertical') {
          qsAll(`${t.tableClass} [data-type="${type}"]`).forEach(cell => cell.classList.add('choosed'));
        } else {
          qsAll(`${t.tableClass} tr[data-type="${type}"]`).forEach(cell => cell.classList.add('choosed'));
        }
      });

      item.addEventListener('mouseleave', () => {
        qsAll(`${t.tableClass} th, tr, td`).forEach(tr => tr.classList.remove('choosed'));
      });
    });
  }
}
