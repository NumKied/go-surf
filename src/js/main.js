const shoresList = $('.shores-list')[0].children,
      shoresItems = [...$('.shore-active'), ...$('.shore-name'), ...$('.shore-path')],
      surfMapDots = $('.surf-location__dot'),
      surfNextSlideArrow = $('.surf-next-arrow')[0],
      surfPrevSlideArrow = $('.surf-prev-arrow')[0],
      surfboardDetails = $('.surfboard-detail__circle');

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
const changeNumber = (event, action, idNumber, valueType) => {
  const element = $(`#${valueType}-value-${idNumber}`)[0];
  const value = +element.innerText
  if (action === 'plus') {
    element.innerText = `${value + 1}`
  } else if (value > 1) {
    element.innerText = `${value - 1}`
  }
  calculateTotalPrice(idNumber);
}

// Calculate total price
const calculateTotalPrice = idNumber => {
  const totalElement = $(`#total-value-${idNumber}`)[0];
  const price = +$(`#nights-value-${idNumber}`)[0].dataset.price;
  const nightsNumber = +$(`#nights-value-${idNumber}`)[0].innerText;
  const guestsNumber = +$(`#guests-value-${idNumber}`)[0].innerText;

  totalElement.innerText = guestsNumber * price * nightsNumber;
}

// Initial calculating of total prices
(() => {
  const totalPrices = $('[data-price]');
  for (let i = 1; i <= totalPrices.length; i++) {
    calculateTotalPrice(i);
  }
})();

// Shop slider
$('.shop-slick-slider').slick({
  infinite: true,
  fade: true,
  prevArrow: $('.shop-prev-arrow'),
  nextArrow: $('.shop-next-arrow')
});

for (let i = 0; i < surfboardDetails.length; i++) {
  surfboardDetails[i].addEventListener('click', event => {
    $(event.target).toggleClass('active');
    $(event.target.parentNode).toggleClass('active');
  });
}