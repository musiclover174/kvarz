import { qs } from './helpers';

export default class Lead {
  constructor(leadClass) {
    this.leadClass = leadClass;
    this.leadElems = qs(`${this.leadClass} .swiper-slide`).length;

    this.init();
  }

  init() {
    const leadCarousel = new Swiper(this.leadClass, {
      speed: 800,
      slidesPerView: 'auto',
      loopedSlides: this.leadElems,
      spaceBetween: 50,
      loop: true,
      watchOverflow: true,
      roundLengths: true,
      breakpoints: {
        900: {
          spaceBetween: 20,
        },
        1400: {
          spaceBetween: 32,
        },
      },
    });
  }
}
