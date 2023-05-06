// header search

let searchBtn = document.querySelector('.btn-search');

let search = document.querySelector('.header__search');

let closeSearch = document.querySelectorAll('.header__search-btn-close');

searchBtn.addEventListener('click', function () {
  searchBtn.classList.toggle('btn-search--active');

  search.classList.toggle('header__search--active');

  document.body.classList.toggle('stop--scroll');
});

closeSearch.forEach(function (el) {
  el.addEventListener('click', function () {
    search.classList.remove('header__search--active');
  });
});

closeSearch.forEach(function (el) {
  el.addEventListener('click', function () {
    searchBtn.classList.remove('btn-search--active');
  });
});

// header enter

// let enterBtn = document.querySelector('.header__btn-top');

// let enterBtn2 = document.querySelector('.header__form');

// let closeBtn = document.querySelectorAll('.header__form-close');

// enterBtn.addEventListener('click', function () {

//   enterBtn.classList.toggle('enter-search--active');

//   enterBtn2.classList.toggle('form__search--active');

//   document.body.classList.toggle('stop--scroll');

// });

// closeBtn.forEach(function (el) {
//   el.addEventListener('click', function () {

//     enterBtn2.classList.remove('form__search--active');

//   });

// });

// closeBtn.forEach(function (el) {
//   el.addEventListener('click', function () {

//     enterBtn.classList.remove('enter-search--active');

//   });

// });

// header enter new

class Modal {
  constructor(options) {
    let defaulOptions = {
      isOpen: () => {},
      isClose: () => {},
    };
    this.options = Object.assign(defaulOptions, options);
    this.modal = document.querySelector('.modal');
    this.speed = false;
    this.animation = false;
    this.isOpen = false;
    this.headerFormModal = false; //modalContainer
    this.previousActiveElement = false;
    this.fixBlocks = document.querySelectorAll('.fix-block');
    this.focusElements = [
      'a[href]',
      'input',
      'button',
      'select',
      'textarea',
      '[tabindex]',
    ];
    this.events();
  }

  events() {
    if (this.modal) {
      document.addEventListener(
        'click',
        function (e) {
          const clickedElement = e.target.closest('[data-trigger]');
          if (clickedElement) {
            let target = clickedElement.dataset.trigger;
            let animation = clickedElement.dataset.animation;
            let speed = clickedElement.dataset.speed;
            this.animation = animation ? animation : 'fade';
            this.speed = speed ? parseInt(speed) : 300;
            this.headerFormModal = document.querySelector(
              `[data-modal="${target}"]`
            );
            this.open();
            return;
          }

          if (e.target.closest('.modal-close')) {
            this.close();
            return;
          }
        }.bind(this)
      );

      window.addEventListener(
        'keydown',
        function (e) {
          if (e.keyCode == 27) {
            if (this.isOpen) {
              this.close();
            }
          }
          if (e.keyCode == 9 && this.isOpen) {
            this.focusCatch(e);
            return;
          }
        }.bind(this)
      );

      this.modal.addEventListener(
        'click',
        function (e) {
          if (
            !e.target.classList.contains('header__form-modal') &&
            !e.target.closest('.header__form-modal') &&
            this.isOpen
          ) {
            this.close();
          }
        }.bind(this)
      );
    }
  }

  open() {
    // открыть окно +
    // сайт не скролится +
    // нет прыжка +
    // фокус внутри окна +
    // выделение первого +
    // анимации +
    this.previousActiveElement = document.activeElement;
    this.modal.style.setProperty('--transition-time', `${this.speed / 1000}s`);
    this.modal.classList.add('is-open');
    this.disableScroll();

    this.headerFormModal.classList.add('modal-open');
    this.headerFormModal.classList.add(this.animation);

    setTimeout(() => {
      this.options.isOpen(this);
      this.headerFormModal.classList.add('animate-open');
      this.isOpen = true;
      this.focusTrap();
    }, this.speed);
  }

