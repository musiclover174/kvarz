import { qs } from './helpers';

export default class About {
  constructor(wrapperCl, fixerCl, mapShowerCl, backCl) {
    this.wrapper = wrapperCl;
    this.fixer = fixerCl;
    this.isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

    this.wrapperEl = qs(this.wrapper);
    this.init();

    this.mapShowerCl = mapShowerCl;
    this.backCl = backCl;
    if (qs(this.mapShowerCl)) {
      this.showMap();
    }
  }

  init() {
    window.addEventListener('scroll', () => {
      const { top, height } = this.wrapperEl.getBoundingClientRect();
      const bottom = qs(this.fixer).getBoundingClientRect().bottom - window.innerHeight;
      const awailHeight = height - window.innerHeight;

      if (this.isIE11) {
        const g = document.querySelectorAll('g.map');
        g.forEach((item) => {
          const transform = getComputedStyle(item).getPropertyValue('transform');
          item.setAttribute('transform', transform);
          console.log(transform);
        });
      }

      if (top <= 0 && bottom >= -0.5) {
        if (Math.abs(top) > awailHeight / 3) {
          if (Math.abs(top) > awailHeight * 2 / 3) {
            this.selectClass('block3');
          } else {
            this.selectClass('block2');
          }
        } else {
          this.selectClass('block1');
        }
      }
    });
  }

  selectClass(cl) {
    this.wrapperEl.classList.remove('block1');
    this.wrapperEl.classList.remove('block2');
    this.wrapperEl.classList.remove('block3');
    this.wrapperEl.classList.add(cl);
  }

  showMap() {
    const mapButton = qs(this.mapShowerCl);
    const roadBack = qs(this.backCl);

    function init() {
      let { from, from2, to } = mapButton.dataset;
      from = from.split(', ').map(x => parseFloat(x));
      from2 = from2.split(', ').map(x => parseFloat(x));
      to = to.split(', ').map(x => parseFloat(x));
      const multiRoute = new ymaps.multiRouter.MultiRoute({
        referencePoints: [
          from,
          to,
        ],
        params: {
          results: 1,
        },
      }, {
        boundsAutoApply: 0,
      });

      const multiRoute2 = new ymaps.multiRouter.MultiRoute({
        referencePoints: [
          from2,
          to,
        ],
        params: {
          results: 1,
        },
      }, {
        boundsAutoApply: 0,
      });

      const myMap = new ymaps.Map('about__map', {
        center: [56.042373, 60.977806],
        zoom: 8.2,
        controls: [],
      });

      myMap.controls.add('zoomControl');
      myMap.geoObjects.add(multiRoute);
      myMap.geoObjects.add(multiRoute2);
      myMap.behaviors.disable('scrollZoom');
    }

    function wantInit() {
      mapButton.addEventListener('click', () => {
        document.body.classList.toggle('showmap');
        init();
      });
      roadBack.addEventListener('click', () => {
        document.body.classList.toggle('showmap');
      });
    }

    ymaps.ready(wantInit);
  }
}
