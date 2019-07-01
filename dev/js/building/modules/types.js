import { qs, qsAll } from './helpers';

export default class Types {
  constructor(typesClass, hoverClass = null, tableClass = null) {
    this.typesClass = typesClass;
    this.hoverClass = hoverClass;
    this.tableClass = tableClass;

    this.typesElems = qsAll(`${this.typesClass} .swiper-slide`).length;

    this.init();
    if (hoverClass) this.hoverType();
  }

  init() {
    const typesCarousel = new Swiper(this.typesClass, {
      speed: 800,
      slidesPerView: 'auto',
      loopedSlydes: this.typesElems,
      spaceBetween: 50,
      loop: true,
      // navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      // },
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
        const { type } = item.dataset;

        qs(`${t.tableClass} tr[data-type="${type}"]`).classList.add('choosed');
      });

      item.addEventListener('mouseleave', () => {
        qsAll(`${t.tableClass} tr`).forEach(tr => tr.classList.remove('choosed'));
      });
    });
  }
}
