import { qs } from './helpers';

export default class Contacts {
  constructor(mapElem) {
    this.el = qs(mapElem);
    ymaps.ready(this.init.bind(this));
  }

  init() {
    const {
      pin, center, locations, zoom,
    } = this.el.dataset;

    this.myMap = new ymaps.Map(this.el, {
      center: [parseFloat(center.split(':')[0]), parseFloat(center.split(':')[1])],
      zoom,
      controls: ['smallMapDefaultSet'],
    });

    this.myMap.behaviors.disable('scrollZoom');

    locations.split(', ').forEach((item) => {
      const coords = item.split(':');

      const HouseMarker = new ymaps.Placemark(
        [parseFloat(coords[0]), parseFloat(coords[1])], {}, {
          iconLayout: 'default#image',
          iconImageSize: [27, 35],
          iconImageHref: pin,
          iconImageOffset: [-28, -42],
        },
      );
      this.myMap.geoObjects.add(HouseMarker);
    });
  }
}
