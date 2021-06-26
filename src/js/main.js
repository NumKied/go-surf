$(() => {
  const shoresList = $('.shores-list')[0].children,
        shoresItems = [...$('.shore-active'), ...$('.shore-name'), ...$('.shore-path')],
        surfMapDots = $('.surf-location__dot');

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
    prevArrow: $('.surf-prev-arrow'),
    nextArrow: $('.surf-next-arrow'),
  });

  // TODO:
  $('.surf-slick-slider').on('afterChange', (slick, currentSlide) => {
    for (let i = 0; i < surfMapDots.length; i++) {
      surfMapDots[i].parentElement.classList.remove('surf-location_active');
    }
    surfMapDots[currentSlide.currentSlide].parentElement.classList.add('surf-location_active');
  });

  for (let i = 0; i < surfMapDots.length; i++) {
    surfMapDots[i].addEventListener('click', event => {
      for (let i = 0; i < surfMapDots.length; i++) {
        surfMapDots[i].parentElement.classList.remove('surf-location_active');
      }
      event.target.parentElement.classList.add('surf-location_active');
      $('.surf-slick-slider').slick('slickGoTo', event.target.parentElement.dataset.number, false);
    });
  }
});