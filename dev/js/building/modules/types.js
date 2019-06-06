import { qs, qsAll } from './helpers';

export default class Types {
  constructor(typesClass, hoverClass = null, tableClass = null) {
    this.typesClass = typesClass;
    this.hoverClass = hoverClass;
    this.tableClass = tableClass;

    this.typesElems = qs(`${this.typesClass} .swiper-slide`).length;

    this.init();
    if (hoverClass) this.hoverType();
  }

  init() {
    const typesCarousel = new Swiper(this.typesClass, {
      speed: 800,
      slidesPerView: 3,
      loopedSlides: this.typesElems,
      spaceBetween: 32,
      loop: true,
      breakpoints: {
        1600: {
          slidesPerView: 2,
        },
      },
    });
  }

  hoverType() {
    const t = this;

    qsAll(this.hoverClass).forEach((item) => {
      item.addEventListener('mouseenter', () => {
        const { type } = item.dataset;

        qs(`${t.tableClass} tr[data-type="${type}"]`).classList.add('choosed');
      });

      item.addEventListener('mouseleave', () => {
        qsAll(`${t.tableClass} tr`).forEach(tr => tr.classList.remove('choosed'));
      });
    });
  }
}
