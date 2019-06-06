import { qs } from './helpers';

export default class Lead {
  constructor(leadClass) {
    this.leadClass = leadClass;
    this.bannerElems = qs(`${this.leadClass} .swiper-slide`).length;

    this.init();
  }

  init() {
    const leadCarousel = new Swiper(this.leadClass, {
      speed: 800,
      slidesPerView: 'auto',
      loopedSlides: this.bannerElems,
      spaceBetween: 32,
      loop: true,
    });
  }
}