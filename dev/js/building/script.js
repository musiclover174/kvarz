import {
  resizeWatcher,
  elemVisCheck,
  qs,
  qsAll,
  eventsDispatcher,
} from './modules/helpers';
import Popup from './modules/popup';
import Forms from './modules/forms';
import Burger from './modules/burger';
import Banner from './modules/banner';
import Leads from './modules/lead';
import Types from './modules/types';
import About from './modules/about';
// import Contacts from './modules/contacts';
import Sticky from './modules/sticky';
import Spacer from './modules/spacer';

document.addEventListener('DOMContentLoaded', () => {
  const spacer = new Spacer('.main *:not([class])');
  const burger = new Burger('.js-burger');

  if (qsAll('.h-anim').length) elemVisCheck();

  if (qs('.js-banner')) {
    const banner = new Banner('.js-banner');
  }

  if (qs('.js-leads')) {
    const leads = new Leads('.js-leads');
  }

  if (qs('.js-types')) {
    const types = new Types('.js-types', '.js-type', '.js-types-table');
  }

  if (qs('[data-popup]')) {
    window.popup = new Popup('[data-popup]');
  }

  if (qs('form')) {
    const forms = new Forms();
  }

  if (qs('.glightbox')) {
    const lightBox = GLightbox({
      selector: 'glightbox',
    });
  }

  if (qs('.js-sticky') && window.innerWidth > 670) {
    const sticky = new Sticky(0, 0);
  }

  if (qs('.js-about') && window.innerWidth > 670) {
    const about = new About('.about__wrapper', '.about__fixer-inner', '.js-about-mapshower', '.js-about-back');
  }

  // if (document.body.classList.contains('index')) {
  //   const index = new Index(30);
  //   index.preload();
  // }

  // if (document.querySelector('.js-contacts-map')) {
  //   const contacts = new Contacts('contacts-map');
  //   contacts.init();
  // }

  // if (document.querySelectorAll('.js-shave').length) {
  //   document.querySelectorAll('.js-shave').forEach((sh) => {
  //     shave(sh, sh.getAttribute('data-height'));
  //   });
  // }}

  // resize and scroll
  resizeWatcher();
  eventsDispatcher();
});
