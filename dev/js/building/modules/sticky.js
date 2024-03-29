import { qs } from './helpers';

export default class Sticky {
  constructor(topSpacing, bottomSpacing) {
    this.ts = topSpacing || qs('.js-sticky').dataset.top;
    this.bs = bottomSpacing;
    this.init();
  }

  init() {
    const sidebar = new StickySidebar('.js-sticky', {
      containerSelector: '.js-sticky-parent',
      innerWrapperSelector: '.js-sticky-inner',
      topSpacing: this.ts,
      bottomSpacing: this.bs,
    });
    window.addEventListener('resize', () => {
      sidebar.updateSticky();
    });
  }
}
