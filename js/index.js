
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

let enterBtn = document.querySelector('.header__btn-top');

let enterBtn2 = document.querySelector('.header__form');

let closeBtn = document.querySelectorAll('.header__form-close');

enterBtn.addEventListener('click', function () {

  enterBtn.classList.toggle('enter-search--active');

  enterBtn2.classList.toggle('form__search--active');

  document.body.classList.toggle('stop--scroll');

});

closeBtn.forEach(function (el) {
  el.addEventListener('click', function () {

    enterBtn2.classList.remove('form__search--active');

  });

});

closeBtn.forEach(function (el) {
  el.addEventListener('click', function () {

    enterBtn.classList.remove('enter-search--active');

  });

});

// play-pause

const btns = document.querySelectorAll('.play')
const playIcons = document.querySelectorAll('.play__icon')
const pauseIcons = document.querySelectorAll('.pause__icon')
btns.forEach(btn => {
  btn.addEventListener('click', function (e) {
    let playIcon = btn.querySelector('.play__icon');
    let pauseIcon = btn.querySelector('.pause__icon');
    for (let el of playIcons) {
      if (el === playIcon) continue;
      el.classList.add('play__icon--active')
    }
    for (let el of pauseIcons) {
      if (el == pauseIcon) continue
      el.classList.remove('pause__icon--active')
    }
    playIcon.classList.toggle('play__icon--active')
    pauseIcon.classList.toggle('pause__icon--active')
  })
})

//select

const element = document.querySelector('.js-choice');
const choices = new Choices(element, {

  searchEnabled: false,
  itemSelectText: '',
  shouldSort: false,

});

// accordion

new Accordion('#accordion-container_1');


// tabs

let tabsBtn = document.querySelectorAll('.tabs-guests__btn');
let tabsItem = document.querySelectorAll('.tabs-item');

tabsBtn.forEach(function (element) {
  element.addEventListener('click', function (e) {
    const path = e.currentTarget.dataset.path;

    tabsBtn.forEach(function (btn) { btn.classList.remove('tabs-guests__btn--active') });
    e.currentTarget.classList.add('tabs-guests__btn--active');

    tabsItem.forEach(function (element) { element.classList.remove('tabs-item--active') });
    document.querySelector(`[data-target="${path}"]`).classList.add('tabs-item--active');
  });
});

// accordion podcasts
new Accordion('#accordion-container_2');


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
    paginationBulletMessage: 'Следующий слайд'
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
  }

})

// validation form

// let selector = document.querySelector("input[type='tel']");

// var im = new Inputmask("+7 (999) 999-99-99");
// im.mask(selector);

let validation = new JustValidate('#form', {
  errorLabelStyle: {
    color: '#D52B1E',
    font: '12px/ 12px Muller, sans- serif',
  }
});

validation.addField('#name', [
  {
    rule: 'required', // проверяем ввели ли мы в поле "Имя" что- либо
    errorMessage: 'Ошибка' // всплывающая ошибка
  },

  {
    rule: 'minLength', // проверяем ввели ли в поле нужное кол- во символов
    value: 2,  // минимальное количество символов
    errorMessage: 'Минимум 2 символа' // всплывающая ошибка
  }

])

  .addField('#email', [

    {
      rule: 'required', // проверяем ввели ли мы в  поле "Имя" что- либо
      errorMessage: 'Ошибка' // всплывающая ошибка
    },

    {
      rule: 'email', // тип ввода почта с собачкой, доменом и прочим.
      errorMessage: 'Ошибка в почте' // всплывающая ошибка
    }

  ])

  // burger

let burger = document.querySelector('.burger');

let menu = document.querySelector('.header__nav-top');

let menuLinks = menu.querySelectorAll('.nav__link-top');

burger.addEventListener('click',
  function () {

    burger.classList.toggle('burger--active');

    menu.classList.toggle('header__nav--active');

    document.body.classList.toggle('stop--scroll');

  })

menuLinks.forEach(function (el) {
  el.addEventListener('click', function () {

    burger.classList.remove('burger--active');

    menu.classList.remove('header__nav--active');

    document.body.classList.remove('stop-scroll');

  })
})

let el = document.getElementById('close-button');
console.log(el.ariaLabel); // "Close"
el.ariaLabel = "Развернуть меню навигации по сайту/ свернуть меню навигации по сайту"
console.log(el.ariaLabel); // "Close dialog"

// accordion 320 header
new Accordion('#accordion-container_3');

