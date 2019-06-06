import { qsAll } from './helpers';

export default class Spacer {
  constructor(elNames) {
    this.elName = elNames;

    this.beutify();
  }

  beutify() {
    qsAll(this.elName).forEach((item) => {
      item.innerHTML = item.innerHTML.replace(/( |&nbsp;|\(){1}([№а-яА-Я]){1}(\.){0,1} /g, '$1$2$3&nbsp;');
      item.innerHTML = item.innerHTML.replace(/( |&nbsp;|\(){1}([№а-яА-Я]){1}(\.){0,1} /g, '$1$2$3&nbsp;');
    });
  }
}
