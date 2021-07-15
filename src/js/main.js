const shoresList = $('.shores-list')[0].children,
      shoresItems = [...$('.shore-active'), ...$('.shore-name'), ...$('.shore-path')],
      surfMapDots = $('.surf-location__dot'),
      surfNextSlideArrow = $('.surf-next-arrow')[0],
      surfPrevSlideArrow = $('.surf-prev-arrow')[0];

// Hero slider
$('.hero-slick-slider').slick({
  infinite: true,
  fade: true,
  prevArrow: $('.hero-prev-arrow'),
  nextArrow: $('.hero-next-arrow')
});

$('.hero-slick-slider').on('afterChange', (slick, currentSlide) => {
  for (let i = 0; i < shoresList.length; i++) {
    if (i === currentSlide.currentSlide) {
      shoresList[i].classList.add('shores-item_active');
    } else {
      shoresList[i].classList.remove('shores-item_active');
    }
  }
  for (let i = 0; i < shoresItems.length; i++) {
    shoresItems[i].classList.remove('show');
    if (i === shoresItems.length - 1) {
      shoresItems[currentSlide.currentSlide].classList.add('show');
      shoresItems[currentSlide.currentSlide + 4].classList.add('show');
      shoresItems[currentSlide.currentSlide + 8].classList.add('show');
    }
  }
});

// Surf slider
$('.surf-slick-slider').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: false,
});

surfNextSlideArrow.addEventListener('click', () => {
  changeActiveLocation(true);
  $('.surf-slick-slider').slick('slickNext');
});

surfPrevSlideArrow.addEventListener('click', () => {
  changeActiveLocation(false);
  $('.surf-slick-slider').slick('slickPrev');
});

const changeActiveLocation = toNextSlide => {
  for (let i = 0; i < surfMapDots.length; i++) {
    surfMapDots[i].parentElement.classList.remove('surf-location_active');
  }
  const currentSlide = $('.surf-slick-slider').slick('slickCurrentSlide');
  surfMapDots[currentSlide + (toNextSlide ? 1 : -1)].parentElement.classList.add('surf-location_active');
}

for (let i = 0; i < surfMapDots.length; i++) {
  surfMapDots[i].addEventListener('click', event => {
    for (let i = 0; i < surfMapDots.length; i++) {
      surfMapDots[i].parentElement.classList.remove('surf-location_active');
    }
    event.target.parentElement.classList.add('surf-location_active');
    $('.surf-slick-slider').slick('slickGoTo', event.target.parentElement.dataset.number, false);
  });
}

// Travel slider
$('.travel-slick-slider').slick({
  infinite: true,
  fade: true,
  prevArrow: $('.travel-prev-arrow'),
  nextArrow: $('.travel-next-arrow')
});

// Round price
const round = event => {
  const value = event.target.parentNode.children[0].children[0].innerText;
  if (+value[value.length - 1] !== 0) {
    const firstHalf = value.slice(0, value.length - 2)
    const secondHalf = +value.slice(value.length - 2, value.length - 1);
    event.target.parentNode.children[0].children[0].innerText = `${firstHalf}${secondHalf + 1}0`;
  }
}

// Sleep slider
$('.sleep-slick-slider').slick({
  infinite: true,
  fade: true,
  prevArrow: $('.sleep-prev-arrow'),
  nextArrow: $('.sleep-next-arrow')
});

// Change number of nights/guests
const changeNumber = (event, action) => {
  const value = +event.target.parentNode.parentNode.children[0].children[0].innerText;
  if (action === 'plus') {
    event.target.parentNode.parentNode.children[0].children[0].innerText = `${value + 1}`
  } else if (+value !== 0) {
    event.target.parentNode.parentNode.children[0].children[0].innerText = `${value - 1}`
  }
}