  close() {
    if (this.headerFormModal) {
      this.headerFormModal.classList.remove('animate-open');
      this.headerFormModal.classList.remove(this.animation);
      this.modal.classList.remove('is-open');
      this.headerFormModal.classList.remove('modal-open');

      this.enableScroll();
      this.options.isClose(this);
      this.isOpen = false;
      this.focusTrap();
    }
  }

  focusCatch(e) {
    const focusable = this.headerFormModal.querySelectorAll(this.focusElements);
    const focusArray = Array.prototype.slice.call(focusable);
    const focusedIndex = focusArray.indexOf(document.activeElement);

    if (e.shiftKey && focusedIndex === 0) {
      focusArray[focusArray.length - 1].focus();
      e.preventDefault();
    }

    if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
      focusArray[0].focus();
      e.preventDefault();
    }
  }

  focusTrap() {
    const focusable = this.headerFormModal.querySelectorAll(this.focusElements);
    if (this.isOpen) {
      focusable[0].focus();
    } else {
      this.previousActiveElement.focus();
    }
  }

  disableScroll() {
    let pagePosition = window.scrollY;
    this.lockPadding();
    document.body.classList.add('disable-scroll');
    document.body.dataset.position = pagePosition;
    document.body.style.top = -pagePosition + 'px';
  }

  enableScroll() {
    let pagePosition = parseInt(document.body.dataset.position, 10);
    this.unlockPadding();
    document.body.style.top = 'auto';
    document.body.classList.remove('disable-scroll');
    window.scroll({ top: pagePosition, left: 0 });
    document.body.removeAttribute('data-position');
  }

  lockPadding() {
    let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
    this.fixBlocks.forEach((el) => {
      el.style.paddingRight = paddingOffset;
    });
    document.body.style.paddingRight = paddingOffset;
  }

  unlockPadding() {
    this.fixBlocks.forEach((el) => {
      el.style.paddingRight = '0px';
    });
    document.body.style.paddingRight = '0px';
  }
}

const modal = new Modal({
  isOpen: (modal) => {
    modal.headerFormModal.classList.add('asd');
  },
  isClose: () => {},
});

// play-pause

const btns = document.querySelectorAll('.play');
const playIcons = document.querySelectorAll('.play__icon');
const pauseIcons = document.querySelectorAll('.pause__icon');
btns.forEach((btn) => {
  btn.addEventListener('click', function (e) {
    let playIcon = btn.querySelector('.play__icon');
    let pauseIcon = btn.querySelector('.pause__icon');
    for (let el of playIcons) {
      if (el === playIcon) continue;
      el.classList.add('play__icon--active');
    }
    for (let el of pauseIcons) {
      if (el == pauseIcon) continue;
      el.classList.remove('pause__icon--active');
    }
    playIcon.classList.toggle('play__icon--active');
    pauseIcon.classList.toggle('pause__icon--active');
  });
});

//select

const element = document.querySelector('.js-choice');
const choices = new Choices(element, {
  searchEnabled: false,
  itemSelectText: '',
  shouldSort: false,
});

// accordion

new Accordion('#accordion-container_1', {
  openOnInit: [0],
});

// tabs

let tabsBtn = document.querySelectorAll('.tabs-guests__btn');
let tabsItem = document.querySelectorAll('.tabs-item');

tabsBtn.forEach(function (element) {
  element.addEventListener('click', function (e) {
    const path = e.currentTarget.dataset.path;

    tabsBtn.forEach(function (btn) {
      btn.classList.remove('tabs-guests__btn--active');
    });
    e.currentTarget.classList.add('tabs-guests__btn--active');

    tabsItem.forEach(function (element) {
      element.classList.remove('tabs-item--active');
    });
    document
      .querySelector(`[data-target="${path}"]`)
      .classList.add('tabs-item--active');
  });
});

// btn podcast

const btnPodcast = document.querySelector('.podcast__btn-down');
const itemsAll = document.querySelectorAll('.podcast__item').length;
let items = 8;

