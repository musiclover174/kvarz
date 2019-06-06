import { qs } from './helpers';

export default class Banner {
  constructor(bannerClass) {
    this.bannerClass = bannerClass;
    this.bannerElems = qs(`${this.bannerClass} .swiper-slide`).length;
    this.lock = false;
    this.init();
  }

  init() {
    const interleaveOffset = 1;

    const bannerCarousel = new Swiper(this.bannerClass, {
      speed: 0,
      slidesPerView: 1,
      loopedSlides: this.bannerElems,
      spaceBetween: 0,
      allowTouchMove: 0,
      loop: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      autoplay: {
        delay: 8000,
      },
    });

    qs(`${this.bannerClass} .swiper-button-next`).addEventListener('click', () => {
      if (!this.lock) {
        this.lock = true;
        bannerCarousel.slideNext();
        setTimeout(() => {
          this.lock = false;
        }, 1800);
      }
    });

    qs(`${this.bannerClass} .swiper-button-prev`).addEventListener('click', () => {
      if (!this.lock) {
        this.lock = true;
        bannerCarousel.slidePrev();
        setTimeout(() => {
          this.lock = false;
        }, 1800);
      }
    });
  }
}