btnPodcast.addEventListener('click', () => {
  items += 4;
  const array = Array.from(document.querySelector('.podcast__list').children);
  const visibleItems = array.slice(0, items);

  visibleItems.forEach((el) => el.classList.add('is-visible'));

  if (visibleItems.length === itemsAll) {
    btnPodcast.style.display = 'none';
  }
});

// swiper

const swiper = new Swiper('.swiper-container', {
  // Optional parameters
  loop: true, // включает бесконечную прокрутку слайдов
  slidesPerView: 4, //кол-во показа слайдов
  spaceBetween: 30, // отступ между слайдами
  grabCursor: true, // курсор "рука"
  watchOverflow: true, // если слайдов станет меньше чем указано в slidesPerView, то слайдере
  initialSlide: 0, // Главный слайд с которого начинается свайпер
  speed: 700,
  breakpoints: {
    320: {
      slidesPerView: 3,
    },

    321: {
      slidesPerView: 2,
    },

    514: {
      slidesPerView: 3,
    },

    768: {
      slidesPerView: 2,
    },

    1025: {
      slidesPerView: 3,
    },

    1286: {
      slidesPerView: 4,
    },
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },

  a11y: {
    paginationBulletMessage: 'Следующий слайд',
  },
});

// swiper playlist320

const swiper2 = new Swiper('.swiper-playlist320', {
  loop: true,
  slidesPerView: 2,
  spaceBetween: 10, // отступ между слайдами
  grabCursor: true,
  initialSlide: 0,

  /*************/
  slideToClickedSlide: true,

  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  /*************/
  breakpoints: {
    320: {
      slidesPerView: 3,
    },

    514: {
      slidesPerView: 3,
    },
  },
});

// validation form

// let selector = document.querySelector("input[type='tel']");

// var im = new Inputmask("+7 (999) 999-99-99");
// im.mask(selector);

let validation = new JustValidate('#form', {
  errorLabelStyle: {
    color: '#D52B1E',
    font: '12px/ 12px Muller, sans- serif',
  },
});

validation
  .addField('#name', [
    {
      rule: 'required', // проверяем ввели ли мы в поле "Имя" что- либо
      errorMessage: 'Ошибка', // всплывающая ошибка
    },

    {
      rule: 'minLength', // проверяем ввели ли в поле нужное кол- во символов
      value: 2, // минимальное количество символов
      errorMessage: 'Минимум 2 символа', // всплывающая ошибка
    },
  ])

  .addField('#email', [
    {
      rule: 'required', // проверяем ввели ли мы в  поле "Имя" что- либо
      errorMessage: 'Ошибка', // всплывающая ошибка
    },

    {
      rule: 'email', // тип ввода почта с собачкой, доменом и прочим.
      errorMessage: 'Ошибка в почте', // всплывающая ошибка
    },
  ]);

// burger

let burger = document.querySelector('.burger');

let menu = document.querySelector('.header__nav-top');

let menuLinks = menu.querySelectorAll('.nav__link-top');

burger.addEventListener('click', function () {
  burger.classList.toggle('burger--active');

  menu.classList.toggle('header__nav--active');
  menu.style.transition =
    'visibility .3s ease-in-out, transform .3s ease-in-out';

  document.body.classList.toggle('stop--scroll');
});

menu.addEventListener('transitionend', function () {

if(!menu.classList.contains('header__nav--active')) {
  menu.removeAttribute('style');
}

});

menuLinks.forEach(function (el) {
  el.addEventListener('click', function () {
    burger.classList.remove('burger--active');

    menu.classList.remove('header__nav--active');

    document.body.classList.remove('stop-scroll');
  });
});

let el = document.getElementById('close-button');
console.log(el.ariaLabel); // "Close"
el.ariaLabel =
  'Развернуть меню навигации по сайту/ свернуть меню навигации по сайту';
console.log(el.ariaLabel); // "Close dialog"

// accordion 320 header
new Accordion('#accordion-container_3');
